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
  const uid = new Date().getTime()
  console.log(req.body);
  console.log(uid);
  try {
    if(email === "user@gmail.com" && password === "User@123"){
      const token = createToken(uid);
      res.status(200).json({ id: uid, name: "User", email: email, token: token, maxAge: maxAge });
    } else{
      res.status(400).json({ message: "Email or password is incorrect." });
    }
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
    let keys = title + ", " + desc
    const task = await Tasks.create({ title: title, desc: desc, isComplete: isComplete, keywords: keys })
    res.status(200).json({ success: true, task: task });
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports.edit_task = async (req, res) => {
  const { title, desc, isComplete, _id } = req.body;
  try {
    let keys = title + ", " + desc
    const task = await Tasks.updateOne({ _id: _id }, { title: title, desc: desc, isComplete: isComplete, keywords: keys })
    res.status(200).json({ success: true, task: task });
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports.taskList = async (req, res) => {
  const { filter, search } = req.body;
  const find = filter == "all" ? { keywords: { $regex: search, $options: "i" } } : filter == "active" ? { $and: [{ keywords: { $regex: search, $options: "i" } }, { isComplete: false }] } : { $and: [{ keywords: { $regex: search, $options: "i" } }, { isComplete: true }] }
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
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports.delete_completed = async (req, res) => {
  try {
    const tasks = await Tasks.deleteMany({ isComplete: true })
    if (tasks.deletedCount) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports.delete_task = async (req, res) => {
  const { id } = req.body
  try {
    const tasks = await Tasks.deleteOne({ _id: id })
    if (tasks.deletedCount) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports.undon_delete = async (req, res) => {
  const { data } = req.body
  try {
    const tasks = await Tasks.insertMany(data)
    res.status(200).json({ success: true, tasks: tasks });
  } catch (error) {
    res.status(400).json({ error });
  }
}
