import React from 'react'
import { Button, Col, Row, Container, Card } from 'react-bootstrap';
import './Header.css';
import logo from './WFT_logo.PNG';
import bg from './watchbackground.PNG';
function Header() {

  const forceDirect = () => {
    window.location.pathname='/login';
  }
  return (
    //   <div>
    // <Container fluid className="hero">
    //     {/* <h1>Watch Finder Toronto</h1>
    //     <h6>Buy and sell used watches</h6> */}
    //     <img src={logo} />
    //     <div className='btn-field'>
    //         <button className='btn-view' onClick={() => window.location.pathname="viewposts"}>View</button>
    //         <button className='btn-create-post' onClick={() => {window.location.pathname="createpost"}}>Create Posting</button>            
    //     </div>
    //     <h1></h1>
    // </Container>
    // <Container fluid className="about">
    // </Container>
    // </div>
    <Container fluid>
      <Row className="main-bg">
        <Col style={{padding:'300px'}}>
          <div className='main-intro' style={{}}>
            <p style={{fontSize:'48px'}}>Buying and selling used watches,</p>
            <p style={{fontSize:'48px'}}>We make it fast and easy.</p>
            <button className='join-btn' onClick={() => window.location.pathname="createaccount"}>Join Now!</button>
          </div>
        </Col>
      </Row>
      <Container style={{marginTop:'50px'}}>
        <h1 className='about-header'>About us and how it works</h1>
        <Row className="layout-card">
          <Col>
            <Card className="header-card"style={{width: '18rem'}}>
              <Card.Body>
                <Card.Title>View postings!</Card.Title>
                <hr style={{border:'2px solid white'}} />
                <Card.Text>
                  View all the posts for used watches.
                  See what you can find, and grab it below retail.
                  Send the poster a message or reach out them by email,
                  and also there's no selling or buying tax!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          <Card className="header-card"style={{width: '18rem'}}>
              <Card.Body>
                <Card.Title>Create a Posting!</Card.Title>
                <hr style={{border:'2px solid white'}} />
                <Card.Text>
                  Do you have watches that are no longer in your rotation?
                  Have you been eyeing something new? Well here's your solution!
                  List your watch and see who else can enjoy it, and get that much 
                  closer to something you want.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          <Card className="header-card"style={{width: '18rem'}}>
              <Card.Body>
                <Card.Title>View postings!</Card.Title>
                <hr style={{border:'2px solid white'}} />
                <Card.Text>
                  View all the posts for used watches.
                  See what you can find, and grab it below retail.
                  Send the poster a message or reach out them by email,
                  and also there's no selling or buying tax!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Header