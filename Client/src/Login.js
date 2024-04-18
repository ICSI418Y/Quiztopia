import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  // Intialize state for user input.
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault();
    // TODO: does password hashing happen here or in "server"?
    const loginValues = { userName, password };
    // Reset values, needed if user creates multiple accounts in successsion.
    setPassword("");
    setUserName("");
    axios.post('http://localhost:9000/getUser', loginValues)
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
  return (<div>
    <h1>Login</h1>
    <form>
      Username
      <input value={userName} onChange={(e) => setUserName(e.target.value)} />
      <br />
      Password
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
    </form>
    <button disabled={!(userName && password)} onClick={handleLogin} type="submit">submit</button>
  </div>)
}

export default Login;
