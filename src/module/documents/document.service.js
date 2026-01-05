import db from '../config/db.js';
import { extractTextFromPDF } from '../utils/pdfParser.js';
import { chunkText } from '../utils/textChunker.js';
import { generateEmbedding } from '../utils/embeddings.js';

export const processDocument = async (user, file) => {
  const [documentId] = await db('documents').insert({
    firm_id: user.firm_id,
    uploaded_by: user.id,
    file_name: file.originalname,
    file_path: file.path,
    file_type: file.mimetype,
    vector_status: 'pending'
  });

  try {
    const text = await extractTextFromPDF(file.path);
    const chunks = chunkText(text);

    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk);

      await db('document_chunks').insert({
        document_id: documentId,
        firm_id: user.firm_id,
        content: chunk,
        embedding: JSON.stringify(embedding)
      });
    }

    await db('documents')
      .where({ id: documentId })
      .update({ vector_status: 'processed' });

  } catch (err) {
    await db('documents')
      .where({ id: documentId })
      .update({ vector_status: 'failed' });

    throw err;
  }
};
