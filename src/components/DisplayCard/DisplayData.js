import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase-config';
import { Carousel, Card, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import {ref, listAll, getDownloadURL} from 'firebase/storage';
import { storage } from '../../firebase-config';//importing the storage for images.
import './DisplayCard.css';

import './DisplayData.css';

function DisplayData({ postId, addLike, model, name, price, desc, authorEmail, imagesUid, deletePost }) {
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
                                <Card style={{ width: '18rem', marginLeft:'3rem'}}>
                                <Carousel>
      {imageList.map((image) => {
        return (
          <Carousel.Item>
            <Card.Img style={{maxHeight:'250px'}}variant="top" src={image} />
            </Carousel.Item>
        )
      })}
      </Carousel>
                                    <Card.Body>
                                    <Card.Title>{model}</Card.Title>
                                    <Card.Title style={{fontStyle:'italic'}}>{name}</Card.Title>
                                    <Card.Text className='display-card-paragraph'>
                                        {desc}
                                    </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                    <ListGroupItem className="list-card" >$ {price}</ListGroupItem>
                                    <ListGroupItem className="list-card" >{model} {name}</ListGroupItem>
                                    <ListGroupItem className="list-card" >Contact: {authorEmail}</ListGroupItem>
                                    </ListGroup>
                                    <Card.Body>
                                    <button className='listing-btn'>View Listing</button>
                                    {/* <button className="listing-btn" onClick={() => {addLike(postId)}}>Save!</button> */}
                                    {log && (<button className="listing-btn" onClick={() => {addLike(postId)}}>Save!</button>)}
                                    {del && (<button className="listing-btn" onClick={() => {deletePost(postId)}}>Delete</button>)}
                                    </Card.Body> 
                                </Card>
                            </Col>
                        
                    </Row>
                    </>
                
           
        </div>
        
    )
}

export default DisplayData;