import { Grid } from '@mui/material'
import React from 'react'
import { CardGroup, Container, Row, Col } from 'react-bootstrap'
import UserCard from './UserCard'

function Users({ users }) {
    
    return (
        <>
        <Row>
            <Col xs={3}>
            </Col>
        <Col>
        <div style={{display:'flex',flexWrap:'wrap', justifyContent:'center'}}>
            <input type="text" placeholder='search users.....' />
            <CardGroup>
            {
                users.map((user) => {
                    return (
                        
                        <UserCard user={user} />
                     
                    )
                })
            }
        </CardGroup>
        </div>
        </Col>
        </Row>
        </>
    )

}

export default Users