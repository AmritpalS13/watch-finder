import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarTop from './components/navbar/NavbarTop';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import CreatePost from './components/CreatePost/CreatePost';
import { auth } from './firebase-config';
import { signOut, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  var isUserNull = auth.currentUser;
  if(isAuth === null) {
    setIsAuth(false);
  } 
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = 'login';
    })
  }
  return (
    <Router>
      <h1>{user?.email}</h1>
      <NavbarTop auth={auth} setIsAuth={setIsAuth} isAuth={isAuth} isUserNull={isUserNull} signUserOut={signUserOut}/>
      <Routes>
        <Route path="/" element={<Header />}/>
        <Route path="Login" element={<Login setIsAuth={setIsAuth} isUserNull={isUserNull}/>}/>
        <Route path="createpost" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
