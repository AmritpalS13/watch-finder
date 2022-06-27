import React, { useState, useEffect } from 'react'
import { Container, Card } from 'react-bootstrap';

import { auth, db } from '../../firebase-config';
import { collection, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore';

import './Messages.css';

/**
 * User, can view the messages he/she has recived in this page.
 * In the message-system a unique messageID was established to create a connection between two parties.
 * 
 * @returns 
 */

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [userMessages, setUserMessages] = useState([]);
    //Get the collection of messages.
    const messageRef = collection(db, "message-test");
    

    const reciverMessages = () => {
        messages.map((message) => {
            console.log("Message ID: ", message.id);
            const mesRef = collection(db, "message-test", `${message.id}`, "connection");
            
            if(message.reciver === auth.currentUser.uid) {
                
            }
        })
    }
    
    useEffect(() => {
        const getMessageData = async () => {
            const messageData = await getDocs(messageRef);
            setMessages(messageData.docs.map((doc) => ({...doc.data(), id: doc.id, collection: getDocs(collection(db, "message-test", `${doc.id}`, "connection"))})));
        }
        getMessageData();
        reciverMessages();//The following function will append the array of the messages for the specific user.
        
    }, [])
   

    
    console.log(messages);
    return (
        <Container>

        </Container>
    );
}

export default Messages;