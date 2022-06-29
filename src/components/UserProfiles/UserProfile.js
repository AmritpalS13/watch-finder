import React, {useState, useEffect} from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase-config';
import { Container, Row, Col } from 'react-bootstrap';

import './UserProfile.css';
import Dashboard from './Dashboard';

function UserProfile({ user }) {
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [dashboardData, setDashboardData] = useState([]);

    const userRef = collection(db, "users");
    const dashboardRef = collection(db, 'users', `${user.userId}`, 'dashboard');
    const messageSent = () => {
        //we want to add a document into the message-test collection.
        const addMessageSystem = async () => {
            //This would be how we create a sub collection inside the document, that we can now use.

            const subCol = await addDoc(dashboardRef, {
                comment: message,
                author: currentUser,
            });
        }
        addMessageSystem();
        alert("message uploaded!");
    };
    const findUser = (docData) => {
        if(docData.userId === auth.currentUser.uid) {
            setCurrentUser(docData);   
        }
    }
    const setDashboardComments = (comment) => {
        var temp = dashboardData;
        temp.push(comment);
        setDashboardData(temp);
    }
    useEffect(() => {
        const getUsersData = async () => {
            const userData = await getDocs(userRef);
            //Iterating over all the users.
            userData.docs.map((doc) => {
                findUser(doc.data());
            })
        }
        const getCommentData = async () => {
            const data = await getDocs(collection(db, "users", `${user.userId}`, "dashboard"));
            data.docs.map((doc) => {
                setDashboardComments(doc.data());
            })

        }
        getUsersData();
        getCommentData();
    }, [])
   
    return (
        <Container>
            <Row className='user-profile-container'>
                <Col>
                <img style={{width:'200px', height:'200px'}}src={user.profilePicture} />
                <br />
                <button>Add Friend</button>
                </Col>
                <Col xs={8}>
                <h1>{user.userName}</h1>
                <h6>{user.bio}</h6>
                </Col>
            </Row>
            <input className="dash-input" type="text" placeholder='Write something to the Dashboard.....' onChange={(e) => setMessage(e.target.value)}/>
            <br />
            <button className="input-btn" onClick={() => messageSent()}>Submit</button>
            {
                dashboardData.map((data) => {
                    return (
                        <Dashboard data={data} />
                    )
                })
            }
        </Container>
    );
}


export default UserProfile