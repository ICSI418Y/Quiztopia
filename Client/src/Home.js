import { React, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import Template from './Template';
import './App.css';

function Home(){
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser')

    const [username, setUsername] = useState("");
    const [folder, setFolder] = useState("");
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:9000/getUser', {userID : loggedInUser})
        .then((res) => {
          setUsername(res.data.username);
          setFolder(res.data.folder);
          setClasses(res.data.classes);
        })
        .catch((err) => {
            alert("ERROR: " + err);
        })
    }, []);

    const handleLogout = (event) =>{
      event.preventDefault();
      localStorage.clear();
      navigate('/login');
    }

    return(
        <div className='background'>
          <h1>
            Welcome{loggedInUser !=null && `, ${username}`} to Quiztopia!!!
          </h1>
          <body className='navbar-center'>
            <Link to="/Login">Login </Link>
            <Link to="/Signup">Signup </Link>
            { loggedInUser != null &&
              <Link to={`/ViewFolder/${folder}`}>View Folders </Link>
            }
            {classes.map((classs) => {
              <Link to={`/ViewClass/${classs._id}`}>{classs.title}</Link>
            })}
            <Link to="/ViewCardSet">View Card Set</Link>
          </body>
          <button onClick={(handleLogout)}>Logout</button>
        </div>
    );
}

export default Home;
