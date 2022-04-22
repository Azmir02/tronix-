import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsInstagram,BsFacebook,BsTwitter,BsLinkedin,BsTelephone,BsEnvelope } from "react-icons/bs";

const Topbar = () => {
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
                            </div>
                    </Col>
                </Row>
                </div>
        </Container>
    </>
  )
}

export default Topbar