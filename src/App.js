import React, { useEffect, useState } from 'react'

import './App.css';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Mail from './components/mail/Mail';
import EmailList from './components/mail-list/EmailList';
import SendMail from './components/send-mail/SendMail';
import Login from './components/login/Login';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
function App() {

  const isComposeMailOpen = useSelector(state => state.mail.isComposeMailOpen);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  


  useEffect(()=>{
    const auth = getAuth();
    auth.onAuthStateChanged(user =>{
      if(user){

        // user is already logged in 
        dispatch({
          type: "login",
          payload: {
            "displayName" : user.displayName,
            "email": user.email,
            "photoUrl": user.photoURL,   
           }
        })
      }
    })
  },[])
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Navbar />
          <div className="app-body">
            <Sidebar />
            <Routes>
              <Route path='/mail' element={<Mail />} />
              <Route path='/' element={<EmailList />} />
            </Routes>
          </div>
          {isComposeMailOpen && <SendMail />}
        </div>
      )}
    </Router>

  );
}

export default App;
