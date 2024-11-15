// pages/api/faqs.js
import db from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const [rows] = await db.query('SELECT * FROM faq'); // Adjust the query as needed
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: 'Database query failed' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
