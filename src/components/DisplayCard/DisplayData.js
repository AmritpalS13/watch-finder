import React from 'react'

import { Carousel, Card, Button } from 'react-bootstrap';
import './DisplayCard.css';

import './DisplayData.css';

function DisplayData({ model, name, price }) {
    const images = [
        "https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review.jpg",
        "https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review-5-2048x1365.jpg.webp",
        "https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review-4-2048x1072.jpg.webp",
        "https://cdn2.chrono24.com/images/uhren/16472844-g7l00o27da217n7a6hy4wdt8-Large.jpg",
        "https://i.ytimg.com/vi/NRxujy6WpNE/maxresdefault.jpg"
    ];
    return (
        <div>
        <Card className="display-card" style={{ width: '30rem',border:'5px solid #790b0c', margin:'3rem', borderRadius:'10px'}}>
            <Card.Body>
                <Card.Title>{model}</Card.Title>
                <p>{name}</p>
                <p>{price}</p>
                <Carousel fade>
                    {images.map( (image) => {
                    return (
                    <Carousel.Item>
                    <img style={{maxWidth:'500px', maxHeight:'500px', minWidth:'360px', minHeight:'360px'}} src={image} alt="watch" />
                    </Carousel.Item>
                    )
                    })}                 
                </Carousel>
                <div className="display-card-paragraph">
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                </div>
                <button className='listing-btn'>View Listing</button>
            </Card.Body>
        </Card>
        </div>
        
    )
}

export default DisplayData;