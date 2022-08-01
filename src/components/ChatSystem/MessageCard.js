import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect, useReducer } from 'react'
import { db } from '../../firebase-config';

/**
 * 1 - This will contain all the front-end design work, and just be the display for the message
 * 2 - There will be a button which will be redirected to the message-room.
 * 3 - 
 * 
 */
//This function will recive a prop, and this prop is the user that is logged in as of right now.
function MessageCard({ user }) {

    const [chatRooms, setChatRooms] = useState(null);    
    
    const message_system_ref = collection(db, "users", `${user.id}`, "message-system");

    useEffect(() => {
        //We need to load in the message-system collection and it's documents.
        const messageData = async () => {
            const data = await getDocs(message_system_ref);

            //This would contain the chat-rooms, that is the message link between two users.
            //The user can have multiple different char-rooms, based on the amount of messages they recived.
            setChatRooms(data.docs.map((doc) => ({...doc.data()})));
            
        }
        messageData();
    }, [])
    
    return (
        <>
            {/* <CharRoomData data={chatRooms} /> */}
            {(chatRooms !== null ? <ChatRoomData data={chatRooms} user={user} /> : <h1>Nothing here</h1>)}
        </>
    )
}

export default MessageCard;

function ChatRoomData({data, user}) {
    
    //The id in data is how we can access the messages directly, they are stored within a collection called "messages".
    //const message_system_ref = collection(db, "users", `${user.id}`, "message-system", `${data.id}`, "messages");
    //The actual id of the chat room, will redirect to a new page, with the pathname of the unique ID.
    const [chatRooms, setChatRooms] = useState([]);

    const [, forceRerender] = useReducer(x => x + 1, 0);
    const appendChatRooms = (data, id) => {
        //Equal to the current chat rooms array,
        var temp = chatRooms;
        var addData = {
            message_room_id: id,
            data: data,
        }
        temp.push(addData);
        setChatRooms(temp);
    }
    useEffect(() => {
        const getMessageSystem = async () => {
            data.map((chat) => {
                const message_system_ref = collection(db, "users", `${user.id}`, "message-system", `${chat.id}`, "messages");
                const testMessageData = async () => {
                    const testData = await getDocs(message_system_ref);
                    testData.docs.map((doc) => {
                        
                        appendChatRooms(doc.data(), `${chat.id}`);//passes an object
                    })
                }
                testMessageData();
            });
            // chatData.docs.map((doc) => {
            //     console.log(doc);
            // })
            
        }
        getMessageSystem();
    }, []);
    
    return (
        chatRooms.map((room) => {
            return (
                <h1>test</h1>
            )
        })

        //We need to check if chatRooms is equal to 0.
        //(chatRooms.length !== 0) ? <ChatRoomDisplayData data={chatRooms} />: (<h1>Nothing here</h1>)
    )
}

function ChatRoomDisplayData({ data }) {


}