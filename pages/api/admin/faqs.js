// pages/api/admin/faqs.js
import db from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { question, answer } = req.body;
        await db.query('INSERT INTO faq (question, answer) VALUES (?, ?)', [question, answer]);
        res.status(201).json({ success: true, message: 'FAQ added' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
