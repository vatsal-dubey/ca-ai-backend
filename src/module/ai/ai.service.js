import db from '../config/db.js';
import { askOllama } from '../utils/ollama.js';
import { buildCAPrompt } from '../prompt.templates.js';
/**
 * TEMP AI ENGINE
 * Replace later with OpenAI / Azure / Local LLM
 */
const callAIEngine = async (question) => {
  // placeholder
  return {
    answer: `AI response for: ${question}`,
    tokens_used: 120,
    source_reference: null
  };
};

export const processAIQuery = async (user, question) => {
  if (!question || question.length < 5) {
    throw new Error('Question too short');
  }

  const prompt = buildCAPrompt(question);

  const aiResponse = await askOllama(prompt);

  const answer = aiResponse.response || 'No response';
  const tokensUsed = aiResponse.eval_count || 0;

  await db('ai_queries').insert({
    firm_id: user.firm_id,
    user_id: user.id,
    question,
    answer,
    tokens_used: tokensUsed,
    source_reference: 'local-llm'
  });

  return { answer };
};

export const fetchAIHistory = async (user) => {
  return db('ai_queries')
    .where('firm_id', user.firm_id)
    .orderBy('created_at', 'desc')
    .limit(50);
};
