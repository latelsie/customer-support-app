// pages/api/admin/questions.js
import db from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const [questions] = await db.query('SELECT * FROM questions WHERE answer IS NULL');
        res.status(200).json({ questions });
    } else if (req.method === 'POST') {
        const { qId } = req.query;
        const { answer } = req.body;
        await db.query('UPDATE questions SET answer = ? WHERE qId = ?', [answer, qId]);
        res.status(200).json({ success: true, message: 'Answer submitted' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
