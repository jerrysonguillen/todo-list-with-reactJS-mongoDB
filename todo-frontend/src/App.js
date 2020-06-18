import React, { useState, useEffect } from "react";
import "./App.css";
import APIHelper from "./APIHelper.js";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos();
      setTodos(todos);
    };
    fetchTodoAndSetTodos();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();
    if (!todo) {
      alert("please enter something");
      return;
    }
    if (todos.some(({ task }) => task === todo)) {
      alert(`Task: ${todo} already exists`);
      return;
    }
    const newTodo = await APIHelper.createTodo(todo);
    setTodos([...todos, newTodo]);
  };

  const clearList = async (e) => {
    e.preventDefault();
    await APIHelper.clearList();

    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos();
      setTodos(todos);
    };
    fetchTodoAndSetTodos();
  };

  return (
    <div className="App">
      <div>
        <h1>TO-DO List</h1>
        <input
          id="todo-input"
          type="text"
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
          
        />
        <button type="button" onClick={createTodo}>
          Add
        </button>
      </div>
      <h2>Tasks</h2>

      {todos.map(({ _id, task, completed }, i) => (
        <h5 key={i} className={completed ? "completed" : ""}>
          <input type="checkBox" /> {task}
        </h5>
      ))}
      <hr />
      <button type="button" onClick={clearList}>
        Clear
      </button>
    </div>
  );
}

export default App;
