import { React, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import Template from './Template';
import './App.css';

function Home(){

    const loggedInUser = localStorage.getItem('loggedInUser')

    const [username, setUsername] = useState("");
    const [folder, setFolder] = useState("");

    useEffect(() => {
        axios.post('http://localhost:9000/getUser', {userID : loggedInUser})
        .then((res) => {
          setUsername(res.data.username);
          setFolder(res.data.folder);
        })
        .catch((err) => {
            alert("ERROR: " + err);
        })
    }, []);

    const handleLogout = (event) =>{
      event.preventDefault();
    }

    return(
        <div className='background navbar-center'>
          <h1>
            Welcome{loggedInUser !=null && `, ${username}`} to Quiztopia!!!
          </h1>
          <body>
            <Link to="/Login">Login </Link>
            <Link to="/Signup">Signup </Link>
            { loggedInUser != null &&
              <Link to={`/ViewFolder/${folder}}`}>View Folders </Link>
            }

          </body>
          <button onClick={(handleLogout)}>Logout</button>
        </div>
    );
}

export default Home;
