import React, { useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import Mail from './components/mail/Mail';
import EmailList from './components/mail-list/EmailList';
import SendMail from './components/send-mail/SendMail';
import Login from './components/login/Login'
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

import { getDocs, collection , orderBy, query } from 'firebase/firestore/lite';
import { db } from './firebase';
import { getAuth } from 'firebase/auth';


function App() {

  const isComposeMailOpen = useSelector(state => state.mail.isComposeMailOpen);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  // get all mails from firebase
  const q = query(collection(db, "email"), orderBy("timestamp", "desc"));
  const docSnap = getDocs(q);

  docSnap.then(data => {
      const setEmailsObject = [];
      data.docs.forEach((mail) => {
          const data = mail._document.data.value.mapValue.fields;
          const to = data.to.stringValue;
          const message = data.message.stringValue;
          const subject = data.subject.stringValue;
          const timestamp = data.timestamp.timestampValue;
          const mailDetails = {
              "to": to,
              "subject": subject,
              "message": message,
              "timestamp": timestamp,
          }
          setEmailsObject.push(mailDetails);
      })
      // updated redux 
      dispatch({
          type:"loadInbox",
          payload:setEmailsObject,
      })
  }).catch(error => 
      console.log(error)
  )

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
