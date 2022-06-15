import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarTop from './components/navbar/NavbarTop';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import CreatePost from './components/CreatePost/CreatePost';


import { auth, db } from './firebase-config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

import './App.css';
import MyAccount from './components/MyAccount/MyAccount';
import CreateAccount from './components/CreateAccount/CreateAccount';

import DisplayCard from './components/DisplayCard/DisplayCard';
import ViewPosts from './components/ViewPosts/ViewPosts';
import TestCard from './TestCard';
import MyPosts from './components/MyAccount/MyPosts/MyPosts';
import SavedPosts from './components/MyAccount/SavesPosts/SavedPosts';
import ViewListing from './components/ViewListing/ViewListing';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const postCollectionRef = collection(db, "posts");
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

  //Commented out because Firebase Quota writes.
  // useEffect(() => {
  //   const getPostData = async () => {
  //     const data = await getDocs(postCollectionRef);
  //     setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  //   }
  //   getPostData();
  // }, []);

  return (
    <Router>
      <NavbarTop auth={auth} setIsAuth={setIsAuth} isAuth={isAuth} isUserNull={isUserNull} signUserOut={signUserOut}/>
      
      <Routes>
        <Route path="/" element={<Header posts={posts}/>}/>
        <Route path="Login" element={<Login setIsAuth={setIsAuth} isUserNull={isUserNull}/>}/>
        <Route path="createaccount" element={<CreateAccount />} />
        <Route path="createpost" element={<CreatePost />} />
        <Route path="myaccount" element={<MyAccount />} />
        <Route path="viewposts" element={<ViewPosts />} />
        <Route path="myaccount/myposts" element={<MyPosts />} />
        <Route path="viewlisting" element={<ViewListing />} />
        {/* <Route path="myaccount" element={<SavedPosts />} /> */}
        <Route path="test" element={<TestCard/>} />
      </Routes>
     
    </Router>
  );
}

export default App;
