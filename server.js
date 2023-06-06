const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
// Set EJS as the view engine
app.set("view engine", "ejs");

const pool = mysql.createPool({
  host: "localhost", // Replace with your MySQL host
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "informations", // Replace with your MySQL database name
});

app.get('/', (req, res)=>{
  res.send("hallo sidali");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// app.post("/log", (req, res) => {
//   const { user, pass } = req.body;
//   //validation

//   if (user == "amine" && pass == "14072004") {
//     res.send("Welcome " + user);
//   } else {
//     res.send("sorry this user doesnt exist");
//   }
// });

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Perform authentication and validation using SQL queries
  pool.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (error, results) => {
      if (error) {
        res.send("Error accessing the database.");
      } else {
        if (results.length > 0) {
          res.render("home");
        } else {
          res.send("Invalid username or password!");
        }
      }
    }
  );
});

app.get('/logout', (req, res) => {
  // Perform logout actions, such as destroying the session or removing user authentication status

  // Redirect the user to the login page
  // res.redirect('/login');
  
  res.render("logout");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
