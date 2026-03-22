import React, { useState } from "react";
import Login from "./Login";
import TodoList from "./TodoList";

function App() {
  const [user, setUser] = useState(() => {
    // Check if user is already logged in
    return localStorage.getItem('user') || null;
  });

  const onLogin = (username) => {
    setUser(username);
    localStorage.setItem('user', username);
  };

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div>
      {user ? (
        <TodoList user={user} onLogout={onLogout} />
      ) : (
        <Login onLogin={onLogin} />
      )}
    </div>
  );
}

export default App;
