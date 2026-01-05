import { askWithRAG } from '../services/rag.service.js';

export const askAI = async (req, res) => {
  try {
    const result = await askWithRAG(req.user, req.body.question);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
