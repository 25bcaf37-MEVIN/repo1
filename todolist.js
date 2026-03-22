import React, { useState, useEffect } from "react";

function getUserTodos(user) {
  const saved = localStorage.getItem(`todos_${user}`);
  return saved ? JSON.parse(saved) : [];
}

function saveUserTodos(user, todos) {
  localStorage.setItem(`todos_${user}`, JSON.stringify(todos));
}

function TodoList({ user, onLogout }) {
  const [todos, setTodos] = useState(() => getUserTodos(user));
  const [input, setInput] = useState("");

  useEffect(() => {
    saveUserTodos(user, todos);
  }, [todos, user]);

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { text: input.trim(), completed: false }]);
      setInput("");
    }
  };

  const toggleTodo = (idx) => {
    setTodos(
      todos.map((todo, i) =>
        i === idx ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (idx) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <div className="todo-container">
      <div className="header">
        <h2>{user}'s To-Do List</h2>
        <button onClick={onLogout}>Logout</button>
      </div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo, idx) => (
          <li
            key={idx}
            style={{
              textDecoration: todo.completed ? "line-through" : "none"
            }}
          >
            <span onClick={() => toggleTodo(idx)}>{todo.text}</span>
            <button onClick={() => deleteTodo(idx)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
