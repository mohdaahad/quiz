const { Pool } = require('pg');

// const db = new Pool({
//   user: 'quizuser',
//   host: 'localhost',
//   database: 'quiz',
//   password: 'Aahad@123',
//   port: 5433,
// });

const db = new Pool({
  connectionString: process.env.POSTGRES_URL ,
})

// const createClassesTableQuery = `
//   CREATE TABLE IF NOT EXISTS Classes (
//     class_id SERIAL PRIMARY KEY,
//     class_name VARCHAR(255) UNIQUE NOT NULL
//   );
// `;

// const createUsersTableQuery = `
//   CREATE TABLE IF NOT EXISTS Users (
//     user_id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     full_name VARCHAR(255) NOT NULL,
//     father_name VARCHAR(255) NOT NULL,
//     class_id INT,
//     address TEXT NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     dob DATE NOT NULL,
//     password VARCHAR(255),
//     FOREIGN KEY (class_id) REFERENCES Classes(class_id)
//   );
// `;

// const createCoursesTableQuery = `
//   CREATE TABLE IF NOT EXISTS Courses (
//     course_id SERIAL PRIMARY KEY,
//     course_name VARCHAR(255) NOT NULL
//   );
// `;

// const createQuizzesTableQuery = `
//   CREATE TABLE IF NOT EXISTS Quizzes (
//     quiz_id SERIAL PRIMARY KEY,
//     course_id INT,
//     question TEXT NOT NULL,
//     option1 VARCHAR(255) NOT NULL,
//     option2 VARCHAR(255) NOT NULL,
//     option3 VARCHAR(255) NOT NULL,
//     option4 VARCHAR(255) NOT NULL,
//     correct_option VARCHAR(255) NOT NULL,
//     FOREIGN KEY (course_id) REFERENCES Courses(course_id)
//   );
// `;

// const createAttemptsTableQuery = `
//   CREATE TABLE IF NOT EXISTS Attempts (
//     attempt_id SERIAL PRIMARY KEY,
//     user_id INT,
//     total_score INT,
//     course_id INT,
//     attempt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     retake_count INT DEFAULT 0,
//     FOREIGN KEY (user_id) REFERENCES Users(user_id),
//     FOREIGN KEY (course_id) REFERENCES Courses(course_id)
//   );
// `;

// const createCertificatesTableQuery = `
//   CREATE TABLE IF NOT EXISTS Certificates (
//     certificate_id SERIAL PRIMARY KEY,
//     user_id INT,
//     course_id INT UNIQUE,
//     score INT,
//     pass_date DATE,
//     FOREIGN KEY (user_id) REFERENCES Users(user_id),
//     FOREIGN KEY (course_id) REFERENCES Courses(course_id)
//   );
// `;

// const createResultsTableQuery = `
//   CREATE TABLE IF NOT EXISTS Results (
//     result_id SERIAL PRIMARY KEY,
//     attempt_id INT,
//     quiz_id INT,
//     selected_option VARCHAR(255),
//     is_correct VARCHAR(255),
//     FOREIGN KEY (attempt_id) REFERENCES Attempts(attempt_id),
//     FOREIGN KEY (quiz_id) REFERENCES Quizzes(quiz_id)
//   );
// `;

db.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Database connection successful:');

    // Create tables
    // client.query(createClassesTableQuery, (err) => {
    //   if (err) {
    //     console.error('Error creating Classes table:', err.stack);
    //   } else {
    //     console.log('Classes table created successfully');
    //   }
    // });

    // client.query(createUsersTableQuery, (err) => {
    //   if (err) {
    //     console.error('Error creating Users table:', err.stack);
    //   } else {
    //     console.log('Users table created successfully');
    //   }
    // });

    // client.query(createCoursesTableQuery, (err) => {
    //   if (err) {
    //     console.error('Error creating Courses table:', err.stack);
    //   } else {
    //     console.log('Courses table created successfully');
    //   }
    // });

    // client.query(createQuizzesTableQuery, (err) => {
    //   if (err) {
    //     console.error('Error creating Quizzes table:', err.stack);
    //   } else {
    //     console.log('Quizzes table created successfully');
    //   }
    // });

    // client.query(createAttemptsTableQuery, (err) => {
    //   if (err) {
    //     console.error('Error creating Attempts table:', err.stack);
    //   } else {
    //     console.log('Attempts table created successfully');
    //   }
    // });

    // client.query(createCertificatesTableQuery, (err) => {
    //   if (err) {
    //     console.error('Error creating Certificates table:', err.stack);
    //   } else {
    //     console.log('Certificates table created successfully');
    //   }
    // });

    // client.query(createResultsTableQuery, (err) => {
    //   if (err) {
    //     console.error('Error creating Results table:', err.stack);
    //   } else {
    //     console.log('Results table created successfully');
    //   }
    // });
  });
});

module.exports = db;
