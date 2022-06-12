import React from 'react'

import { Carousel, Card, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import './DisplayCard.css';

import './DisplayData.css';

function DisplayData({ model, name, price, desc, authorEmail }) {
    const images = [
        "https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review.jpg",
        "https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review-5-2048x1365.jpg.webp",
        "https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review-4-2048x1072.jpg.webp",
        "https://cdn2.chrono24.com/images/uhren/16472844-g7l00o27da217n7a6hy4wdt8-Large.jpg",
        "https://i.ytimg.com/vi/NRxujy6WpNE/maxresdefault.jpg"
    ];
    return (
        <div>              
                    <>
                    <Row xs={1} md={2} className="g-4">
                        
                            <Col>
                                <Card style={{ width: '18rem', marginLeft:'3rem'}}>
                                    <Card.Img style={{maxHeight:'250px'}}variant="top" src={images[0]} />
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
                                    </Card.Body> 
                                </Card>
                            </Col>
                        
                    </Row>
                    </>
                
           
        </div>
        
    )
}

export default DisplayData;