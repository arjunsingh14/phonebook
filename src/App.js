import "./App.css";
import { useState, useEffect } from "react";
import { getAll, addNumber, deleteNumber } from "./services";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newContact, setContact] = useState({ name: "", number: "" });

  useEffect(() => {
    getAll().then((res) => setPersons(res));
  }, []);

  const handleChange = (e) => {
    setContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (persons.find((elem) => elem.name === newContact.name)) {
      alert("This person already exists");
    } else {
      addNumber(newContact).then((response) =>
        setPersons([...persons, response])
      );
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log(id);
    deleteNumber(id).then(
      setPersons(persons.filter((person) => person.id !== id))
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:{" "}
          <input name="name" value={newContact.name} onChange={handleChange} />
          number:{" "}
          <input
            name="number"
            value={newContact.number}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <div key={person.id}>
            <h2>{person.name}</h2>
            <h5>{person.number}</h5>
            <button type="submit" onClick={(e) => handleDelete(e, person.id)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
