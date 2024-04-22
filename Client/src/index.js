import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DBTest from './DBTest.js';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path = "/" element = {<DBTest/>}/>
      <Route path = "/DBTest" element = {<DBTest/>}/>
    </>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router = {router}>
      <App/>
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
