import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'


//We will be testing out a new create post form.
function TestCreatePost() {

    return (
        <Container>
            <Row>
                <Col>
                <label>Brand</label>
                    <input type="text" placeholder='' />
                </Col>
                <Col>
                <label>Name</label>
                    <input type="text" placeholder='' />
                </Col>
                <Col>
                <label>Reference</label>
                    <input type="text" placeholder='' />
                </Col>
            </Row>
            <Row>
                <Col>
                <label>Movment</label>
                    <input type="text" placeholder='' />
                </Col>
            </Row>
        </Container>
    )
}

export default TestCreatePost