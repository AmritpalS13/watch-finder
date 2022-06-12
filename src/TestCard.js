import React, { useEffect, useState } from 'react'
import { CardGroup, Card, ListGroup, ListGroupItem, Row, Col, Carousel, Alert } from 'react-bootstrap';
import {ref, listAll, getDownloadURL} from 'firebase/storage';
import { storage, auth, db } from './firebase-config';
import './TestCard.css';

import { collection, getDocs } from 'firebase/firestore';

function TestCard() {
    const [view, setView] = useState(false);
    const [imageList, setImageList] = useState([]);
    const images = [
        "https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review.jpg",
        "https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review-5-2048x1365.jpg.webp",
        "https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review-4-2048x1072.jpg.webp",
        "https://cdn2.chrono24.com/images/uhren/16472844-g7l00o27da217n7a6hy4wdt8-Large.jpg",
    ];
    const model = "Orient";
    const name ="Mako 2";
    const price = "400";
    const authorEmail = "Amritpal@gmail.com";

    //The the 07bd538a-9bf2-4ad3-ac1f-454c2031d592, is used as the identifier for the image folder.
    //It is also unique for every post, and it contains the associated images.
    const imagesListRef = ref(storage, "images/07bd538a-9bf2-4ad3-ac1f-454c2031d592/");// refernce to the folder.
    useEffect(() => {
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url]);
            
          })
        })
      })
    }, [])


    //Testing posts collections.
    const postCollectionRef = collection(db, "posts");
    const getPostData = async () => {
      const data = await getDocs(postCollectionRef);
      data.docs.map( (doc) => {
        if(doc.author.id === auth.currentUser.uid) {
          console.log("hit");
        }
      })
    }
    getPostData();
    return (
      <Card className="card-style" style={{ width: '18rem', marginLeft:'3rem'}}>
      {/* <Card.Img style={{maxHeight:'250px'}}variant="top" src={imageList[0]} /> */}
      <Carousel>
      {imageList.map((image) => {
        return (
          <Carousel.Item>
            <Card.Img className="card-image" style={{maxHeight:'250px'}}variant="top" src={image} />
            </Carousel.Item>
        )
      })}
      </Carousel>
      <Card.Body>
      <Card.Title>{model}</Card.Title>
      <Card.Title style={{fontStyle:'italic'}}>{name}</Card.Title>
      <Card.Text className='card-description'>
      Hello I am selling my Seiko Presage cocktail time, it's brand new and in good
      condition, please feel free to contact me for more information
      Hello I am selling my Seiko Presage cocktail time, it's brand new and in good
      </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
      <ListGroupItem className="list-card">$ {price}</ListGroupItem>
      <ListGroupItem className="list-card">{model} {name}</ListGroupItem>
      <ListGroupItem className="list-card">Contact: {authorEmail}</ListGroupItem>
      </ListGroup>
      <Card.Body>
      <button>View Listing</button>
      </Card.Body> 
      </Card>
    )
}

export default TestCard