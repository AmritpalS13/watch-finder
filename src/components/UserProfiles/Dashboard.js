import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap';

import './UserProfile.css';
function Dashboard({ data }) {
  return (
    <>
        <Row className='poster-dash'>
            <Col xs={3}>
                <img className="poster-image"src={data.author.profilePicture} />
                <button className="goto-btn" onClick={() => window.location.pathname = data.author.userId}>View Account</button>
            </Col>
            <Col>
            <h6 className='dash-comment-poster'>{data.author.userName}</h6>
            <hr />
            <p className='dash-comment'>{data.comment}</p>
            </Col>
        </Row>
    </>
  )
}

export default Dashboard