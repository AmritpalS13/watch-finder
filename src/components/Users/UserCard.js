import React, { useState } from 'react'



import {Row, Col, Card} from 'react-bootstrap';

import './UserCard.css';

function UserCard({ user }) {
    
    return (

        <>
            <Row xs={1} md={3} className="g-4">
                <Col xs={8}>
                <Card className='user-card-container' style={{ width: '18rem',}}>
                <Col xs={4}>
                <img  className="user-image" src={user.profilePicture} />
                </Col>
                    <Card.Body>
                        <Card.Title>{user.userName}</Card.Title>
                        
                        <Card.Text className='user-bio'>
                            {user.bio}
                        </Card.Text>
                        <button className="user-view-btn"onClick={() => window.location.pathname=user.userId}>View Profile</button>
                    </Card.Body>
                    </Card>
                </Col>

            </Row>
        </>

    )
}

export default UserCard