
import axios from "axios"

const API_URL = "http://localhost:3000/todos/"

async function createTodo(task) {
  const { data: newTodo } = await axios.post(API_URL, {
    task,
  })
  return newTodo
}

async function clearList() {
  const message = await axios.delete(API_URL)
  console.log(message);
  return message
}


async function getAllTodos() {
  const { data: todos } = await axios.get(API_URL)
  return todos
}

export default { createTodo, getAllTodos ,clearList }