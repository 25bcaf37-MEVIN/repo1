body {
  font-family: sans-serif;
  background: #f0f2f5;
  margin: 0;
  padding: 0;
}

.todo-container, .login-container {
  width: 300px;
  margin: 60px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

form {
  display: flex;
  margin: 12px 0;
}

input[type="text"] {
  flex: 1;
  padding: 8px;
  border-radius: 4px 0 0 4px;
  border: 1px solid #ccc;
  border-right: none;
  outline: none;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 0 4px 4px 0;
  background: #007bfc;
  color: #fff;
  cursor: pointer;
}

button:active {
  background: #005bb5;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li span {
  cursor: pointer;
  flex: 1;
}
