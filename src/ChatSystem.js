import { collection, getDocs } from 'firebase/firestore';
import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap';
import { db } from './firebase-config';
function ChatSystem({ data }) {
    const messageRef = collection(db, 'message-test', `${data.id}`, 'connection');
    
    useEffect(() => {
        
        const getMessages = async () => {
            const messageData = await getDocs(messageRef);
            messageData.docs.map((doc) => {
                console.log(doc.data());
            })
        }
        getMessages();
    }, [])
    return (
        <Container>
            <h1>{data.id}</h1>
        </Container>
    )
}

export default ChatSystem