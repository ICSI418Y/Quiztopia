import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import './index.css';
import './App.css';

const ViewFolder = () => {
    const [title, setTitle] = useState("");
    const [parentID, setParentID] = useState('');
    const [parentTitle, setParentTitle] = useState("");
    const [children, setChildren] = useState([]);
    const [sets, setSets] = useState([]);
    
    const { folderID } = useParams();

    useEffect(() =>{
        axios.post('http://localhost:9000/getFolderByID', {folderID })
        .then((res) => {
            setTitle(res.data.title);
            if (res.data.parent){
                setParentID(res.data.parent._id);
                setParentTitle(res.data.parent.title);
            }
            
            setChildren(res.data.children);
            setSets(res.data.sets);
        })
        .catch((err) => {
            alert("ERROR: " + err);
        })
    }, [])

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

    return (
        <div className="background">
            <h1>{parentID != null && <Link to={`/viewFolder/${parentID}`}>{parentTitle}</Link>} {">"} {title}</h1>
            <label className="center">
                Folders: <Link to={`/createFolder/${folderID}`}>Create Folder</Link>
            </label>
            <ul>
              {children.map((child) => {
                return (
                  <li>
                    <Link to={`/viewFolder/${child._id}`}>{child.title}</Link>
                    <button onClick={() => handleDeleteFolder(child._id)}> Delete </button>
                  </li>
                );
              })}
            </ul>
            <label>
                Sets:
            </label>
            <ul>
              {sets.map((set) => {
                return (
                  <li>
                    <Link to={`/viewSet/${set._id}`}>{set.title}</Link>
                  </li>
                );
              })
              }
            </ul>
        </div>
    )
}
export default ViewFolder;
