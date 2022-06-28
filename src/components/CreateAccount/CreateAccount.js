import React, { useState } from 'react'

import { auth, db } from '../../firebase-config';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, getDocs, setDoc, addDoc, doc } from 'firebase/firestore';

import './CreateAccount.css';

function CreateAccount() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    const addUserToCollection = (user) => {
        const addUser = async (user) => {
            console.log(user);
            setDoc(doc(db, "users", user.user.uid), {
                userId: user.user.uid, 
                email: user.user.email,
                name:"",
                lastName:"",
                userName: userName,
                profilePicture: '/static/media/stockprofilepicture.40b94c438c2e0968be11.jpg',
                bio:"",
                friends: [],
                likes: [],
                messages:[],
            });
        };
        addUser(user);
    }
    const signUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created! ");
            console.log("UID : ", user.user.uid);
            //User is logged in, so we want to add them to the collection.
            addUserToCollection(user);
            //window.location.pathname = "/viewposts";
        } catch(error) {
            alert(error.message);
        }
    }
    return (
        <div className="create-account-container">
            <div className='user-inputs-container'>
                <h6 className='create-account-header'>Create an Account!</h6>
                <input className="input-create" type="text" placeholder='Enter Username' onChange={(e) => {setUserName(e.target.value)}} />
                <input className="input-create"type="text" placeholder='Enter Email' onChange={(e) => {setEmail(e.target.value)}}/>
                <input className="input-create"type="text" placeholder='Enter Password' onChange={(e) => {setPassword(e.target.value)}}/>
                <button className="create-account-button" onClick={() => {signUp()}}>Create Account</button>
            </div>
        </div>
    )
}

export default CreateAccount