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
    <Container >
      <div className='main-video-wrapper'>
        <video className="video-header"autoPlay muted loop>
          <source src={require("./test_bg.mp4")} type="video/mp4" />
        </video>
        <div className='header'>
          <Row>
            <Col><h1 className='header-title'>Watch Finder Toronto</h1></Col>
            <Col>
              <h4  className="header-info">We make buying and selling used watches fast and easy</h4> 
              <button className='header-btn' onClick={() => window.location.pathname="/createaccount"}>Create Account</button>
            </Col>
          </Row>
        </div>
      </div>
      <Row className="main-bg">
        <Col className="main-bg-intro-text-container">
          {/* <div className='main-intro'>
            <p className="main-intro-text">Buying and selling used watches,</p>
            <p className='main-intro-text'>We make it fast and easy.</p>
            <button className='join-btn' onClick={() => window.location.pathname="createaccount"}>Join Now!</button>
          </div> */}
        </Col>
      </Row>
      

      <Container >
        <div className='video-wrapper'>
        <video className="video-about" autoPlay muted loop>
          <source src={require("./about_us_bg.mp4")} type="video/mp4" />
        </video>
        </div>

        <h1 className='about-header'>About us and how it works</h1>
        <Row className="layout-card">
          <Col>
            <Card className="header-card"style={{width: '23rem'}}>
              <Card.Body>
                <Card.Title><h6 className='about-header'>View postings!</h6></Card.Title>
                <hr style={{border:'2px solid white'}} />
                <Card.Text>
                  <p className='about-para'>
                  View all the posts for used watches.
                  See what you can find, and grab it below retail.
                  Send the poster a message or reach out them by email,
                  and also there's no selling or buying tax!
                  </p>
                </Card.Text>
                <button className='header-btn' onClick={() => window.location.pathname="viewposts"}>Postings!</button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          <Card className="header-card"style={{width: '23rem'}}>
              <Card.Body>
                <Card.Title><h6 className='about-header'>Create a Posting!</h6></Card.Title>
                <hr style={{border:'2px solid white'}} />
                <Card.Text>
                  <p className='about-para'>
                  Do you have watches that are no longer in your rotation?
                  Have you been eyeing something new? Well here's your solution!
                  List your watch and see who else can enjoy it, and get that much 
                  closer to something you want.
                  </p>
                </Card.Text>
                <button className='header-btn' onClick={() => window.location.pathname="createaccount"}>Create Account!</button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          <Card className="header-card"style={{width: '23rem'}}>
              <Card.Body>
                <Card.Title><h6 className='about-header'>About the Site</h6></Card.Title>
                <hr style={{border:'2px solid white'}} />
                <Card.Text>
                <p className='about-para'>
                  The point of this site is to be able to sell and buy watches really fast!
                  By making account creation and posting fast this allows for exactly that.
                  Also I am constantly adding new things to this site and I have a lot of things that are a work in progress
                  </p>
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