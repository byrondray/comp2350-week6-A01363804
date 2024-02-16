const router = require("express").Router();
const express = require("express");
const database = include("databaseConnection");
const dbModel = include("databaseAccessLayer");
//const dbModel = include('staticData');

router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  console.log("page hit");

  try {
    const result = await dbModel.getAllUsers();
    res.render("index", { allUsers: result });

    //Output the results of the query to the Heroku Logs
    console.log(result);
  } catch (err) {
    res.render("error", { message: "Error reading from MySQL" });
    console.log("Error reading from mysql");
  }
});

router.post("/addUser", async (req, res) => {
  console.log(req.body);
  console.log("form submit");
  try {
    const success = await dbModel.addUser(req.body);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to MySQL 1");
    }
  } catch (err) {
    res.render("error", { message: "Error writing to MySQL" });
    console.log("Error writing to MySQL 2");
    console.log(err);
  }
});

router.get("/deleteUser", async (req, res) => {
  console.log("delete user");
  console.log(req.query);
  let userId = req.query.id;
  if (userId) {
    const success = await dbModel.deleteUser(userId);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to mysql");
      console.log(err);
    }
  }
});

module.exports = router;
