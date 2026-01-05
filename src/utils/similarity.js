import cosineSimilarity from 'cosine-similarity';

export const findTopChunks = (queryEmbedding, chunks, topK = 5) => {
  return chunks
    .map(chunk => ({
      ...chunk,
      score: cosineSimilarity(
        queryEmbedding,
        JSON.parse(chunk.embedding)
      )
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
};
