import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByUsername } from './db/database';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Missing username or password' });
    }

    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error in /api/login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
