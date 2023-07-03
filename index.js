const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crudgames",
});

/*
app.get("/", (req, res) => {
  let SQL_Script =
    "insert into games (name,cost, category) values ('Far Cry 5', '120','Ação')";

  db.query(SQL_Script, (err, result) => {
    console.log(err);
  });
});
*/
app.use(cors());
app.use(express.json());

app.get("/getCards", (req, res) => {
  let SQL_Script = "Select * from games";
  db.query(SQL_Script, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  let SQL_Script = `insert into games (name,cost, category) values ('${name}', '${cost}','${category}')`;
  db.query(SQL_Script, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Server Init");
});
