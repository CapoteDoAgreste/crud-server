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
  const { name, cost, category } = req.body;

  if (name != undefined && cost != undefined && category != undefined) {
    let SQL_Script = `insert into games (name,cost, category) values ('${name}', round('${cost}',2),'${category}')`;
    console.log("creating");
    db.query(SQL_Script, (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  } else {
    res.status(400).send("Invalid Game");
  }
});

app.put("/edit", (req, res) => {
  const { id, name, cost, category } = req.body;

  condition2 = name != "" && cost != "" && category != "";

  if (
    name != undefined &&
    cost != undefined &&
    category != undefined &&
    condition2
  ) {
    console.log(
      `Updated ${id} game with name:${name}, cost:${cost} and ${category}`
    );
    let SQL_Script = `update crudgames.games set name = '${name}', cost = round('${cost}',2), category = '${category}' where idgames = ${id}`;
    db.query(SQL_Script, [name, cost, category, id], (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  }
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  let SQL_Script = `Delete from crudgames.games where idgames = ${id}`;
  db.query(SQL_Script, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Server Init");
});
