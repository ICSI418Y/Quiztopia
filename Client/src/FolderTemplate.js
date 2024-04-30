import axios from "axios";
import {React, useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import './App.css';

function FolderTemplate(){
    const navigate = useNavigate();

    const [parentID, setParentID] = useState('');
    const [parentTitle, setParentTitle] = useState("");
    const [children, setChildren] = useState([]);
    const [sets, setSets] = useState([]);
    const [folderID, setFolderID] = useState('')

    const loggedInUser = localStorage.getItem('loggedInUser')

    useEffect(() =>{
        axios.post('http://localhost:9000/getUser', {userID : loggedInUser})
        .then((res) => {
            setFolderID(res.data.folder)
            axios.post('http://localhost:9000/getFolderByID', {folderID : res.data.folder})
            .then((res) => {
                if (res.data.parent){
                    setParentID(res.data.parent._id);
                    setParentTitle(res.data.parent.title);
                }
                
                setChildren(res.data.children);
                setSets(res.data.sets);
            })
            .catch((err) => {
                alert("ERROR: /getFolderByID: " + err);
            })
        })
        .catch((err) => {
          alert("ERROR: /getUser: " + err);
        })
    }, [])

    const handleDeleteFolder = (folder_id) => {
        //event.preventDefault()
        axios.post('http://localhost:9000/deleteFolder', { deletedID: folder_id })
            .catch((err) => alert('Error in Deleting Folder: ' + err));
    }

    return (
        <div>
            <label className="center">
                Folders: <Link to={`/createFolder/${folderID}`}>Create New Folder</Link>
            </label>
            <ul>
              {children.map((child) => {
                return (
                  <li>
                    <Link to={`http://localhost:9000/viewFolder/${child._id}`}>{child.title}</Link>
                    <button onClick={() => handleDeleteFolder(child._id)}> Delete </button>
                  </li>
                );
              })}
            </ul>
            <label>
                Sets: <Link to={`/createCardSet/${folderID}`}>Create New Set</Link>
            </label>
            <ul>
              {sets.map((set) => {
                return (
                  <li>
                    <Link to={`/viewCardSet/${set._id}`}>{set.title}</Link>
                  </li>
                );
              })
              }
            </ul>
        </div>
    )
}

export default FolderTemplate;
