require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
let port = process.env.PORT;
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const { checkUser } = require("./middleWare/middleWare");
var cors = require("cors");

app.use(cors());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use(express.static("views"));`
app.use("/public/", express.static(process.cwd() + "/public/"));
app.use(express.json());
app.use(cookieParser());

// for Ejs rendering
app.set("view engine", "ejs");
// const mdbURL = `mongodb://127.0.0.1:27017/admin`;
const mdbURL = process.env.MD_DATABASE_URL;

// db connection
mongoose
  .connect(mdbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    })
  )
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/home", (req, res) => res.render("index"));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/zedblock-todo/build')));
  app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '/', 'zedblock-todo', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Site is Updating, Please wait few time'));
}

app.use(authRoutes);
