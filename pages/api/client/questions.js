// pages/api/client/questions.js
import db from '../../../lib/db';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const clientId = req.user ? req.user.id : 1; // Default to 1 for testing
            const [questions] = await db.query('SELECT * FROM questions WHERE clientId = ?', [clientId]);
            res.status(200).json({ questions });
        } else if (req.method === 'POST') {
            const { question } = req.body;
            if (!question) {
                return res.status(400).json({ success: false, message: 'Question is required' });
            }
            const clientId = req.user ? req.user.id : 1; // Default to 1 for testing
            await db.query('INSERT INTO questions (question, answer, clientId) VALUES (?, NULL, ?)', [question, clientId]);
            res.status(201).json({ success: true, message: 'Question submitted successfully' });
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

