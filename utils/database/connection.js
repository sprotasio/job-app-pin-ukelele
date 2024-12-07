import mysql from 'mysql2/promise';

const connectionToDB = await mysql.createConnection({
  host: "sigma-fullstack-webdev-backend.mysql.database.azure.com",
  user: "catarina.a.gouveia-gmail-j3",
  password: "_AUr5ITiTo",
  database: "CATARINA_A_GOUVEIA_GMAIL_J3",
  port: process.env.DB_PORT || 3306, 
});

export default connectionToDB;

