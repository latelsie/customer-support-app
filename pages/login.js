// pages/login.js
import React, { useState } from 'react';
import classes from './Login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setMessage(data.message);

    if (data.success) {
      if (data.usertype === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/client';
      }
    }
  };
return(
    <div className={classes.container}>
      <h1 className={classes.title}>Log In</h1>
      <form onSubmit={handleLogin} className={classes.form}>
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={classes.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.input}
        />
        <button type="submit" className={classes.button}>
          Log In
        </button>
      </form>
      {message && <p className={classes.message}>{message}</p>}
    </div>
  );
}
