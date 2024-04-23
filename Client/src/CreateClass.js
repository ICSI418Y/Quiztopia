import axios from "axios";
import React, { useState, useEffect } from "react";
import './index.css';
import Select from 'react-select';
import './App.css';

    const CreateClass = () => {
        const [owner, setOwner] = useState([])
        const [selectedTeachers, setSelectedTeachers] = useState([])
        const [selectedStudents, setSelectedStudents] = useState([])
        const [users, setUsers] = useState([])
        const handleCreateClass = (event, owner, selectedStudents, selectedTeachers) => {
            event.preventDefault()
            axios.get('http://localhost:9000/getFolderByID' , {folder_id}).then((res)=>setRootFolder(res.data))
            axios.post('http://localhost:9000/createTeamRoster', {owner, selectedTeachers, selectedStudents})
            .catch((err) => alert('Error in Creating Class'))
        }
        useEffect(() => {
            axios.get('http://localhost:9000/getUsers').then((res)=>setUsers(res.data))
        })
        const userOptions = users.map((user) => {
            return {label: user.firstName + user.lastName, value: user._id}
            })
        return(
            <div className="background">
                <select onChange={(e) => setOwner(e.target.value)} value={owner}>
                    <option value="">Select Owner of Class</option>
                        {users.map((user, index) => {
                        return <option key={index} value={user._id}>   
                        {user.firstName}{user.lastName}
                    </option>
                    })
                    }
                </select>
                <label className="center">Select Teachers
                    <Select
                        isMulti
                        options={userOptions}
                        value={selectedTeachers}
                        onChange={setSelectedTeachers(e)}
                    />
                </label>
                <label className="center">Select Students
                    <Select
                        isMulti
                        options={userOptions}
                        value={selectedStudents}
                        onChange={setSelectedStudents(e)}
                    />
                </label>
                <button className='loginButtonSpacing' type="button" onClick={(event) => handleCreateClass(event, owner, selectedStudents, selectedTeachers)}>
                        Create Class
                </button>
            </div>
            )
    }

    export default CreateClass;
    