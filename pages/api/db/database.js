import mysql from 'mysql2/promise';

// Create a connection pool for the database
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

  try {
    // Execute the query using the connection pool
    const [result] = await pool.execute(query, [
      username,
      email,
      passwordHash,
      passwordSalt,
    ]);

    return result; // Return the result of the query
  } catch (error) {
    console.error('Error creating user in database:', error.message);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

// Example function to retrieve a list of jobs
export async function getListJobs() {
  const query = `SELECT * FROM jobs`;

  try {
    const [rows] = await pool.query(query);
    return rows; // Return the list of jobs
  } catch (error) {
    console.error('Error fetching list of jobs:', error.message);
    throw error;
  }
}

// Example function to delete a job by ID
export async function deleteJobById(jobId) {
  const query = `DELETE FROM jobs WHERE id = ?`;

  try {
    const [result] = await pool.execute(query, [jobId]);
    return result; // Return the result of the deletion
  } catch (error) {
    console.error('Error deleting job:', error.message);
    throw error;
  }
}

// Export the pool for direct use if needed
export default pool;
