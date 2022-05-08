import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Processing = (props) => {
  return (
    <>
        <Container>
            <Row>
                <Col lg = {12}>
                    <div className="main-process d-flex jusitfy-content-between align-items-center">
                        <div className="left-proccess">
                           <div className= {`inner-left ${props.step1 ? "processactive" : ""}`}>
                                <span>1</span>
                           </div>
                                <p className= {props.step1 ? "processactive2" : ""}>My Cart</p>
                        </div>
                        <div className="right-proccess text-end">
                        <div className="inner-right">
                                <span>2</span>
                           </div>
                                <p>Checkout</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Processing