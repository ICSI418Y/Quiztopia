import { React} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axios } from 'axios';
import Template from './Template';

function Home(){

    return(
        <div>
          <h1>
            Welcome to Quiztopia!!!
          </h1>
          <body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </body>
        </div>
    );
}

export default Home;
