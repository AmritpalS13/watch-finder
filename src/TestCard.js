import React from 'react'
import { CardGroup, Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import './TestCard.css';

function TestCard() {
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
    return (
      <Card className="card-style" style={{ width: '18rem', marginLeft:'3rem'}}>
      <Card.Img style={{maxHeight:'250px'}}variant="top" src={images[0]} />
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