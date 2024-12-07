import bcrypt from 'bcryptjs';
import { createUserInDb } from './db/database';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Please fill all required fields' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Save the user to the database using the function
    const result = await createUserInDb(username, email, passwordHash, salt);

    res.status(201).json({ message: 'User created successfully', result });
  } catch (error) {
    console.error('Error in /api/signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
