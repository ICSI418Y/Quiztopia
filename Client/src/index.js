import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import DeleteAccount from './DeleteAccount';
import './App.css';
import CreateCard from './CreateCard';
import CreateCardSet from './CreateCardSet';
import ReviewSet from './ReviewSet';
import TestSet from './TestSet';
import PracticeTestSet from './TestSet';
import ViewSet from './ViewCardSet';
import ViewCardSet from './ViewSets';
import CreateClass from './CreateClass';
import ViewClass from './ViewClass';
import EditClass from './EditClass';
import ViewFolder from './ViewFolder';
import CreateFolder from './CreateFolder';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route className="navbar-center" path="/" element={<Home />} />
      <Route className="navbar-center" path="/home" element={<Home />} />
      <Route className="navbar-center" path="/signUp" element={<SignUp />} />
      <Route className="navbar-center" path="/login" element={<Login />} />
      <Route className="navbar-center" path="/deleteAccount" element={<DeleteAccount />} />
      <Route className="navbar-center" path="/createCard" element={<CreateCard />} />
      <Route className="navbar-center" path="/createCardSet/:folderID" element={<CreateCardSet />} />
      <Route className="navbar-center" path="/reviewSet" element={<ReviewSet />} />
      <Route className="navbar-center" path="/testSet" element={<TestSet />} />
      <Route className="navbar-center" path="/practiceTest" element={<PracticeTestSet />} />
      <Route className="navbar-center" path="/viewCardSet/:setId" element={<ViewSet />} />
      <Route className="navbar-center" path="/viewCardSets/:folderID" element={<ViewCardSet />} />
      <Route className="navbar-center" path="/createClass" element={<CreateClass />} />
      <Route className="navbar-center" path="/editClass/:classId" element={<EditClass />} />
      <Route className="navbar-center" path="/viewClass/:classId" element={<ViewClass />} />
      <Route className="navbar-center" path="/viewFolder/:folderID" element={<ViewFolder />} />
      <Route className="navbar-center" path="/createFolder/:folderID" element={<CreateFolder/>}/>
    </>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
