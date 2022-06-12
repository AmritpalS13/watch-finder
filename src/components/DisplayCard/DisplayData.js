import React, { useEffect, useState } from 'react'

import { Carousel, Card, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import {ref, listAll, getDownloadURL} from 'firebase/storage';
import { storage } from '../../firebase-config';//importing the storage for images.
import './DisplayCard.css';

import './DisplayData.css';

function DisplayData({ model, name, price, desc, authorEmail, imagesUid }) {
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
    }, [])
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
                                    <button className="listing-btn">Save!</button>
                                    </Card.Body> 
                                </Card>
                            </Col>
                        
                    </Row>
                    </>
                
           
        </div>
        
    )
}

export default DisplayData;