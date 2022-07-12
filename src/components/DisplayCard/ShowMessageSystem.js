import { collection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid';

function ShowMessageSystem({ post }) {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);

    const handleClose = () => setShow(false);

    const [currentUser, setCurrentUser] = useState(null);
    
    const usersRef = collection(db, "users");
    //Pending removal of the messageRef, as we are no longer using "message-system"
    const messageRef = collection(db, "message-system");

    const sendMess = async() {

        var uniqueID = v4();

    }

    
    return (
        <>
        </>
    )
}

export default ShowMessageSystem