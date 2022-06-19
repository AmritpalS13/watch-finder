import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import { auth } from '../../../../firebase-config';

function Edit({  }) {
   
    return (
        <>
            <Row>
                <Col>
                <label>Username: </label>
                <input type="text" placeholder='value' />
                <Col>
                <label>Name: </label>
                <input type="text" placeholder='value' />
                </Col>

                <Col>
                <label>bio</label>
                <textarea type="text" />
                </Col>
                <button 
                
                >save changes</button>
                
                </Col>
                
            </Row>
        </>
    )
}

export default Edit