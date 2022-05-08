import React from 'react'
import { Container, Row,Col} from 'react-bootstrap'
import { BsNewspaper,BsTelephone,BsEnvelope,BsInstagram,BsFacebook,BsTwitter} from "react-icons/bs";
import { Link } from 'react-router-dom';
import mastercard from '../../mastercard.png'
import visa from '../../Visa.png'
import paypal from '../../paypal.png'

const Footer = () => {
  return (
    <>
    <div className="top-footer">
        <Container>
            <Row className='align-items-center'>
                <Col lg = {8}>
                    <div className="left-top-foter d-flex align-items-center">
                        <div className="left-f-icon">
                            <BsNewspaper></BsNewspaper>
                        </div>
                        <div className="right-f-text ms-4">
                            <h3>Join our newsletter now!</h3>
                            <p>Register now and get our latest updates and promos.</p>
                        </div>
                    </div>
                </Col>
                <Col lg = {4}>
                    <div className="registar-footer">
                        <form>
                            <div className="form-field">
                                <input type="email" placeholder='Enter your email' />
                            </div>
                            <div className="form-footer-button">
                                <button type='submit'>join</button>
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
        <footer id='footer'>
            <Container>
                <Row>
                    <Col lg = {6}>
                        <div className="footer-content-left">
                            <div className="logo">
                                <a href="#">Tronix</a>
                            </div>
                            <div className="f-des">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. </p>
                            </div>
                            <div className="right-bar">
                                <a href="#"><BsTelephone></BsTelephone> <span>+12 345 6789 0</span></a>
                                <a href="#"><BsEnvelope></BsEnvelope> <span>support@tronix.com</span></a>
                            </div>
                        </div>
                    </Col>
                    <Col lg = {2}>
                        <div className="footer-topics">
                            <div className="topics-header">
                                <h5>Company</h5>
                            </div>
                            <div className="topics-body">
                                <ul className='ps-0'>
                                    <li>
                                        <Link to = "/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to = "/about">About</Link>
                                    </li>
                                    <li>
                                        <Link to = "/api/products/all">Product</Link>    
                                    </li>
                                    <li>
                                        <Link to = "/blog">Blog</Link>
                                    </li>
                                    <li>
                                        <Link to = "/contact">Contact</Link>   
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col lg = {2}>
                        <div className="footer-topics">
                            <div className="topics-header">
                                <h5>Information</h5>
                            </div>
                            <div className="topics-body">
                                <ul className='ps-0'>
                                    <li>
                                        <Link to = "#">Help Center </Link>
                                    </li>
                                    <li>
                                        <Link to = "#">Payment Methods</Link>
                                    </li>
                                    <li>
                                        <Link to = "#">Return & Refund</Link>    
                                    </li>
                                    <li>
                                        <Link to = "#">Privacy Policy</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col lg = {2}>
                    <div className="footer-topics">
                            <div className="topics-header">
                                <h5>Follow Us</h5>
                            </div>
                            <div className="topics-body-social">
                                <a href="#"><BsInstagram></BsInstagram></a>
                                <a href="#"><BsFacebook></BsFacebook></a>
                                <a href="#"><BsTwitter></BsTwitter></a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
        <section id='copyright'>
            <Container>
                <div className="inner-copyright d-flex align-items-center">
                    <div className="left-copyright w-50">
                      <p>Copyright &copy; 2021 Tronix. All Right Reseved</p>
                    </div>
                    <div className="copyright-payment text-end w-50">
                        <Link to = "#">
                            <img src= {mastercard} alt="mastercard" />
                        </Link>
                        <Link to = "#">
                            <img src= {visa} alt="visa" />
                        </Link>
                        <Link to = "#">
                            <img src= {paypal} alt="paypal" />
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    </>
  )
}

export default Footer