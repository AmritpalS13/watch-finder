import React, {useState, useEffect } from 'react'
import MyPosts from './MyPosts/MyPosts';
import MyAccountNav from './Navbar/MyAccountNav';
import './Navbar/MyAccountNav.css';

import { db, storage, auth } from '../../firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore';

import SavedPosts from './SavesPosts/SavedPosts';
import Info from './MyInformation/Info';
import { Container, Modal, Button, Row, Col } from 'react-bootstrap';
import { setUserProperties } from 'firebase/analytics';


import './MyAccount.css';
import { v4 } from 'uuid';
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
    <Container fluid style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
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
    </Container>
  )
}

const MyAccountData = ({ user }) => {
  
  const [nameReq, setNameReq] = useState(false);

  const [updateName, setUpdateName] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  //user wants to update their profile picture.
  const [image, setImageUpload] = useState(null);
  const [imageProfile, setImageProfile] = useState(null);


  const userRef = doc(db, "users", user.userId);
  
  const uploadImage = () => {
    if(image === null) {
      alert("No image found");
      return;
    }
    const imageRef = ref(storage, `profile_pictures/${user.userId}/${image.name + v4()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        //setImageProfile(url);
        const setNewPicture = async() => {
          await updateDoc(userRef, {
            profilePicture: url,
          })
          console.log("Picture set metadata: ", url);
        }
        setNewPicture();
      })
    });
    
  }

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
    //To change picture, we need to upload the file, and then retrieve the DOWNLOAD URL, and then set it in the user's collection DB.
    <Container>
      <div className='profile-container'>
      <h1  className='profile-picture-header' >{user.userName}</h1>
      <img  className="profile-image"  src={user.profilePicture} />
        <br />
        <button className="change-picture" onClick={() => uploadImage()}>Change Picture!</button>
        <input className="profile-picture-input" type='file' name="image" onChange={(event) => setImageUpload(event.target.files[0]) } />
      < br/>
      <button className="change-picture" style={{marginTop:'20px'}}onClick={() => setNameReq(true)}>Update username</button>

      {nameReq && (<InputUserNameForm show={true} changeName={changeName} setNewUserName={setNewUserName} setNameReq={setNameReq}/>)}
      </div>
    </Container>
  )
}

//The code below is strictly for changing the username and is functioning.
const InputUserNameForm = ({ changeName, setNewUserName, setNameReq }) => {
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
      className="username-modal"
      show={show}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Username</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please enter a valid username, longer than 2 characters to continue. A
        username is a requirment to contiue
        <input className="username-input" type="text" placeholder='Enter new Username....' onChange={(event) => setNewUserName(event.target.value)}></input>
      </Modal.Body>
      <Modal.Footer>
      <button className='change-username-btn' onClick={() => setNameReq(false)}>CLOSE</button>
        <button className='change-username-btn' onClick={() => changeName(username)}>SUBMIT</button>
      </Modal.Footer>
    </Modal>
  </>
  )
}
export default MyAccount