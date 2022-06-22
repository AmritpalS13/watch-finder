import React, { useState, useEffect } from 'react'
import { auth, db  } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Card } from 'react-bootstrap';



import './TestForum.css';

function TestForum() {

    const colRef = collection(db, "test");
    


    //Here's how we can design the Chat system.
    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(colRef);
            data.docs.map((doc) => {
              
            const testRef = collection(db, 'test', `${doc.id}`, 'messages');
            const testSubCol = async () => {
                const testData = await getDocs(testRef);
                testData.docs.map((doc) => {
                    console.log(doc.data());
                })
            }
            testSubCol();
          
            })
        }
        getData();
    }, []);

    return (
        <Container>
            <TestPost />
            <TestPost />
        </Container>
    );
}

const TestPost = () => {
    return (
        <Card  className="card-container" style={{marginTop:'20px', padding:'20px'}}>
        <Row>
            <Col md="auto">
            <img style={{height:'260px', width:'320px'}}src="https://twobrokewatchsnobs.com/wp-content/uploads/2020/05/Orient-Kamasu-Review.jpg" />
            </Col>
            <Col>
        <Card.Header style={{fontSize:'24px'}}>Orient Mako 2</Card.Header>
        <Card.Body>
        <blockquote className="blockquote mb-0">
        <p>
        {' '}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
        erat a ante.{' '}
        </p>
        <footer className="blockquote-footer">
        Someone famous in <cite title="Source Title">Source Title</cite>
        </footer>
        </blockquote>
        </Card.Body>
        </Col>
        </Row>
        </Card>
    )
}
export default TestForum