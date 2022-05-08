import React from 'react'
import { Col, Row } from 'react-bootstrap'
import erroricon from '../error.png'

const Errorpage = () => {
  return (
    <>
        <Row>
            <Col lg = {12}>
                <div className="error-main text-center mt-2">
                    <div className="error-icon">
                        <img src={erroricon} alt="" />
                    </div>
                    <div className="error-content mt-4">
                        <h2>Oops, sorry!</h2>
                        <p>The product you are looking for is currently unavailable or try to search using other keywords</p>
                    </div>
                </div>
            </Col>
        </Row>
    </>
  )
}

export default Errorpage