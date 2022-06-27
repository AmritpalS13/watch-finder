import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { v4 } from 'uuid';

import { storage, db, auth } from './firebase-config';
import { addDoc, collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';

function TestMessage() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [message_sys, setMessage_sys] = useState([]);
    //The two ID's of the sender and reciver.
    const sender = "1234";
    const reciver = "1313";

    const messageRef = collection(db, "message-test");
    const userRef = collection(db, "users");
    const messageSent = () => {
        var message_id = v4();//produces a unique ID.
        //we want to add a document into the message-test collection.
        const addMessageSystem = async () => {
            
            const data = await addDoc(messageRef, {
                message_id: v4(),
                sender_id: user.userId,
                reciver: user.userId,//this is for testing purposes.
            });
            console.log("Doc id : ", data.id);
            //This would be how we create a sub collection inside the document, that we can now use.
            const test = collection(db, 'message-test', `${data.id}`, 'connection');//"connection" is the sub-collection.
            const subCol = await addDoc(test, {
                comment: message,
            });

            
        }
        addMessageSystem();
    }

    const findUser = (docData) => {
        if(docData.userId === auth.currentUser.uid) {
            setUser(docData);   
        }
    }
    const setMessageData = (data) => {
        var temp = message_sys;
        temp.push(data);
        setMessage_sys(temp);
    }
    useEffect(() => {
        const getMessageData = async () => {
            const messageData = await getDocs(messageRef);
            messageData.docs.map((doc) => {
                setMessageData(doc.data());//puts objects into an array.
            })
        }
        const getUsersData = async () => {
            const userData = await getDocs(userRef);
            //Iterating over all the users.
            userData.docs.map((doc) => {
                findUser(doc.data());
            })
        }
        getUsersData();
        getMessageData();
    }, []);
    
    return (
        <Container>
            {
                message_sys.map((messageSys) => {
                    if(messageSys.reciver === auth.currentUser.uid) {
                        return (
                            <p>Here</p>
                        )
                    } else {
                        return (
                            <p>No</p>
                        )
                    }
                })
            }
            <input type="text" placeholder='message' onChange={(event) => setMessage(event.target.value)}/>
            <button onClick={() => messageSent()}>Message</button>
        </Container>
    )
}

export default TestMessage