import axios from "axios";

const server = "http://localhost:3001/api/v1/persons";

const getAll = async () => {
  const req = await axios.get(server);
  return req.data
};

const addNumber = async (newPerson) => {
  const response = await axios.post(server, newPerson);
  return response.data;
};

const deleteNumber = async (id) => {
  const response = await axios.delete(`${server}/${id}`);
  console.log(response);
};

export { getAll, addNumber, deleteNumber };
