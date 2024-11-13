import db from '@/lib/db';

export default async function handler(req, res) {
    const { qId } = req.query;

    if (req.method === 'GET') {
        try {
            const [questions] = await db.query('SELECT qId, question, answer, status FROM questions');
            res.status(200).json({ questions });
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else if (req.method === 'POST') {
        const { answer } = req.body;

        if (!answer) {
            return res.status(400).json({ success: false, message: 'Answer is required' });
        }

        try {
            // Update the answer and status in the database for the specific question
            const [result] = await db.query(
                'UPDATE questions SET answer = ?, status = ? WHERE qId = ?',
                [answer, 'answered', qId]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Question not found' });
            }

            res.status(200).json({ success: true, message: 'Answer submitted successfully' });
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
