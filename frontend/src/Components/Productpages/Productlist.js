import React,{useContext} from 'react'
import { Col, Container, Row,Navbar,Nav,Breadcrumb,Badge} from 'react-bootstrap'
import { BsInstagram,BsFacebook,BsTwitter,BsLinkedin,BsTelephone,BsEnvelope,BsPerson,BsSearch ,BsBag,BsArrowRightShort} from "react-icons/bs";
import { Link } from 'react-router-dom';
import { Store } from '../Store';

const Productlist = () => {
    const {state} = useContext(Store)
  return (
    <>


    <Navbar expand="lg">
  <Container>
    <Navbar.Brand href="#">
            <div className="logo">
              <a href="#">Tronix</a>
            </div>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="m-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <div className="menu">
            <Link to = "/">Home</Link>
            <Link to = "/about">About</Link>
            <Link to = "/api/products/all">Product</Link>
            <Link to = "/blog">Blog</Link>
            <Link to = "/contact">Contact</Link>
        </div>
      </Nav>
             
    </Navbar.Collapse>
              <div className="cartoption_two">
                <div className="cart-bag">
                <BsBag></BsBag>
                {state.cart.cartItems.length > 0 &&   <Badge pill>{state.cart.cartItems.length}</Badge>}
                <BsEnvelope></BsEnvelope>
              </div>
              </div>
    </Container>
    </Navbar>
    <Container>
           <Row className='p-list-main'>
                <Col lg = {8} className = "m-auto p-list">
                    <div className="header text-center">
                        <h3>What are you looking for?</h3>
                    </div>
                    <div className="searchnav_two">
                        <div className="search-bar">
                        <input type="text" placeholder='Search here' />
                        <button type='button'><BsSearch></BsSearch></button>
                        </div>
                    </div>
                </Col>
           </Row>
           
    </Container>
    <Container>
      <Row>
        <Col lg = {3}></Col>
        <Col lg = {9}></Col>
      </Row>
    </Container>

    </>
  )
}

export default Productlist