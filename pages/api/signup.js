// pages/api/signup.js
import db from '../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        // Check if user already exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        await db.query(
            'INSERT INTO users (username, email, password, usertype) VALUES (?, ?, ?, "client")',
            [username, email, hashedPassword]
        );

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
