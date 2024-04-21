import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Template from "./Template";
import './App.css';

function DeleteAccount() {
  const navigate = useNavigate();
  // Intialize state for user input.
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const handleDeleteAccount = (event) => {
    event.preventDefault();
    const deleteAccountValues = { userName, password };
    setPassword("");
    setUserName("");
    axios.post('http://localhost:9000/DeleteUser', deleteAccountValues)
      .then(_ => {
        localStorage.clear();
        navigate("/Home");
      })
      .catch((_) => alert('Error in Account Deletion Up'));
  };
  return Template("Account deletion",
    <div className="center background">
      <form>
        Please enter your username to verify it is you
        <input className="inputBoxSizes" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <br />
        Please enter your password to verify it is you
        <input className="inputBoxSizes" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </form>
      <button className="loginButtonSpacing" disabled={!(userName && password)}

        onClick={(event) => {
          // prompt the user with yes or no question to see if they really want ot delete their account, only try to delete it if they say yes
          if (window.confirm("Do you really want to delete your account?")) { handleDeleteAccount(event) }
        }}
        type="submit">Delete Your Account</button>
    </div>)
}

export default DeleteAccount;
