const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title :{type: String},
  desc :{type: String},
  isComplete:{ type: Boolean }
});

// fire a function after save in db
taskSchema.post("save", function (doc, next) {
  // console.log("new user has been created and saved", doc);
  next();
});

// fire a function befor save in db
taskSchema.pre("save", async function (next) {
  next();
});

const Tasks = mongoose.model("tasks", taskSchema);

module.exports = Tasks;
