import React,{useContext} from 'react'
import { Container,Row,Col,Navbar ,Nav,Breadcrumb,Badge} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BsInstagram,BsFacebook,BsTwitter,BsLinkedin,BsTelephone,BsEnvelope,BsPerson,BsSearch ,BsBag,BsArrowRightShort,BsFillHeartFill} from "react-icons/bs";
import { Store } from '../Store';


const Serchpage = () => {
    const {state,state2, dispatch:cartContext,dispatch2} = useContext(Store) 
    const {cart:{cartItems}} = state


  return (
    <>
        <Container>
               <div className="main-bar">
                    <Row>
                        <Col lg = {6}>
                            <div className="left-bar">
                                    <a href="#"><BsInstagram></BsInstagram></a>
                                    <a href="#"><BsFacebook></BsFacebook></a>
                                    <a href="#"><BsTwitter></BsTwitter></a>
                                    <a href="#"><BsLinkedin></BsLinkedin></a>
                            </div>
                        </Col>
                        <Col lg = {6}>
                                <div className="right-bar text-end">
                                    <a href="#"><BsTelephone></BsTelephone> <span>+12 345 6789 0</span></a>
                                    <a href="#"><BsEnvelope></BsEnvelope> <span>support@tronix.com</span></a>
                                    <Link to = "/signin"><BsPerson></BsPerson> <span>account</span></Link>
                                </div>
                        </Col>
                    </Row>
               </div>
        </Container>


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
        className="ms-5 my-2 my-lg-0"
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
             <div className="searchnav_two">
                <div className="search-bar">
                  <input type="text" placeholder='Search here' />
                  <button type='button'><BsSearch></BsSearch></button>
                </div>
             </div>
    </Navbar.Collapse>
              <div className="cartoption_two">
                <div className="cart-bag">
                <Link to = "/cartpage"><BsBag></BsBag></Link>
                {state.cart.cartItems.length > 0 &&   <Badge pill>{state.cart.cartItems.length}</Badge>}
                <BsEnvelope></BsEnvelope>
              </div>
              </div>
    </Container>
    </Navbar>


   <Container>
        <Breadcrumb className='breadcumb mt-3'>
                <h6>
                  <Link to = "/">Home</Link>
                  <BsArrowRightShort></BsArrowRightShort>
                  <span>Search Results</span>
                </h6>
        </Breadcrumb>
   </Container>


   <section className='search-result'>
    
   </section>
    </>
  )
}

export default Serchpage