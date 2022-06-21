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
function Messages() {
    const [messages, setMessages] = useState(null);
    const [message, setMessage] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const postRef = collection(db, "posts");
    const messageRef = collection(db, "messaging-system");
    const userRef = collection(db, "users");
    useEffect(() => {
        const getMessageData = async () => {
            const messageData = await getDocs(messageRef);
            setMessages(messageData.docs.map((doc) => ({...doc.data(), id:doc.id})));
        }
        const getUserData = async () => {
            const userData = await getDocs(userRef);
            setUsers(userData.docs.map((doc) => ({...doc.data(), id:doc.id})));
        }
        const getPostData = async() => {
            const postData = await getDocs(postRef);
            setPosts(postData.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
        getUserData();
        getMessageData();
        getPostData();
        findUser();
       
    }, []);
    const findUser = () => {
        users.map((user) => {
            if(user.userId === auth.currentUser.uid) {
                setUser(user);
                return;
            }
        }) 
        return;
    }


    return (
        <div>
            <Container>
            {/* <DisplayMessages messages={messages} user={user} /> */}
            <h1 className="My-Messages">My Messages</h1>
            {users.map((singleUser) => {
                if(singleUser.userId === auth.currentUser.uid) {
                    return (
                        <DisplayMessages user={singleUser} messages={messages} users={users} posts={posts}/>
                    )
                }
            })}
            </Container>
        </div>
    )
}
export default Messages;

const DisplayMessages = ({user, messages, users, posts}) => {
    const [sent, setSent] = useState(null);//This will be for the person who sent the messages.
    const [message, setMessage] = useState([]);
    
    var notNull = false;
    if(user !== null) {
        notNull = true;
    } 
    useEffect(() => {
        var tempArray = [];
        user.messages.map((userMessageID) => {
            messages.map((message) => {
                if(userMessageID === message.messageID) {
                    // console.log("FOund : ", userMessageID);
                    // console.log("Message : ", message.messages);
                    //We know the sender's ID, now let's add their data.
                    
                    var tempUser;
                    var tempPost;//This would be the post.
                    users.map((user) => {
                        if(user.userId === message.sender) {
                            tempUser = user;
                        }
                    })
                    
                    posts.map((post) => {
                        if(post.id === message.postId) {
                            tempPost = post;
                        }
                    })
                    tempArray.push({
                        messages: message.messages,
                        post: tempPost,
                        sender: tempUser,
                    })
                    tempArray.push(message.messages);
                    
                    setMessage(tempArray);
                }
            })
        });

    }, [])
    
    return (
        <div>
            {
                message.map((mes) => {
                    return (
                        <DisplayMessage mes={mes} />
                       
                    )
                })
            }
        </div>
    )

}

const DisplayMessage = ({ mes }) => {
   
    return (
        <div>
            {mes.sender !== undefined && <Display mes={mes} />}
        </div>
    )
}

const Display = ({mes}) => {
    //All the data is clean and ready to be displayed.
    console.log(mes);
    return (
        <Container>
            <Card className="message-container" style={{marginTop:'20px'}}>
            <Card.Header style={{fontSize:'24px'}}>From {mes.sender.userName}</Card.Header>
     
            <Card.Body>
            <blockquote className="blockquote mb-0">
            <p>
                {mes.messages}
            </p>

            </blockquote>
            </Card.Body>
            </Card>
        </Container>
    )
}