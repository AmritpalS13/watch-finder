import React, { useState, useEffect } from 'react'
import { auth, db } from './firebase-config';

import { Container, Button } from 'react-bootstrap';



import './TestForum.css';
/**
 * 1- User must be logged in to view and interact!
 * 2 - Catagorize based on city, (So far just Toronto)
 * 3 - Allow for input, and display the inputs.
 * 4 - Pull from the Firestore db
 * 
 */
function TestForum() {
    //The following is just test data.
    const [temp, setTemp] = useState("");
    const [message, setMessage] = useState([]);
    
    //The following method is also how we can implement a like system.
    const send = () => {
        var array = message; // set the array equal to the local state.
        array.push(temp);
        //write thev database.
        setMessage(array);
        setTemp("");//empty the input.
    }
    
    return (
        <Container>
            <h6>Messaging system Test Page.</h6>
            <input className="message-input" type="text" placeholder='send message...' onChange={(e) => setTemp(e.target.value)}></input>
            <Button onClick={() => send()}>Send</Button>
        </Container>
    );
}

export default TestForum