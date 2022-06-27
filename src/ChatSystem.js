import { collection, getDocs } from 'firebase/firestore';
import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap';
import { db } from './firebase-config';
function ChatSystem({ data }) {
    const messageRef = collection(db, 'message-test', `${data.id}`, 'connection');
    const [message, setMessage] = useState([]);
    useEffect(() => {
        
        const getMessages = async () => {
            const messageData = await getDocs(messageRef);
            setMessage(messageData.docs.map((doc) => ({...doc.data(), id: doc.id})));
            messageData.docs.map((doc) => {
               
                
            })
        }
        getMessages();
    }, [])
    console.log(message);
    return (
        <Container>
            {
                message.map((mes) => {
                    return (
                        <h1>{mes.comment}</h1>
                    )
                })
            }
        </Container>
    )
}

export default ChatSystem