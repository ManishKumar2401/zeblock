const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  role: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String
  },
  isActive: {
    type: Boolean
  },
  createdAt: { type: Date }
});

// fire a function after save in db
userSchema.post("save", function (doc, next) {
  // console.log("new user has been created and saved", doc);
  next();
});

// fire a function befor save in db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("update", async function (next) {
  const salt = await bcrypt.genSalt();
  this._update.password = await bcrypt.hash(this._update.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email.replaceAll(" ", "") });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  } else if (user && !user.isActive) {
    throw Error("inactive");
  } else {
    throw Error("incorrect email");
  }
};

userSchema.statics.checkPassword = async function (id, password) {
  const user = await this.findOne({ _id: id });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect Password");
  }
  throw Error("incorrect email");
};

const Users = mongoose.model("users", userSchema);

module.exports = Users;
