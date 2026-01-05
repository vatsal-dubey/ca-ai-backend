import db from '../config/db.js';

export const checkUserLimit = async (req, res, next) => {
  try {
    const firmId = req.user.firm_id;

    const firm = await db('firms')
      .join('subscriptions', 'firms.subscription_id', 'subscriptions.id')
      .where('firms.id', firmId)
      .select('subscriptions.max_users')
      .first();

    if (!firm) {
      return res.status(403).json({ message: 'Firm not found' });
    }

    const count = await db('users')
      .where({
        firm_id: firmId,
        status: 'active'
      })
      .count('id as total')
      .first();

    if (count.total >= firm.max_users) {
      return res.status(403).json({
        message: 'User limit reached. Upgrade your plan.'
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'User limit check failed' });
  }
};
