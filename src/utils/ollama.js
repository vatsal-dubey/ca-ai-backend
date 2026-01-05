import axios from 'axios';

const OLLAMA_URL = 'http://localhost:11434/api/generate';

export const askOllama = async (prompt) => {
  const response = await axios.post(OLLAMA_URL, {
    model: 'mistral',
    prompt,
    stream: false
  });

  return response.data;
};
