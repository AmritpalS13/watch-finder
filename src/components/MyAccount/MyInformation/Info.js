

import React, { useState, useEffect } from 'react'
import { db, auth } from '../../../firebase-config';
//mainly used for mobile op
import { Container, Accordion } from 'react-bootstrap';

import avatar from './stock_avatar.jpg'
import Edit from './EditInfo/Edit';
//Every user has unique information, user can set nickname and other information here.

function Info({ auth }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Execute the if-block if there is no photoURL.


    return (
        <Container>
            <h6>Account information!</h6>
            <button>Edit info</button>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Edit Profile Details</Accordion.Header>
                    <Accordion.Body>
                        <Edit auth={auth} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}

export default Info