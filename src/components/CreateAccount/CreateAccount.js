import React, { useState } from 'react'

import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword} from 'firebase/auth';

import './CreateAccount.css';

function CreateAccount() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            window.location.pathname = "/";
        } catch(error) {
            alert(error.message);
        }
    }
    return (
        <div className="create-account-container">
            <div className='user-inputs-container'>
                <h6 className='create-account-header'>Create an Account!</h6>
                <input type="text" placeholder='Enter Email' onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="text" placeholder='Enter Password' onChange={(e) => {setPassword(e.target.value)}}/>
                <button className="create-account-button" onClick={() => {signUp()}}>Create Account</button>
            </div>
        </div>
    )
}

export default CreateAccount