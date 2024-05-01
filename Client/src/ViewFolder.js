import axios from "axios";
import {React, useState, useEffect} from "react";
import { Link, useParams } from 'react-router-dom';
import './index.css';
import './App.css';
import FolderTemplate from "./FolderTemplate";

const ViewFolder = () => {

    const [title, setTitle] = useState("");
    const [parentID, setParentID] = useState('');
    const [parentTitle, setParentTitle] = useState("");

    const { folderID } = useParams();

    useEffect(() =>{
        axios.post('http://localhost:9000/getFolderByID', {folderID })
        .then((res) => {
            setTitle(res.data.title);
            if (res.data.parent){
                setParentID(res.data.parent._id);
                setParentTitle(res.data.parent.title);
            }
            else{
                setParentID('');
                setParentTitle("");
            }
        })
        .catch((err) => {
            alert("ERROR: " + err);
        })
    }, [folderID])

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

    return (
        <div className="background">
            <h1>{
                    parentID != null &&  <Link to={`/viewFolder/${parentID}`}>{parentTitle}</Link>
                } 
                {
                    parentID === '' && <Link to="/home">Home</Link>
                }
                {" >"} {title}
            </h1>
            <FolderTemplate folderID = {folderID}/>
        </div>
    )
}
export default ViewFolder;
