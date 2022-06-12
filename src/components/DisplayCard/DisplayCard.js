import React, { useState } from 'react'

import { Carousel, Card, Button, CardGroup } from 'react-bootstrap';
import './DisplayCard.css';
import DisplayData from './DisplayData';



function DisplayCard({ model, name, price, desc, authorEmail }) {
    const images = [
        "https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review.jpg",
        "https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review-5-2048x1365.jpg.webp",
        "https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review-4-2048x1072.jpg.webp",
        "https://cdn2.chrono24.com/images/uhren/16472844-g7l00o27da217n7a6hy4wdt8-Large.jpg",
    ];
    return (
        <div style={{display:'flex',flexWrap:'wrap', justifyContent:'center'}}>
            <CardGroup>
            <DisplayData model={model} name={name} price={price} desc={desc} authorEmail={authorEmail}/>
            </CardGroup>
        </div>
        
    )
}

export default DisplayCard