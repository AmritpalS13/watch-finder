import React, { useState, useEffect } from 'react'
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase-config';
import { Container, Row, Col, Carousel, Card} from 'react-bootstrap';

import { Grid, Item } from '@mui/material';
import './ViewListing.css';
//When the user clicked the listing, an ID will be provided, which we can pass into the class.
function ViewListing({post}) {
    const [imageList, setImageList] = useState([]);
    const imageRef = ref(storage, `images/${post.imagesUid}/`);
    useEffect(() => {
        listAll(imageRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        })
    }, []);
    
    return (
        <Container>
            <Row>
            <Col>
                <Carousel fade>
                {
                    imageList.map((image) => {
                    return (
                        <Carousel.Item >
                            <img src={image} style={{width:'40rem', height:'33rem', borderRadius:"50px"}}/>
                        </Carousel.Item>
                        )
                    })
                }
                </Carousel>
            </Col>
            <Col>
            <Container>
                    <Card className="text-center text-body">
                    <Card.Header className="title" style={{color:'white'}}>{post.model} {post.name} {post.watchRef}</Card.Header>
                    <Card.Body>
                    <Card.Title className="price" style={{color:'white'}}>$ {post.price}</Card.Title>
                    <Card.Text className="desc"style={{color:'white'}}>
                        {post.desc}
                    </Card.Text>
                    <button>Just button</button>
                    </Card.Body>
                   
                    </Card>
                
            </Container>      
            </Col>
            </Row>
        </Container>
    )
}

export default ViewListing