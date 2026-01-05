import db from '../../config/db.js';

export const approveFirm = async (firmId) => {
  return await db.transaction(async trx => {
    // Activate firm
    const firmUpdated = await trx('firms')
      .where({ id: firmId })
      .update({ status: 'active' });

    if (!firmUpdated) throw new Error('Firm not found');

    // Activate CA users of this firm
    await trx('users')
      .where({ firm_id: firmId, role: 'ca' })
      .update({ status: 'active' });

    return true;
  });
};

export const deactivateFirm = async (firmId) => {
  return await db.transaction(async trx => {
    await trx('firms')
      .where({ id: firmId })
      .update({ status: 'inactive' });

    await trx('users')
      .where({ firm_id: firmId })
      .update({ status: 'inactive' });

    return true;
  });
};

export const listFirms = async () => {
  return await db('firms')
    .select(
      'id',
      'firm_name',
      'ca_name',
      'email',
      'status',
      'created_at'
    )
    .orderBy('created_at', 'desc');
};
