import axios from "axios";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import './index.css';
import Select from 'react-select';
import './App.css';

const EditClass = () => {
    const [thisClass, setClass] = useState([])
    const [selectedTeachers, setSelectedTeachers] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])
    const [users, setUsers] = useState([])
    const handleEditClass = (event, selectedStudents, selectedTeachers) => {
        event.preventDefault()
        axios.post('http://localhost:9000/editStudents', { selectedStudents })
            .catch((err) => alert('Error in Creating Class'))
        axios.post('http://localhost:9000/editTeachers', { selectedTeachers })
            .catch((err) => alert('Error in Creating Class'))
    }

    useEffect(() => {
        axios.get('http://localhost:9000/getUsers').then((res) => setUsers(res.data))
        axios.get('http://localhost:9000/getClass').then((res) => setClass(res.data))
    })
    const userOptions = users.map((user) => {
        return { label: user.firstName + user.lastName, value: user._id }
    })
    const teacherOptions = thisClass.teachers.users.map((user) => {
        return { label: user.firstName + user.lastName, value: user._id }
    })
    const studentOptions = thisClass.students.users.map((user) => {
        return { label: user.firstName + user.lastName, value: user._id }
    })
    return (
        <div className="center background">
            <label>Select Teachers To Add
                <Select
                    isMulti
                    options={userOptions}
                    value={selectedTeachers}
                    onChange={setSelectedTeachers(e)}
                />
            </label>
            <label>Select Students To Add
                <Select
                    isMulti
                    options={userOptions}
                    value={selectedStudents}
                    onChange={setSelectedStudents(e)}
                />
            </label>
            <label>Select Teachers To Remove
                <Select
                    isMulti
                    options={teacherOptions}
                    value={selectedTeachers}
                    onChange={setSelectedTeachers(e)}
                />
            </label>
            <label>Select Students To Remove
                <Select
                    isMulti
                    options={studentOptions}
                    value={selectedStudents}
                    onChange={setSelectedStudents(e)}
                />
            </label>
            <button className='loginButtonSpacing' type="button" onClick={(event) => handleEditClass(event, selectedStudents, selectedTeachers)}>
                Create Class
            </button>
            <p>
                Would you like to edit your folders? <Link to="/ViewFolder">Folders</Link>
            </p>
            <p>
                Would you like to edit your sets? <Link to="/ViewSet">Folders</Link>
            </p>
        </div>
    )
}

export default EditClass;

