import React, { useState } from 'react'

import { Carousel, Card, Button, CardGroup } from 'react-bootstrap';
import './DisplayCard.css';
import DisplayData from './DisplayData';



function DisplayCard({ model, name, price, desc, authorEmail, imagesUid }) {

    return (
        <div style={{display:'flex',flexWrap:'wrap', justifyContent:'center'}}>
            <CardGroup>
            <DisplayData imagesUid={imagesUid} model={model} name={name} price={price} desc={desc} authorEmail={authorEmail}/>
            </CardGroup>
        </div>
        
    )
}

export default DisplayCard