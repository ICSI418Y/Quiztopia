import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const ViewCardSet= () => {
    const [CardSets, setCardSets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/getSets')
        .then(function (response) {
            setCardSets(response.data);
            console.log('sets', response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    return (
        <form className='center background'>
            <div className='center background'>
                <h1>Flash Card Sets</h1>
                <ul>
                    {CardSets.map((sets) => (
                        <li key={sets._id}>
                            <Link to={'/ViewCardSet/${set._id'}>{set.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </form>
    );
}

export default ViewCardSet;
