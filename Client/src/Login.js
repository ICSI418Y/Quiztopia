import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './App.css';

function Login() {
  const navigate = useNavigate();
  // Intialize state for user input.
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault();
    // TODO: does password hashing happen here or in "server"?
    const loginValues = { username: username, password : password};
    // Reset values, needed if user creates multiple accounts in successsion.
    setPassword("");
    setUsername("");
    axios.post('http://localhost:9000/loginUser', loginValues)
      .then((res) => {
        if (res.data) {
          // update local storage with new user
          localStorage.clear()
          localStorage.setItem('loggedInUser', res.data._id)
          navigate("/Home");
          alert('Login Successful')
        }
        else
          alert('Wrong Credentials')
      })
      // TODO: maybe have better errors.
      .catch((_) => alert('Error in Login'));
  };
  return (<div className="background">
    <h1>Login</h1>
    <form className="center">
      Username
      <input className="inputBoxSizes" value={username} onChange={(e) => {setUsername(e.target.value)}} />
      <br />
      Password
      <input className="inputBoxSizes" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
      <br />
    </form>
    <button className="loginButtonSpacing" disabled={!(username && password)} onClick={handleLogin} type="submit">submit</button>
  </div>)
}

export default Login;
