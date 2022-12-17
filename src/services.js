import axios from "axios";

const server = "http://localhost:3001/persons";

const getAll = async () => {
  const req = axios.get(server);
  return req.then((response) => response.data);
};

const addNumber = async (newPerson) => {
  const response = await axios.post(server, newPerson);
  return response.data;
};

const deleteNumber = async (id) => {
  console.log(id);
  const response = await axios.delete(`${server}/${id}`);
  console.log(response);
};

export { getAll, addNumber, deleteNumber };
