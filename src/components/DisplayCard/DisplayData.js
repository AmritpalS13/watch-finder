import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase-config';
import { Carousel, Card, Row, Col, ListGroup, ListGroupItem, Modal, Button, Form} from 'react-bootstrap';
import {ref, listAll, getDownloadURL} from 'firebase/storage';
import { storage } from '../../firebase-config';//importing the storage for images.
import './DisplayCard.css';

import './DisplayData.css';
import ViewPosts from '../ViewPosts/ViewPosts';

function DisplayData({ postId, viewPost, model, name, price, desc, authorEmail, imagesUid, deletePost }) {
    //Might be usefule to associate the exact user with the post, so we can send a message to the user.
    // const [show, setShow] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    //The following will determine if the user is logged in (Null or not Null)
    const [loggedIn, setLoggedIn] = useState(auth.currentUser);
    var log = loggedIn;// true if logged in.
    var del = false;
    //We need to find the associated images from the storage.
    const [imageList, setImageList] = useState([]);
    const imageListRef = ref(storage, `images/${imagesUid}/`);//Getting direct access to the images.

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        })
        if(loggedIn !== null) {
            log = true;
        } 
    }, [])
    if(deletePost !== undefined) {
        del = true;
    } 
    return (
        <div>              
                    <>
                    <Row xs={1} md={2} className="g-4">
                        
                            <Col>
                                <Card  className="display-data-card" style={{ width: '18rem',marginLeft:'3rem'}}>
                                <Carousel>
      {imageList.map((image) => {
        return (
          <Carousel.Item>
            <Card.Img style={{maxHeight:'250px', minHeight:'250px'}}variant="top" src={image} />
            </Carousel.Item>
        )
      })}
      </Carousel>
                                    <Card.Body>
                                    <Card.Title>{model}</Card.Title>
                                    <Card.Title style={{fontStyle:'italic'}}>{name}</Card.Title>
                                    <Card.Text style={{height:'10rem'}}className='display-card-paragraph'>
                                        {desc}
                                    </Card.Text>
                                    </Card.Body>
                                    <ListGroup style={{height:'10rem'}}className="list-group-flush">
                                    <ListGroupItem className="list-card" >$ {price}</ListGroupItem>
                                    <ListGroupItem className="list-card" >{model} {name}</ListGroupItem>
                                    <ListGroupItem className="list-card" >Contact: {authorEmail}</ListGroupItem>
                                    </ListGroup>
                                    <Card.Body>
                                    <button className='listing-btn' onClick={() => viewPost(postId)}>View Listing</button>
                                    {/* <button className="listing-btn" onClick={() => {addLike(postId)}}>Save!</button> */}
                                    {log && (<button className="listing-btn" onClick={() => {<ShowMessageSystem />}}>Message!</button>)}
                                    {del && (<button className="listing-btn" onClick={() => {deletePost(postId, imagesUid)}}>Delete</button>)}
                                    </Card.Body> 
                                </Card>
                            </Col>
                        
                    </Row>
                    </>
                    
        </div>
        
        
    )
}

const ShowMessageSystem = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}
export default DisplayData;