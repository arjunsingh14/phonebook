//Initialization
const express = require("express");
const app = express();
const PORT = 3001;
//To access the request body
app.use(express.json());
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/v1/persons", (req, res) => {
  res.status(200).json(persons);
});

app.get("/api/v1/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return res.status(404).json({ msg: "error, not found" });
  }
  res.status(200).json(person);
});

app.post("/api/v1/persons", (req, res) => {
  const data = req.body;
  if (!data.name || !data.number)
    return res
      .status(404)
      .json({ error: "error, name or number not provided" });
  data.id = Math.floor(Math.random() * 100);

  persons.push(data);
  console.log(persons);
  res.status(200).json(data);
});

app.put("/api/v1/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const data = req.body;
  console.log(data);
  const index = persons.findIndex((person) => person.id === id);
  persons[index] = { ...persons[index], data };
  console.log(persons);
  res.status(200).json(data);
});

app.delete("/api/v1/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  console.log(persons);
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
