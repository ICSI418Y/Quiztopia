import { React, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import Template from './Template';
import './App.css';
import FolderTemplate from './FolderTemplate';

function Home(){
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');

    const [username, setUsername] = useState("");
    const [folderID, setFolderID] = useState("");
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loggedInUser != null){
            axios.post('http://localhost:9000/getUser', {userID : loggedInUser})
            .then((res) => {
              setUsername(res.data.username);
              setFolderID(res.data.folder);
              setLoading(false);
              if (res.data.classes)
                setClasses(res.data.classes);
            })
            .catch((err) => {
                alert("/getUser: " + err);
            })
        }
    }, [loggedInUser]);

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
          <p className='navbar-center'>
            { loggedInUser == null && 
              <>
                <Link to="/Login">Login </Link>
                <Link to="/Signup">Signup </Link>
              </>
            }
            { loggedInUser != null &&
              <>
                <Link to={`/ViewFolder/${folderID}`}>View Folders </Link>
                <Link to='/CreateClass'>Create New Class</Link>
                <button onClick={(handleLogout)}>Logout</button>
              </>
            }
            <Link to='/help'>Help Desk</Link>
          </p>
          {loggedInUser != null &&
            <>
              <div>
                {classes != null && 
                  <>
                    <h2>
                      Classes:
                    </h2>
                    <ul>
                      {classes.map((clase) => {
                        return(
                          <li>
                            <Link to={`/ViewClass/${clase._id}`}>{clase.title}</Link>
                          </li>
                        );
                    })}
                    </ul>
                  </>
                }
                
                
                <h2>
                  Folders:
                </h2>
                {!loading && folderID && 
                  <>
                    <FolderTemplate folderID = {folderID}/>
                  </>
                }
              </div>
            </>
          }
        </div>
    );
}

export default Home;
