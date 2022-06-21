import React, { useState } from 'react'

import { Container, Carousel, Card, Button, CardGroup } from 'react-bootstrap';
import './DisplayCard.css';
import DisplayData from './DisplayData';



function DisplayCard({ post, viewPost, postId, model, name, price, desc, authorEmail, imagesUid, deletePost}) {

    return (
        // <div style={{display:'flex',flexWrap:'wrap', justifyContent:'center'}}>
        //     <CardGroup>
        //     <DisplayData post={post} postId={postId} viewPost={viewPost} imagesUid={imagesUid} model={model} name={name} price={price} desc={desc} authorEmail={authorEmail} deletePost={deletePost}/>
        //     </CardGroup>
        // </div>
        <Container>
            <DisplayData post={post} postId={postId} viewPost={viewPost} imagesUid={imagesUid} model={model} name={name} price={price} desc={desc} authorEmail={authorEmail} deletePost={deletePost}/>
        </Container>
        
    )
}

export default DisplayCard