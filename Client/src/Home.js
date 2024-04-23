import { React} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axios } from 'axios';
import Template from './Template';
import './App.css';

function Home(){

    return(
        <div className='center background navbar-center'>
          <h1>
            Welcome to Quiztopia!!!
          </h1>
          <body>
            <Link to="/Login">Login</Link>
            <Link to="/Signup">Signup</Link>
            <Link to="/ViewFolder">View Folders</Link>
          </body>
        </div>
    );
}

export default Home;
