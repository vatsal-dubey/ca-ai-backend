import db from '../config/db.js';
import { generateEmbedding } from '../utils/embeddings.js';
import { findTopChunks } from '../utils/similarity.js';
import { askOllama } from '../utils/ollama.js';
import { buildCAPrompt } from '../utils/aiPrompt.js';

export const askWithRAG = async (user, question) => {
  const questionEmbedding = await generateEmbedding(question);

  const chunks = await db('document_chunks')
    .where('firm_id', user.firm_id);

  if (!chunks.length) {
    throw new Error('No documents available for this firm');
  }

  const topChunks = findTopChunks(questionEmbedding, chunks);

  const context = topChunks.map(c => c.content).join('\n---\n');

  const prompt = `
${buildCAPrompt(question)}

Context from firm documents:
${context}
`;

  const aiResponse = await askOllama(prompt);

  return {
    answer: aiResponse.response,
    sources: topChunks.map(c => ({
      document_id: c.document_id
    }))
  };
};
