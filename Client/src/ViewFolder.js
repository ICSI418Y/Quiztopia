import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './index.css';
import './App.css';

const ViewFolder = () => {
    const [folder, setFolder] = useState([])
    const [currentFolder_id, setcurrentFolder_id] = useState([])
    const [folderName, setfolderName] = useState('')
    const [folderDelete_id, setfolderDelete_id] = useState([])
    const [selectedSets, setSelectedSets] = useState([])
    const currentSets = []
    const handleCreateFolder = (event, folderName, folder_id) => {
        event.preventDefault()
        axios.post('http://localhost:9000/createFolder', { folderName, folder_id })
            .catch((err) => alert('Error in Creating Folder'))
    }
    const handleDeleteFolder = (event, folder_id) => {
        event.preventDefault()
        axios.post('http://localhost:9000/deleteFolder', { folder_id })
            .catch((err) => alert('Error in Deleting Folder'))
    }
    const handleGetFolder = () => {
        axios.get('http://localhost:9000/getFolderById', currentFolder_id).then((res) => setFolder(res.data))
        currentSets = folder.sets.map((sets) => {
            return { label: sets.title, value: sets._id }
        })
    }
    return (
        <div className="background">
            <h1>{folder.title}</h1>
            <label className="center">Input desired folder's id
                <input type="text" value={currentFolder_id} onChange={(e) => setcurrentFolder_id(e.target.value)} />
            </label>
            <button className='loginButtonSpacing' onClick={handleGetFolder}>Get Folder</button>
            <label className="center">Switch view to child folder
                <select onChange={(e) => setFolder(e.target.value)} value={folder}>
                    <option value="">Select Folder</option>
                    {folder.children.map((folder, index) => {
                        return <option key={index} value={folder._id}>
                            {folder.title}
                        </option>
                    })
                    }
                </select>
            </label>
            <label className="center">Create new child folder
                <label>Name of folder
                    <input type="text" value={folderName} onChange={(e) => setfolderName(e.target.value)} />
                </label>
            </label>
            <button className='loginButtonSpacing' type="button" onClick={(event) => handleCreateFolder(event, folderName, folder._id)}>
                Create Folder
            </button>
            <select onChange={(e) => setfolderDelete_id(e.target.value)} value={folderDelete_id}>
                <option value="">Select Folder to Delete</option>
                {folder.children.map((folder, index) => {
                    return <option key={index} value={folder._id}>
                        {folder.title}
                    </option>
                })
                }
            </select>
            <button className='loginButtonSpacing' type="button" onClick={(event) => handleDeleteFolder(event, folderDelete_id)}>
                Delete Folder
            </button>
            <select onChange={(e) => setSelectedSets(e.target.value)} value={selectedSets}>
                <option value="">Select Set to open</option>
                {currentSets.map((sets, index) => {
                    return <option key={index} value={sets._id}>
                        {sets.title}
                    </option>
                })
                }
            </select>
            <button className='loginButtonSpacing' onClick={(e) => <Link to="/ViewSet"></Link>}>ViewSet</button>
        </div>
    )
}
export default ViewFolder;
