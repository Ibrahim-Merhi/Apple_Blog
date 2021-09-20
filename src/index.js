const app = require("./app");
let { connection } = require("./config");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const data = require("./createDataBase");
data.createDataBase();

const start = async () => {
  // GET BY USERNAME
  app.post("/getUserData", async (req, res, next) => {
    const { id, token } = req.body;

    let sql_a = `SELECT * FROM users WHERE id = ${id} AND token LIKE '${token}'`;

    try {
      const decoded = jwt.verify(token, "randomString", {
        ignoreExpiration: true,
      });
      if (id == decoded.id) {
        connection.query(sql_a, async function (err, data) {
          if (err) throw err;
          if (data.length && data[0]) {
            res.json({ success: true, result: data[0] });
          } else {
            connection.query(sql_p, async function (err, datas) {
              if (err) throw err;
              if (datas.length && datas[0]) {
                res.json({ success: true, result: result[0] });
              } else {
                res.json({ success: false });
              }
            });
          }
        });
      } else {
        res.json({ success: false });
      }
    } catch (e) {
      next(e);
    }
  });

  // GET LIST BLOG
  app.get("/blog", async (req, res, next) => {
    try {
      let sql = `SELECT * FROM blogs`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // READ SINGLE BLOG
  app.get("/blog/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      let sql = `SELECT * FROM blogs WHERE id = ${id} LIMIT 1`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result: result[0] });
      });
    } catch (e) {
      next(e);
    }
  });

  // CREATE BLOG
  app.post("/blog", async (req, res, next) => {
    const { title, description, content, image, view, date, user_id } =
      req.body;
    let att = "title, description, content, image, view, date, user_id";
    let values = [title, description, content, image, view, date, user_id];
    let inValues = "?, ?, ?, ?, ?, ?, ?";

    // if (description) {
    //   att += `, description`;
    //   inValues += `, ?`;
    //   values.push(description);
    // }

    try {
      let sql = `INSERT INTO blogs(${att}) VALUES(${inValues})`;
      connection.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // DELETE BLOG
  app.delete("/blog/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      let sql = `DELETE FROM blogs WHERE id = ${id} `;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // UPDATE BLOG
  app.put("/blog/:id", async (req, res, next) => {
    const { id } = req.params;
    const { title, description, content, image, view, date, user_id } =
      req.body;
    let att = ``;
    let attValues = [];

    if (title) {
      att += ` title = ? ,`;
      attValues.push(title);
    }
    if (description) {
      att += ` description = ? ,`;
      attValues.push(description);
    }
    if (content) {
      att += ` content = ? ,`;
      attValues.push(content);
    }
    if (image) {
      att += ` image = ? ,`;
      attValues.push(image);
    }
    if (view) {
      att += ` view = ? ,`;
      attValues.push(view);
    }
    if (date) {
      att += ` date = ? ,`;
      attValues.push(date);
    }
    if (user_id) {
      att += ` user_id = ? ,`;
      attValues.push(user_id);
    }

    att = att.slice(0, -1);
    att += ` WHERE id = ? `;
    attValues.push(id);

    try {
      let sql = `UPDATE blogs SET ${att} `;
      connection.query(sql, attValues, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // GET LIST USER
  app.get("/user", async (req, res, next) => {
    try {
      let sql = `SELECT * FROM users`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // READ SINGLE USER
  app.get("/user/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      let sql = `SELECT * FROM users WHERE id = ${id} LIMIT 1`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result: result[0] });
      });
    } catch (e) {
      next(e);
    }
  });

  // CREATE USER
  app.post("/user", async (req, res, next) => {
    const { username, email, password, first_name, last_name, phone, role_id } =
      req.body;
    let att =
      "username, email, password, first_name, last_name, phone, role_id";
    let values = [
      username,
      email,
      password,
      first_name,
      last_name,
      phone,
      role_id,
    ];
    let inValues = "?, ?, ?, ?, ?, ?, ?";

    // if (description) {
    //   att += `, description`;
    //   inValues += `, ?`;
    //   values.push(description);
    // }

    try {
      let sql = `INSERT INTO users(${att}) VALUES(${inValues})`;
      connection.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // DELETE USER
  app.delete("/user/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      let sql = `DELETE FROM users WHERE id = ${id} `;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // UPDATE USER
  app.put("/user/:id", async (req, res, next) => {
    const { id } = req.params;
    const { username, email, password, firstname, lastname, phone, role } =
      req.body;
    let att = ``;
    let attValues = [];

    if (username) {
      att += ` username = ? ,`;
      attValues.push(username);
    }
    if (email) {
      att += ` email = ? ,`;
      attValues.push(email);
    }
    if (password) {
      att += ` password = ? ,`;
      attValues.push(password);
    }
    if (firstname) {
      att += ` firstname = ? ,`;
      attValues.push(firstname);
    }
    if (lastname) {
      att += ` lastname = ? ,`;
      attValues.push(lastname);
    }
    if (phone) {
      att += ` phone = ? ,`;
      attValues.push(phone);
    }
    if (role) {
      att += ` role = ? ,`;
      attValues.push(role);
    }

    att = att.slice(0, -1);
    att += ` WHERE id = ? `;
    attValues.push(id);

    try {
      let sql = `UPDATE users SET ${att} `;
      connection.query(sql, attValues, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // GET LIST QUESTION
  app.get("/question", async (req, res, next) => {
    try {
      let sql = `SELECT * FROM questions`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // READ SINGLE QUESTION
  app.get("/question/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      let sql = `SELECT * FROM questions WHERE id = ${id} LIMIT 1`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result: result[0] });
      });
    } catch (e) {
      next(e);
    }
  });

  // CREATE QUESTION
  app.post("/question", async (req, res, next) => {
    const { title, message, date, user_id } = req.body;
    let att = "title, message, date, user_id";
    let values = [title, message, date, user_id];
    let inValues = "?, ?, ?, ?";

    // if (description) {
    //   att += `, description`;
    //   inValues += `, ?`;
    //   values.push(description);
    // }

    try {
      let sql = `INSERT INTO questions(${att}) VALUES(${inValues})`;
      connection.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // DELETE QUESTION
  app.delete("/question/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      let sql = `DELETE FROM questions WHERE id = ${id} `;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // UPDATE QUESTION
  app.put("/question/:id", async (req, res, next) => {
    const { id } = req.params;
    const { title, message, date, user_id } = req.body;
    let att = ``;
    let attValues = [];

    if (title) {
      att += ` title = ? ,`;
      attValues.push(title);
    }
    if (message) {
      att += ` message = ? ,`;
      attValues.push(message);
    }
    if (date) {
      att += ` date = ? ,`;
      attValues.push(date);
    }
    if (user_id) {
      att += ` user_id = ? ,`;
      attValues.push(user_id);
    }

    att = att.slice(0, -1);
    att += ` WHERE id = ? `;
    attValues.push(id);

    try {
      let sql = `UPDATE questions SET ${att} `;
      connection.query(sql, attValues, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // GET LIST ANSWER
  app.get("/answer", async (req, res, next) => {
    try {
      let sql = `SELECT * FROM answers`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // READ SINGLE ANSWER
  app.get("/answer/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      let sql = `SELECT * FROM answers WHERE id = ${id} LIMIT 1`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result: result[0] });
      });
    } catch (e) {
      next(e);
    }
  });

  // CREATE ANSWER
  app.post("/answer", async (req, res, next) => {
    const { title, messagea, date, user_id, question_id } = req.body;
    let att = "title, messagea, date, user_id, question_id";
    let values = [title, messagea, date, user_id, question_id];
    let inValues = "?, ?, ?, ?, ?";

    // if (description) {
    //   att += `, description`;
    //   inValues += `, ?`;
    //   values.push(description);
    // }

    try {
      let sql = `INSERT INTO answers(${att}) VALUES(${inValues})`;
      connection.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // DELETE ANSWER
  app.delete("/answer/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      let sql = `DELETE FROM answers WHERE id = ${id} `;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // UPDATE ANSWER
  app.put("/answer/:id", async (req, res, next) => {
    const { id } = req.params;
    const { title, messagea, date, user_id, question_id } = req.body;
    let att = ``;
    let attValues = [];

    if (title) {
      att += ` title = ? ,`;
      attValues.push(title);
    }
    if (messagea) {
      att += ` messagea = ? ,`;
      attValues.push(messagea);
    }
    if (date) {
      att += ` date = ? ,`;
      attValues.push(date);
    }
    if (user_id) {
      att += ` user_id = ? ,`;
      attValues.push(user_id);
    }
    if (question_id) {
      att += ` question_id = ? ,`;
      attValues.push(question_id);
    }

    att = att.slice(0, -1);
    att += ` WHERE id = ? `;
    attValues.push(id);

    try {
      let sql = `UPDATE answers SET ${att} `;
      connection.query(sql, attValues, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // GET LIST COMMENT
  app.get("/comment", async (req, res, next) => {
    try {
      let sql = `SELECT * FROM comments`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // READ SINGLE COMMENT
  app.get("/comment/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      let sql = `SELECT * FROM comments WHERE id = ${id} LIMIT 1`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result: result[0] });
      });
    } catch (e) {
      next(e);
    }
  });

  // CREATE COMMENT
  app.post("/comment", async (req, res, next) => {
    const { message, date, blog_id, user_id } = req.body;
    let att = "message, date, blog_id, user_id";
    let values = [message, date, blog_id, user_id];
    let inValues = "?, ?, ?, ?";

    // if (description) {
    //   att += `, description`;
    //   inValues += `, ?`;
    //   values.push(description);
    // }

    try {
      let sql = `INSERT INTO comments(${att}) VALUES(${inValues})`;
      connection.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // DELETE COMMENT
  app.delete("/comment/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      let sql = `DELETE FROM comments WHERE id = ${id} `;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // UPDATE COMMENT
  app.put("/comment/:id", async (req, res, next) => {
    const { id } = req.params;
    const { message, date, blog_id, user_id } = req.body;
    let att = ``;
    let attValues = [];

    if (message) {
      att += ` message = ? ,`;
      attValues.push(message);
    }
    if (date) {
      att += ` date = ? ,`;
      attValues.push(date);
    }
    if (blog_id) {
      att += ` blog_id = ? ,`;
      attValues.push(blog_id);
    }
    if (user_id) {
      att += ` user_id = ? ,`;
      attValues.push(user_id);
    }

    att = att.slice(0, -1);
    att += ` WHERE id = ? `;
    attValues.push(id);

    try {
      let sql = `UPDATE comments SET ${att} `;
      connection.query(sql, attValues, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // GET LIST CONTACT
  app.get("/contact", async (req, res, next) => {
    try {
      let sql = `SELECT * FROM contacts`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // READ SINGLE CONTACT
  app.get("/contact/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      let sql = `SELECT * FROM contacts WHERE id = ${id} LIMIT 1`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result: result[0] });
      });
    } catch (e) {
      next(e);
    }
  });

  // CREATE CONTACT
  app.post("/contact", async (req, res, next) => {
    const { name, email, title, message } = req.body;
    let att = "name, email, title, message";
    let values = [name, email, title, message];
    let inValues = "?, ?, ?, ?";

    // if (description) {
    //   att += `, description`;
    //   inValues += `, ?`;
    //   values.push(description);
    // }

    try {
      let sql = `INSERT INTO contacts(${att}) VALUES(${inValues})`;
      connection.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // DELETE CONTACT
  app.delete("/contact/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      let sql = `DELETE FROM contacts WHERE id = ${id} `;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // UPDATE CONTACT
  app.put("/contact/:id", async (req, res, next) => {
    const { id } = req.params;
    const { name, email, title, message } = req.body;
    let att = ``;
    let attValues = [];

    if (name) {
      att += ` name = ? ,`;
      attValues.push(name);
    }
    if (email) {
      att += ` email = ? ,`;
      attValues.push(email);
    }
    if (title) {
      att += ` title = ? ,`;
      attValues.push(title);
    }
    if (message) {
      att += ` message = ? ,`;
      attValues.push(message);
    }

    att = att.slice(0, -1);
    att += ` WHERE id = ? `;
    attValues.push(id);

    try {
      let sql = `UPDATE contacts SET ${att} `;
      connection.query(sql, attValues, function (err, result) {
        if (err) throw err;
        res.json({ success: true, result });
      });
    } catch (e) {
      next(e);
    }
  });

  // GET JOIN BLOG AND COMMENT AND USER
  app.get("/fullblog/:id", async (req, res, next) => {
    try {
    let { id } = req.params;
    let comment = `SELECT * FROM comments WHERE blog_id=${id}`;
    
      connection.query(comment, async function (err, data) {
        if (err) throw err;
        if (data.length==0) {
          var sql = `SELECT * FROM blogs WHERE id=${id}`;
          return connection.query(sql, function (err, result) {
            if (err) throw err;
            res.json({ success: true, result });
          });
        } else {
          var sql = `SELECT

        blogs.*, users.*, comments.*
        FROM comments 
        JOIN blogs ON blogs.id = comments.blog_id
        JOIN users ON users.id = comments.user_id
        WHERE blogs.id=${id}
`;
          return connection.query(sql, function (err, result) {
            if (err) throw err;
            res.json({ success: true, result });
          });
        }
      });

      // var resu = connection.query(comment, function (err, result) {
      //   if (err) throw err;
      // });

      // try {
      //   if (resu.id) {
      //     let sql = `SELECT

      //             blogs.*, users.*, comments.*
      //             FROM comments
      //             JOIN blogs ON blogs.id = comments.blog_id
      //             JOIN users ON users.id = comments.user_id
      //             WHERE blogs.id=${id}
      //     `;

      //   } else {
      //     let sql = `SELECT * FROM blogs WHERE id=${id}`;
      //   }
    } catch (e) {
      next(e);
    }
  });
 // GET JOIN QUESTION AND ANSWER AND USER
 app.get("/fullquestion/:id", async (req, res, next) => {
  try {
  let { id } = req.params;
  let answer = `SELECT * FROM answers WHERE question_id=${id}`;
  
    connection.query(answer, async function (err, data) {
      if (err) throw err;
      if (data.length==0) {
        var sql = `SELECT * FROM questions WHERE id=${id}`;
        return connection.query(sql, function (err, result) {
          if (err) throw err;
          res.json({ success: true, result });
        });
      } else {
        var sql = `SELECT

      questions.*, users.*, answers.*
      FROM answers 
      JOIN questions ON questions.id = answers.question_id
      JOIN users ON users.id = answers.user_id
      WHERE questions.id=${id}
`;
        return connection.query(sql, function (err, result) {
          if (err) throw err;
          res.json({ success: true, result });
        });
      }
    });

    // var resu = connection.query(comment, function (err, result) {
    //   if (err) throw err;
    // });

    // try {
    //   if (resu.id) {
    //     let sql = `SELECT

    //             blogs.*, users.*, comments.*
    //             FROM comments
    //             JOIN blogs ON blogs.id = comments.blog_id
    //             JOIN users ON users.id = comments.user_id
    //             WHERE blogs.id=${id}
    //     `;

    //   } else {
    //     let sql = `SELECT * FROM blogs WHERE id=${id}`;
    //   }
  } catch (e) {
    next(e);
  }
});
  
};

start();

app.listen(process.env.PORT || 8000, () =>
  console.log("server listening on port 8000")
);
