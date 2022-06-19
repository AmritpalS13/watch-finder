import React, {useState, useEffect } from 'react'
import MyPosts from './MyPosts/MyPosts';
import MyAccountNav from './Navbar/MyAccountNav';
import './Navbar/MyAccountNav.css';

import { db } from '../../firebase-config';
import { ref } from 'firebase/storage';
import { collection, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore';

import SavedPosts from './SavesPosts/SavedPosts';
import Info from './MyInformation/Info';
import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
import { setUserProperties } from 'firebase/analytics';

//WHen user goes on my account show theh user's posts.
function MyAccount({ auth }) {
  //The following will load all the users that exist.
  const [users, setUsers] = useState([]);

  //Finding the user that is logged in, so we can update any of their information.
  const [user, setUser] = useState([]);
  const usersRef = collection(db, "users");

  

  useEffect(() => {
    const getUsersData = async () => {
      const usersData = await getDocs(usersRef);
      setUsers(usersData.docs.map((doc) => ({...doc.data()})))
    }
    getUsersData();
  }, [])
  
  const findUser = () => {
    users.forEach((user) => {
      if(user.userId === auth.currentUser.uid) {
        console.log("Found the one user ", auth.currentUser.uid);
        setUser(user);
       
      }
    })
  }

  
  return (
    <div>
      {users.map((singleUser) => {
        if(singleUser.userId == auth.currentUser.uid) {
          return (
            //Will dump all the users data.
            <MyAccountData user={singleUser} />

          )
        }
      })}

    </div>
  )
}

const MyAccountData = ({ user }) => {

  const [nameReq, setNameReq] = useState(false);

  const [updateName, setUpdateName] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  //user wants to update their profile picture.
  const [image, setImageUpload] = useState(null);
  


  const userRef = doc(db, "users", user.userId);
  
  const updateUserName = async() => {
    await updateDoc(userRef, {
      userName: newUserName
    })
    setUpdateName(false);
  }
  const displayChangeUserName = () => {
    return (
      <div>
        <input type="text" placeholder='change name' onChange={(event) => setNewUserName(event.target.value)}/>
        <button onClick={() => updateUserName()}>Submit</button>
      </div>
    );
  }
  const changeName = () => {
    updateUserName();
    setNameReq(false);
    console.log("Name updated");
  }
  useEffect(() => {
    if(user.userName.length <= 2) {
      setNameReq(true);
    }

  }, []);
  
  return (
    <Container>
      <Row>
        <Col>
          <div>
          <h6>Profile picture</h6>
          <img style={{border:'2px solid', borderRadius:'50px', width:'217px', height:'210px'}} src={user.profilePicture} />
          </div>
          <Row>
            <button>Change Picture!</button>
            <input type='file' name="image" onChange={(event) => setImageUpload(event.target.files[0]) } />
          </Row>
        </Col>
        <Col>
          <h6>username : {user.userName}</h6>
          <button onClick={() => setNameReq(true)}>Update username</button>
          {/* {updateName && (displayChangeUserName())} */}
          {/* <input type="text" placeholder='new name.....' onChange={(event) => setNewUserName(event.target.value)} />
          <button onClick={() => updateUserName()}>Submit</button> */}
          {nameReq && (<InputUserNameForm show={true} changeName={changeName} setNewUserName={setNewUserName}/>)}
        </Col>
      </Row>
    </Container>
  )
}

const InputUserNameForm = ({ changeName, setNewUserName }) => {
  const [show, setShow] = useState(true);
  const [username, setUsername] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
      Change Username
    </Button>

    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Username</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please enter a valid username, longer than 2 character to continue. A
        username is a requirment to contiue
        <input type="text" placeholder='Enter new Username....' onChange={(event) => setNewUserName(event.target.value)}></input>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => changeName(username)}>submit</Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}
export default MyAccount