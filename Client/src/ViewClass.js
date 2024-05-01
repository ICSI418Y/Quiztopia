import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link, useParams} from 'react-router-dom';
import Template from './Template.js'
import FolderTemplate from "./FolderTemplate.js";
import './index.css';
import './App.css';

const ViewClass = () => {

    const loggedInUser = localStorage.getItem('loggedInUser');

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [folderID, setFolderID] = useState('');
    const [ownerID, setOwnerID] = useState('');
    const [studentIDs, setStudentIDs] = useState([]);
    const [teacherIDs, setTeacherIDs] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    const { classID } = useParams();

    useEffect(() => {
        axios.post('http://localhost:9000/getClass', {classID})
        .then((res) => {
            setTitle(res.data.title);
            setDescription(res.data.description);
            setFolderID(res.data.folder);
            setLoading(false);
            setOwnerID(res.data.owner);
            setTeacherIDs(res.data.teachers);
            setStudentIDs(res.data.students);
        })
        .catch((err) => {
            alert("ERROR: /getClass: " + err);
        });
    }, [classID]);

    const removeTeacher = (teacher) => {

    };

    const removeStudent = (student) => {

    };

    return Template(title, 
      <div className="background">
        { loggedInUser == ownerID &&
          <>
            <h2>Teachers: <Link>Add teachers</Link></h2>
            <ul>
              {teachers.map((teacher) => {
                return (
                    <li>
                      {`${teacher.firstName} ${teacher. lastName} `}
                      <button 
                        onClick = {removeTeacher(teacher._id)}
                      >Remove teacher</button>
                    </li>
                )
              })}
            </ul>
          </>
        }
        { (loggedInUser == ownerID || teacherIDs.indexOf(loggedInUser) != -1) &&
            <>
              <h2>Students: </h2>
              <ul>
                {students.map((student) => {
                    return (
                        <li>
                          {`${student.firstName} ${student.lastName} `}
                          <button
                            onClick = {removeStudent(student)}
                          >Remove Student</button>
                        </li>
                    )
                })}
              </ul>
            </>
        }
        {!loading && folderID && 
          <FolderTemplate folderID = {folderID}/>
        }
      </div>
    );
}
export default ViewClass;
