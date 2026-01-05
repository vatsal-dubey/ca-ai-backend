import {
  approveFirm,
  deactivateFirm,
  listFirms
} from './admin.service.js';
import dayjs from 'dayjs';

export const getFirms = async (req, res) => {
  try {
    const firms = await listFirms();
    res.json(firms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const activateFirm = async (req, res) => {
  try {
    await approveFirm(req.params.id);
    res.json({ message: 'Firm activated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const blockFirm = async (req, res) => {
  try {
    await deactivateFirm(req.params.id);
    res.json({ message: 'Firm deactivated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const assignSubscription = async (req, res) => {
  try {
    const { firmId } = req.params;
    const { subscription_id } = req.body;

    // Fetch subscription
    const subscription = await db('subscriptions')
      .where({ id: subscription_id, is_active: 1 })
      .first();

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    const startDate = dayjs().format('YYYY-MM-DD');
    const endDate = dayjs()
      .add(subscription.duration_days, 'day')
      .format('YYYY-MM-DD');

    await db('firms')
      .where({ id: firmId })
      .update({
        subscription_id,
        subscription_start: startDate,
        subscription_end: endDate,
        is_active: 1
      });

    return res.json({
      message: 'Subscription assigned successfully',
      valid_till: endDate
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};