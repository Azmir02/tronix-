import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row,Navbar,Nav,Breadcrumb,Badge} from 'react-bootstrap'
import { BsInstagram,BsFacebook,BsTwitter,BsLinkedin,BsTelephone,BsEnvelope,BsPerson,BsSearch ,BsBag,BsArrowRightShort} from "react-icons/bs";
import { Link } from 'react-router-dom'
import { Store } from './Store';
import Footer from './layouts/Footer'
import axios from 'axios';
import quality from '../Quality.png'
import deliver from '../Delivery.png'
import quality2 from '../Quality2.png'
import cod from '../CashOnDelivery.png'

const About = () => {
    const {state} = useContext(Store)

    const [aboutbanner,setAboutbanner] = useState([])
    const [team,setTeam] = useState([])


    useEffect(()=>{
        let aboutbanner = async ()=>{
            let aboutbannerInfo = await axios.get("/api/aboutbanner")
            setAboutbanner(aboutbannerInfo.data)

            //for team
            let teamInfo = await axios.get("/api/teams")
            setTeam(teamInfo.data)
        }
        aboutbanner()
    },[])
  return (
    <>
        <section className='about-part'>
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
                  <span>About</span>
                </h6>
            </Breadcrumb>
   </Container>
    <Container>
        <Row>
            <Col lg = {8} className = "m-auto">
                <div className="about-header text-center py-5">
                    <h1>About Tronix</h1>
                    <p>We are here to provide a place special for electronic devices. Although we only operated for 2 years but we always provide the best service for customers and all the sellers who use our website. With the hope that it can help improve a better life using various electronic goods with the latest technology, we are all ears to any suggestion from our dear customers</p>
                </div>
            </Col>
        </Row>
        <Row>
            <Col lg = {12}>
                <div className="about-banner">
                        {
                            aboutbanner.map((item)=>(
                                <img src={item.image} alt="about-banner" className='w-100 img-fluid' />
                            ))
                        }
                </div>
            </Col>
        </Row>
        <Row>
            <Col lg = {12}>
                <div className="chossing text-center">
                    <h2>Why Choose Us</h2>
                </div>
                <div className="choosing-body">
                    <Row>
                        <Col lg = {3}>
                            <div className="choosing-item text-center">
                                <div className="choosing-image">
                                    <img src={quality} alt="quality1" />
                                </div>
                                <div className="choosing-topic">
                                    <h4>54 Brands</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg = {3}>
                            <div className="choosing-item text-center">
                                <div className="choosing-image">
                                    <img src={deliver} alt="deliver" />
                                </div>
                                <div className="choosing-topic">
                                    <h4>Fast Delivery</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg = {3}>
                            <div className="choosing-item text-center">
                                <div className="choosing-image">
                                    <img src={cod} alt="cod" />
                                </div>
                                <div className="choosing-topic">
                                    <h4>COD Service</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg = {3}>
                            <div className="choosing-item text-center">
                                <div className="choosing-image">
                                    <img src={quality2} alt="quality2" />
                                </div>
                                <div className="choosing-topic">
                                    <h4>100% Original Products</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        <Row>
           <Col lg = {5} className = "m-auto">
            <div className="chossing team text-center">
               <h2>Our Team</h2>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. </p>
            </div>
           </Col>
        </Row>
        <Row>
           <Col lg = {12}>
            <div className="team-slider">
            <Row>
            {
             team.map((item)=>(
                <Col lg = {3}>
                    <div className="teamitem">
                        <div className="team-image">
                            <img src={item.image} alt="team" className='w-100 img-fluid' />
                            </div>
                        <div className="team-content">
                            <h4>{item.name}</h4>
                            <p>{item.designation}</p>
                        </div>          
                    </div>
                </Col>   
                        
                  
                ))                       
            }                 
            </Row>            
            </div>
           </Col>
        </Row>
    </Container>
</section>

        {/*Footer-part*/}
        <Footer></Footer>
    </>
  )
}

export default About