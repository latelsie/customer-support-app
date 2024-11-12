// pages/api/login.js
import db from '../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        // Find the user in the database
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        const user = users[0];

        // Compare the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        // Authentication success
        res.status(200).json({ success: true, message: 'Login successful', usertype: user.usertype });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
