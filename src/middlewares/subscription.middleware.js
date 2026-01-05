import db from '../config/db.js';
import dayjs from 'dayjs';

// export const checkSubscription = async (req, res, next) => {
//     try {
//         const firmId = req.user.firm_id;

//         if (!firmId) {
//             return res.status(403).json({ message: 'Firm not associated' });
//         }

//         const subscription = await db('subscriptions')
//             .join('plans', 'subscriptions.plan_id', 'plans.id')
//             .where('subscriptions.firm_id', firmId)
//             .where('subscriptions.status', 'active')
//             .where('subscriptions.end_date', '>=', db.fn.now())
//             .select(
//                 'subscriptions.id as subscription_id',
//                 'subscriptions.end_date',
//                 'plans.ai_queries_limit',
//                 'plans.staff_limit',
//                 'plans.document_limit'
//             )
//             .first();

//         if (!subscription) {
//             return res.status(403).json({
//                 message: 'Subscription expired or inactive'
//             });
//         }

//         // attach plan info to request
//         req.subscription = subscription;

//         next();
//     } catch (err) {
//         res.status(500).json({ message: 'Subscription check failed' });
//     }
// };

export const checkAIQueryLimit = async (req, res, next) => {
    try {
        const { firm_id } = req.user;
        const { ai_queries_limit } = req.subscription;

        const result = await db('ai_queries')
            .where('firm_id', firm_id)
            .count('id as total')
            .first();

        if (result.total >= ai_queries_limit) {
            return res.status(403).json({
                message: 'AI query limit exceeded'
            });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: 'AI limit check failed' });
    }
};

export const checkStaffLimit = async (req, res, next) => {
    try {
        const firmId = req.user.firm_id;
        const { staff_limit } = req.subscription;

        const result = await db('users')
            .where('firm_id', firmId)
            .where('role', 'staff')
            .count('id as total')
            .first();

        if (result.total >= staff_limit) {
            return res.status(403).json({
                message: 'Staff limit exceeded for current plan'
            });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: 'Staff limit check failed' });
    }
};

export const checkDocumentLimit = async (req, res, next) => {
    try {
        const firmId = req.user.firm_id;
        const { document_limit } = req.subscription;

        const result = await db('documents')
            .where('firm_id', firmId)
            .count('id as total')
            .first();

        if (result.total >= document_limit) {
            return res.status(403).json({
                message: 'Document upload limit exceeded'
            });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: 'Document limit check failed' });
    }
};
export const checkSubscription = async (req, res, next) => {
    try {
        const firmId = req.user.firm_id;

        const firm = await db('firms')
            .where({ id: firmId })
            .first();

        if (!firm || !firm.is_active) {
            return res.status(403).json({ message: 'Firm not active' });
        }

        if (dayjs().isAfter(dayjs(firm.subscription_end))) {
            return res.status(403).json({
                message: 'Subscription expired'
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({ message: 'Subscription check failed' });
    }
};
