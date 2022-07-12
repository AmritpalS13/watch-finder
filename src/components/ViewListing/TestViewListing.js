import React, {useState, useEffect} from 'react'
import { storage } from '../../firebase-config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

function TestViewListing({ post }) {
    
    const [imageList, setImageList] = useState([]);
    const [user, setUser] = useState(null);

    
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
            {/**First section, which will contain the image on the left, 
             * and the post data on the right */}
            <Row>
                <Col>
                    <Carousel fage>
                        {
                            imageList.map((image) => {
                                return (
                                    <Carousel.Item>
                                    <img style={{width:'28rem', height:'30rem'}} src={image} />
                                    </Carousel.Item>
                                )
                            })
                        }
                    </Carousel>
                </Col>
                <Col>
                        <Container>
                            <div>
                                <div>
                                    <img style={{width:'50px', height:'50px'}}src={post.userData.profilePicture} />
                                    <p>{post.userData.userName}</p>
                                </div>
                                <div>
                                    <h6>{post.model} {post.name}</h6>
                                    <h6>$ {post.price}</h6>
                                    <p>{post.desc}</p>
                                </div>
                                <div>
                                <Container>

                                </Container>
                                </div>
                            </div>
                        </Container>
                </Col>
            </Row>

            {/**
             * Next section will be just a table of all the details if the user has entered them.
             * 
             */}
            <Row>

            </Row>
        </Container>
    );
}

export default TestViewListing