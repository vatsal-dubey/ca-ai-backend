const count = await db('ai_queries')
  .where('firm_id', firmId)
  .count('id as total')
  .first();
