// pages/api/client/answered-questions.js
import db from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const [questions] = await db.query('SELECT * FROM questions WHERE status = ?', ['answered']);
            res.status(200).json({ success: true, questions });
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
