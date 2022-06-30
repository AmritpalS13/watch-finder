
import React, { useState, useEffect } from 'react'
import {ref, listAll, getDownloadURL} from 'firebase/storage';
import { storage } from '../../firebase-config';
import { Carousel } from 'react-bootstrap';

function TestDisplayCard({user, post}) {

    console.log(post);
    const [imageList, setImageList] = useState([]);
    const imageListRef = ref(storage, `images/${post.imagesUid}/`);

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        } )
    }, []);
    
    return (
        <>
            {
                imageList.map((image) => {
                    return (
                       <>
                            <Carousel>
                            <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={image}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                            </Carousel.Item>
                            </Carousel>
                       </>
                        
                    )
                })
            }
        </>
    );

}

export default TestDisplayCard