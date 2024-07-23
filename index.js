const mongoose = require("mongoose");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object

const schema = new mongoose.Schema(
  {
    myName: String,
    mySID: String,
  },
  { collection: "“s24students”" }
);

// Create a Model object

const studentModel = mongoose.model("student", schema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post("/", async (req, res) => {
  // get the data from the form
  const myuri = req.body.myuri;

  // connect to the database and log the connection
  await mongoose.connect(myuri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // add the data to the database
  const student = new studentModel({
    myName: "Lucas Le",
    mySID: "300382828",
  });
  await student.save();

  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
