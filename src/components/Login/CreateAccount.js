import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth';

function CreateAccount( { setIsAuth } ) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    let nav = useNavigate();
    const signUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            setIsAuth(true);
            window.Location.pathname = "/";
            
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e) => setPassword(e.target.value)}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={() => signUp()}>
            Submit
            </Button>
        </Form>
    )
}

export default CreateAccount