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

// Create a new application
export async function createApplication(data) {
  const query = `
    INSERT INTO applications (job_id, user_id, cover_letter, status)
    VALUES (?, ?, ?, ?)
  `;
  try {
    const [result] = await pool.execute(query, [
      data.jobId,
      data.userId,
      data.coverLetter,
      data.status,
    ]);
    return result;
  } catch (error) {
    console.error('Error creating application:', error.message);
    throw error;
  }
}

// Get a list of applications
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

// Delete an application by ID
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

// Get a user by username
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

// Check if a user exists
export async function checkIfUserExists(email) {
  const query = `SELECT 1 FROM users WHERE email = ? LIMIT 1`;
  try {
    const [rows] = await pool.execute(query, [email]);
    return rows.length > 0;
  } catch (error) {
    console.error('Error checking if user exists:', error.message);
    throw error;
  }
}

// Create a job by ID
export async function createJobById(data) {
  const query = `
    INSERT INTO jobs (title, description, company, location)
    VALUES (?, ?, ?, ?)
  `;
  try {
    const [result] = await pool.execute(query, [
      data.title,
      data.description,
      data.company,
      data.location,
    ]);
    return result;
  } catch (error) {
    console.error('Error creating job:', error.message);
    throw error;
  }
}

// Export the pool for raw queries if needed
export default pool;
