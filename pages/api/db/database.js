import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'sigma-fullstack-webdev-backend.mysql.database.azure.com',
  user: 'catarina.a.gouveia-gmail-j3',
  password: '_AUr5ITiTo',
  database: 'CATARINA_A_GOUVEIA_GMAIL_J3',
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of connections
  queueLimit: 0,
});

// Function to create a new user in the database
export async function createUserInDb(
  username,
  email,
  passwordHash,
  passwordSalt
) {
  const query = `
    INSERT INTO users (username, email, password_hash, password_salt)
    VALUES (?, ?, ?, ?)
  `;

  // Execute the query using the connection pool
  const [result] = await pool.execute(query, [
    username,
    email,
    passwordHash,
    passwordSalt,
  ]);

  return result;
}

export default pool;
