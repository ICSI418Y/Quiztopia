import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

function DeleteAccount() {
  const navigate = useNavigate();
  // Intialize state for user input.
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const loggedInUser = localStorage.getItem('loggedInUser')

  // TODO: how should deletion work:
  // 1. DeleteUser in server takes in username and password and deletes user if possible
  // 2. first use GetUser to verify that this user owns this account, then do DeleteUser with users's id
  // TODO: should deletion only work for the currently logged in user
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
  return (
    // TODO: use template
    // for conditional rendering
    <div>
      <h1>Account Deletion</h1>
      {loggedInUser != null &&
        <>
          <form>
            Please enter your username to verify it is you
            <input value={userName} onChange={(e) => setUserName(e.target.value)} />
            <br />
            Please enter your password to verify it is you
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </form>
          <button disabled={!(userName && password)}

            onClick={(event) => {
              // prompt the user with yes or no question to see if they really want ot delete their account, only try to delete it if they say yes
              if (window.confirm("Do you really want to delete your account?")) { handleDeleteAccount(event) }
            }}
            type="submit">Delete Your Account</button>
        </>}
      {loggedInUser == null && <>
        <p className="text-center">
          This page is unavailable unless you have an account. <br />
          Already have an account? <Link to="/login">Login</Link>
          <br />
          Want to create an account? <Link to="/signUp">Sign Up</Link>
        </p>
      </>}
    </div>)
}

export default DeleteAccount;
