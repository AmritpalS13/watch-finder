import React from 'react'

import { Dropdown } from 'react-bootstrap';

import './MyAccountTest.css';
function MyAccountTest() {
    return (
    <Dropdown style={{marginRight:'2rem'}}>
  <Dropdown.Toggle className="dropdown" id="dropdown-basic">
    My Account
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item className="dropdown-item" as="button" onClick={() => window.location.pathname="myposts"}>My Posts
        {/* <button onClick={() => window.location.pathname="/myaccount"}>My Posts</button> */}
    </Dropdown.Item>
    <Dropdown.Item as="button" onClick={() => window.location.pathname="messages"}>
        Messages
    </Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item as="button" onClick={() => window.location.pathname="/accountinformation"}>
        Account Information
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
    )
}

export default MyAccountTest