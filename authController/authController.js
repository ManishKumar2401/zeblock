const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const Tasks = require("../models/Tasks");
// make link function
String.prototype.makeLink = String.prototype.makeLink ||
  function () {
    return this.replace(/\s+/g, ' ').replace(/^\s+|\s+$/, '').replace(/^\s+|\s+$/gm, '').replaceAll(" ", "_").toLowerCase();
  };

// creating token
const maxAge = 1000 * 60 * 5;
// const maxAge = 1000 * 60 * 60 * 24 * 1;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};


const dateTime = () => {
  let date = new Date();
  return date.toISOString();
};

// Login Function
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.login(email, password);
    const token = createToken(user._id + "-" + user.role);
    res.status(200).json({ id: user._id, name: user.username, email: user.email, role: user.role, token: token, maxAge: maxAge });
  } catch (error) {
    if (error.message.includes("incorrect email")) {
      res.status(400).json({ message: "Email is not exist, please check email." });
    } else if (error.message.includes("incorrect password")) {
      res.status(400).json({ message: "Email or password is incorrect." });
    } else {
      res.status(400).json({ message: "Account is not active." });
    }
  }
};

module.exports.add_task = async (req, res) => {
  const { title, desc, isComplete } = req.body;
  try {
    const task = await Tasks.create({ title: title, desc: desc, isComplete: isComplete })
    res.status(200).json({ success: true, task: task });
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports.taskList = async (req, res) => {
  const { filter } = req.body;
  const find = filter == "all" ? {} : filter == "active" ? {isComplete:false} : {isComplete:true}
  try {
    const tasks = await Tasks.find(find)
    res.status(200).json({ success: true, tasks: tasks });
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports.change_status = async (req, res) => {
  const { id, isComplete } = req.body;
  try {
    const tasks = await Tasks.updateOne({ _id: id }, { isComplete: isComplete })
    res.status(200).json({ success: true});
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports.logout_get = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
