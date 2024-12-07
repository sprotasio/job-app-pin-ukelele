import bcrypt from 'bcrypt';
import { createUserInDb, checkIfUserExists } from './db/database';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return await handlePost(req, res);
    default:
      return res.status(405).json({
        isSuccess: false,
        message: `Method ${method} not allowed`,
        result: null,
      });
  }
}

async function handlePost(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      isSuccess: false,
      message: 'All fields (username, email, password) are required.',
      result: null,
    });
  }

  try {
    // Check if the email already exists
    const existingUser = await checkIfUserExists(email);
    if (existingUser) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Email is already registered.',
        result: null,
      });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10); // 10 rounds
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Save the user to the database
    const result = await createUserInDb(username, email, hashedPassword, salt);

    return res.status(200).json({
      isSuccess: true,
      message: 'User registered successfully',
      result: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      isSuccess: false,
      message: 'Registration failed',
      result: [],
    });
  }
}
