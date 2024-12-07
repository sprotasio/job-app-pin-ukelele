import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: 'sigma-fullstack-webdev-backend.mysql.database.azure.com',
  user: 'catarina.a.gouveia-gmail-j3',
  password: '_AUr5ITiTo',
  database: 'CATARINA_A_GOUVEIA_GMAIL_J3',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to create a new user
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
    const [result] = await pool.execute(query, [
      username,
      email,
      passwordHash,
      passwordSalt,
    ]);
    return result;
  } catch (error) {
    console.error('Error creating user in database:', error.message);
    throw error;
  }
}

// Function to check if a user exists in the database by email
export async function checkIfUserExists(email) {
  const query = `SELECT 1 FROM users WHERE email = ? LIMIT 1`;
  try {
    const [rows] = await pool.execute(query, [email]);
    return rows.length > 0; // Return true if the user exists
  } catch (error) {
    console.error('Error checking if user exists:', error.message);
    throw error;
  }
}
export async function createApplication(jobId, userId, coverLetter, status) {
  const query = `
    INSERT INTO applications (job_id, user_id, cover_letter, status)
    VALUES (?, ?, ?, ?)
  `;
  try {
    const [result] = await pool.execute(query, [
      jobId,
      userId,
      coverLetter,
      status,
    ]);
    return result;
  } catch (error) {
    console.error('Error creating application:', error.message);
    throw error;
  }
}

// Function to get a list of applications
export async function getListApplications() {
  const query = `SELECT * FROM applications`;
  try {
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching applications:', error.message);
    throw error;
  }
}

// Function to delete an application by ID
export async function deleteApplicationById(applicationId) {
  const query = `DELETE FROM applications WHERE id = ?`;
  try {
    const [result] = await pool.execute(query, [applicationId]);
    return result;
  } catch (error) {
    console.error('Error deleting application:', error.message);
    throw error;
  }
}

// Function to get a user by username
export async function getUserByUsername(username) {
  const query = `SELECT * FROM users WHERE username = ?`;
  try {
    const [rows] = await pool.execute(query, [username]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching user by username:', error.message);
    throw error;
  }
}

// Function to create a new job
export async function createJobById(title, description, company, location) {
  const query = `
    INSERT INTO jobs (title, description, company, location)
    VALUES (?, ?, ?, ?)
  `;
  try {
    const [result] = await pool.execute(query, [
      title,
      description,
      company,
      location,
    ]);
    return result;
  } catch (error) {
    console.error('Error creating job:', error.message);
    throw error;
  }
}
// Export the pool for raw database queries if needed
export default pool;
