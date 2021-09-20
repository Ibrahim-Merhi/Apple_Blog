let { connection } = require("./config");

const bcrypt = require("bcryptjs");

const createDataBase = async () => {
  var user = `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(25) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(15) NOT NULL,
            last_name VARCHAR(15) NOT NULL,
            phone VARCHAR(25) NOT NULL UNIQUE,
            role_id INTEGER NOT NULL DEFAULT 1,
            token TEXT
        )`;
    var question = `CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(50) NOT NULL,
            message VARCHAR(255) NOT NULL,
            date  TIMESTAMP NOT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) 
        )`;
  var answer = `CREATE TABLE IF NOT EXISTS answers (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(50) NOT NULL UNIQUE,
            messagea VARCHAR(250) NOT NULL UNIQUE,
            date  TIMESTAMP NOT NULL,
            user_id INTEGER NOT NULL,
            question_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (question_id) REFERENCES questions(id)
        )`;



  var comment = `CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            message VARCHAR(255),
            date TIMESTAMP NOT NULL,
            blog_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (blog_id) REFERENCES blogs(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`;

  var blog = `CREATE TABLE IF NOT EXISTS blogs (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(50) NOT NULL UNIQUE,
            description VARCHAR(255),
            content VARCHAR(255),
            image VARCHAR(255),
            view INTEGER,
            date TIMESTAMP NOT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`;

  var contact = `CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(25) NOT NULL,
            email VARCHAR(25) NOT NULL,
            title VARCHAR(50) NOT NULL UNIQUE,
            message VARCHAR(255)
        )`;

  const database = [user, answer, question, comment, blog, contact];
  database.map((sql) => {
    connection.query(sql, function (err, result) {
      if (err) throw err;
    });
  });

  connection.query(`SELECT * FROM users`, async function (err, result) {
    if (err) throw err;

    if (!result || result.length == 0) {
      var sql = `INSERT INTO users(username, email, password, first_name, last_name, phone, role_id) VALUES(?,?,?,?,?,?,?)`;

      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash("user", salt);

      var val = ["user", hashedPassword, "user", "user", "user", "00000000", 0];
      connection.query(sql, val, function (err, result) {
        if (err) throw err;
      });
    }
  });
};
module.exports = { createDataBase };
