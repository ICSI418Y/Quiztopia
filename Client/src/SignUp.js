import React, { useState } from "react";
import axios from "axios";
import './App.css';

function SignUp() {
  // Intialize state for user input.
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  // Used so that the user has to retype their password, in case they mistype it.
  const [passwordRepeat, setPasswordRepeat] = useState("")

  const handleSignUp = (event) => {
    event.preventDefault();
    const signupValues = { firstName, lastName, userName, password };
    // Reset values, needed if user creates multiple accounts in successsion.
    setPassword("");
    setPasswordRepeat("");
    setUserName("");
    setFirstName("");
    setLastName("");
    axios.post('http://localhost:9000/createUser', signupValues)
      .catch((_) => alert('Error in Signing Up'));
  };
  return (<div className="center background">
    <h1>Sign Up</h1>
    <form>
      Username
      <input className="inputBoxSizes" value={userName} onChange={(e) => setUserName(e.target.value)} />
      <br />
      Password
      <input className="inputBoxSizes" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      Please repeat your password
      <input className="inputBoxSizes" type="password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
      {
        // Conditional rendering for password validation.
      }
      <>
        {(password && passwordRepeat && password === passwordRepeat) && "✔️"}
      </>
      <>
        {(password === "" || passwordRepeat === "" || password !== passwordRepeat) && "❌"}
      </>
      <br />
      First Name
      <input className="inputBoxSizes" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <br />
      Last Name
      <input className="inputBoxSizes" value={lastName} onChange={(e) => setLastName(e.target.value)} />
    </form>
    <button className="createAccountButtonSpacing" disabled={!(userName && firstName && lastName && password && passwordRepeat && passwordRepeat === password)} onClick={handleSignUp} type="submit">submit</button>
  </div>)
}

export default SignUp;
