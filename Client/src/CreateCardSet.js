import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Template from './Template';
import './App.css';

const CreateCardSet = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [flashCards, setFlashcards] = useState([]);

    const {folderID} = useParams();

    const handleCreateSet = (event) => {
        event.preventDefault();
        setFlashcards([]);
        axios.post('http://localhost:9000/createSet', { parent : folderID, title, description })
            .then(() => {
            alert('Set created successfully')
            })
            .catch((err) => alert('Error creating set'));
    };

    return Template("Create Set",
        <form className='background' onSubmit={(event) => handleCreateSet(event)}>
            <label className='center'>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <br />
            <label className='center'>
                Description:
                <input
                    type="textvalue"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <br />
            <button className='loginButtonSpacing' onClick={(e) => <Link to ="/CreateCard/${set._id}"></Link>}>Create Set</button>
        </form>
    );
};

export default CreateCardSet;
