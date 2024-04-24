import axios from "axios";
import {React, useState, useEffect} from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import './index.css';
import './App.css';

const ViewFolder = () => {
    const navigate = useNavigate();

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

    const handleDeleteFolder = (folder_id) => {
        //event.preventDefault()
        axios.post('http://localhost:9000/deleteFolder', { deletedID: folder_id })
            .catch((err) => alert('Error in Deleting Folder: ' + err));
    }

    const switchFolder = (childID) => {
        //event.preventDefault()

        navigate(`/viewFolder/${childID}`);

        axios.post('http://localhost:9000/getFolderByID', { folderID: childID })
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
    }

    return (
        <div className="background">
            <h1>{
                    parentID != null && <button onClick={() => switchFolder(parentID)}> {parentTitle} </button>
                } 
                {
                    parentID == null && <Link to="/home">Home</Link>
                }
                {">"} {title}</h1>
            <label className="center">
                Folders: <Link to={`/createFolder/${folderID}`}>Create New Folder</Link>
            </label>
            <ul>
              {children.map((child) => {
                return (
                  <li>
                    <button onClick={() => switchFolder(child._id)}> {child.title} </button>
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
export default ViewFolder;
