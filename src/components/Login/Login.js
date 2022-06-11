
import React, { useState } from 'react'
import {Container, Row, Col, Accordion, Button} from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';

import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../firebase-config';
import { signUpWithPopup, createUserEmailAndPassword, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';

import ExistingUser from './ExistingUser';

import './Login.css';

function Login({ setIsAuth, isUserNull }) {
    console.log(isUserNull);
    let nav = useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            nav("/");
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
            window.location.pathname = "/"
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="login-page">
            <div className='google-login' style={{paddingBottom:'50px'}}>
                <h6 style={{borderBottom:"2px solid #790b0c"}}>Sign in with Google below!</h6>
                {/* <Button variant='outline-primary' onClick={signInWithGoogle}>Login in with Google</Button> */}
                <button className='google-button' onClick={signInWithGoogle}>Login in with Google</button>
            </div>
            <div className='existing-user-login'>
                <ExistingUser login={login}/>
            </div>
        </div>
      
    )
}

export default Login