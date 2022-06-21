
import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Accordion, Button} from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';

import { useNavigate } from 'react-router-dom';
import { auth, provider, db } from '../../firebase-config';
import { signUpWithPopup, createUserEmailAndPassword, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { collection, getDocs, setDoc, addDoc, doc } from 'firebase/firestore';
import ExistingUser from './ExistingUser';
import StockImage from './stockprofilepicture.jpg';

import './Login.css';

function Login({ setIsAuth, isUserNull }) {
    const [users, setUsers] = useState([]);
    const usersRef = collection(db, "users");

    let nav = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            addUserToCollection();
            setIsAuth(true);
            window.location.pathname = "createpost"
        })
    }
    const createAccount = () => {

    }
    //Function gets called in <ExistingUser login={login}/>
    const login = async (email, password) => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            setIsAuth(true);
            localStorage.setItem("isAuth", true);
            //Here we will append into the users collection if the user does not exist.
            addUserToCollection();//Check if we need to add the user, and add if we do.
            window.location.pathname = "createpost"
        } catch (error) {
            console.log(error.message);
            alert("Sorry! An error occured, please try again!");
        }
    }
    const addUserToCollection = () => {
        var userId = auth.currentUser.uid;
        var userExists = false;
        const addUser = async () => {
            // await addDoc(usersRef, {
            //     email: auth.currentUser.email
            // })
            //Returns true or false if the user is found
            if(findUser()) {
                console.log("Found");
                return;
            }
            setDoc(doc(db, "users", auth.currentUser.uid), {
                userId: auth.currentUser.uid,
                email: auth.currentUser.email,
                profilePicture:StockImage,//This will be the source code.
                name:"",
                lastName:"",
                userName:"",
                bio:"",
                friends: [],
                likes: [],
                messages:[],
            })
        }
        addUser();
    }
    const findUser = () => {
        var verified = 0;
        for(var i = 0; i < users.length; ++i) {
            if(users[i].userId == auth.currentUser.uid) {
                return 1;
            }
        }
        return 0;
    }
    
    useEffect(() => {
        const getUsersData = async () => {
            const usersData = await getDocs(usersRef);
            setUsers(usersData.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getUsersData();
        
    }, [])
    console.log(users);
    return (
        <Container fluid className='bg-image'>
        <div className="login-page">
            <div className='google-login' style={{paddingBottom:'50px'}}>
                <h6 style={{borderBottom:"2px solid white", fontSize:'24px'}}>Sign in with Google below!</h6>
                {/* <Button variant='outline-primary' onClick={signInWithGoogle}>Login in with Google</Button> */}
                <button className='google-button' onClick={signInWithGoogle}>Login in with Google</button>
            </div>
            <div className='existing-user-login'>
                <ExistingUser login={login}/>
            </div>
        </div>
        </Container>
      
    )
}

export default Login