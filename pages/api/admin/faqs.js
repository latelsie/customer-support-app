import db from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { question, answer } = req.body;

        // Validation: Check if question and answer are provided
        if (!question || !answer) {
            return res.status(400).json({ success: false, message: 'Both question and answer are required' });
        }

        try {
          
            await db.query('INSERT INTO faq (question, answer) VALUES (?, ?)', [question, answer]);

            
            res.status(201).json({ success: true, message: 'FAQ added successfully' });
        } catch (error) {
           
            console.error('Database error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
