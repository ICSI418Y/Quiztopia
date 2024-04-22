import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        <form>
            <div>
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
