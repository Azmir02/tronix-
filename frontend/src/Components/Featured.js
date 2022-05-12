import React,{useReducer,useContext,useEffect, useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Featured = () => {
  return (
   <>
    <section className='product-feature'>
            <Container>
                <Row>
                    <Col lg = {4} className = "m-auto">
                        <div className="header text-center">
                            <h2>Featured Products</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                   
                </Row>
            </Container>
        </section>
   </>
  )
}

export default Featured