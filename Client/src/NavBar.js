import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const Navbar = () => {
  const loggedInUser = localStorage.getItem('loggedInUser')
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [folderID, setFolderID] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loggedInUser != null) {
      axios.post('http://localhost:9000/getUser', { userID: loggedInUser })
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
  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.clear()
    navigate("/Login");
  }
  return (
    <p className='navbar-center'>
      {loggedInUser == null &&
        <>
          <Link to="/Login">Login </Link>
          <Link to="/Signup">Signup </Link>
        </>
      }
      {loggedInUser != null &&
        <>
          <Link to='/Home'>Home </Link>
          <Link to={`/ViewFolder/${folderID}`}>View Folders </Link>
          <Link to='/CreateClass'>Create New Class</Link>
          <button onClick={(handleLogout)}>Logout</button>
        </>
      }
    </p>

  )
}

export default Navbar;
