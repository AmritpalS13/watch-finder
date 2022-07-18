import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase-config';

/**
 * 1 - This will contain all the front-end design work, and just be the display for the message
 * 2 - There will be a button which will be redirected to the message-room.
 * 3 - 
 * 
 */
//This function will recive a prop, and this prop is the user that is logged in as of right now.
function MessageCard({ user }) {

    const [messages, setMessages] = useState(null);    
    
    const message_system_ref = collection(db, "users", `${user.id}`, "message-system");

    useEffect(() => {
        //We need to load in the message-system collection and it's documents.
        const messageData = async () => {
            const data = await getDocs(message_system_ref);
            data.docs.map((data) => {
                console.log(data);
            })
        }
        messageData();
    }, [])
    return (
        <>
        </>
    )
}

export default MessageCard