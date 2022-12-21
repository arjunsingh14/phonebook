//Initialization
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person.js");
const { response } = require("express");
const { findById, findByIdAndDelete } = require("./models/person.js");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3001;
//Middleware
app.use(express.static("build"));
app.use(express.json());
app.use(cors());

//CRUD operations
app.get("/api/v1/persons", async (req, res) => {
  try {
    const persons = await Person.find({});
    res.status(200).json(persons);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/v1/persons/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findById(id);
  console.log(typeof person._id)
  if (!person) {
    return res.status(404).json({ msg: "error, not found" });
  }
  res.status(200).json(person);
});

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(morgan(":body :method :url :response-time"));

app.post("/api/v1/persons", async (req, res) => {
  const { name, number } = req.body;
  if (!name || !number)
    return res
      .status(404)
      .json({ error: "error, name or number not provided" });

  const person = new Person({
    name,
    number,
  });
  try {
    const savedPerson = await person.save();
    res.status(200).json(savedPerson);
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/v1/persons/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!data.name && !data.number){
    res.status(400).json({ msg: "error, missing values"})
  }
  try {
    const updated = await Person.findByIdAndUpdate(id, data)
    res.status(200).json(updated);
  } catch (error) {
    console.log(error)
    response.status(500).end();
  }
  
});

app.delete("/api/v1/persons/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await findByIdAndDelete(id);
    res.status(200).json({ msg: "deleted" });
  } catch (error) {
    console.log(error);
  }
});

const unknownEndpoint = (req, res, next) => {
  res.status(404).json({ msg: "error not found" });
};

app.use(unknownEndpoint);

const connectDb = async () => {
  return mongoose.connect(process.env.MONGO_URI);
};

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`Listening on ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
