import axios from "axios";
import React, { useState, useEffect } from "react";
import './index.css';
import './App.css';

    const ViewClass = () => {
        const [thisClass, setClass] = useState([])
        const [studentRoster, setStudentRoster] = useState([])
        const [teacherRoster, setTeacherRoster] = useState([])
        const studentNames = []
        const teacherNames = []
        useEffect(() => {
            axios.get('http://localhost:9000/getClass').then((res)=>setClass(res.data))
            axios.get('http://localhost:9000/getRoster', thisClass.students).then((res)=>setStudentRoster(res.data))
            axios.get('http://localhost:9000/getRoster', thisClass.teachers).then((res)=>setTeacherRoster(res.data))
        })
        const studentUsers = studentRoster.users
        const teacherUsers = teacherRoster.users
        for(let i=0; i<studentRoster.users.length; i++){
            const name = studentRoster.users[i].firstName + studentRoster.users[i].lastName
            studentNames[i] = name
        }
        for(let i=0; i<teacherRoster.users.length; i++){
            const name = teacherRoster.users[i].firstName + teacherRoster.users[i].lastName
            teacherNames[i] = name
        }
        return(
            <form className="center background">
                <div>
                    Names of teachers in class: {this.props.teacherNames.map(txt => <p>{txt}</p>)}
                </div>
                <div>
                    Names of students in class: {this.props.studentNamesNames.map(txt => <p>{txt}</p>)}
                </div>
                <p>
                    Would you like to edit your class? <Link to="/EditClass">Folders</Link>
                </p>
                <p>
                    Would you like to view your folders? <Link to="/ViewFolder">Folders</Link>
                </p>
            </form>
        )
    }
    export default ViewClass;