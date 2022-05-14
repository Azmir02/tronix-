import React,{useReducer,useContext,useEffect, useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'


function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return {
             ...state,
             isLoading: true   
        };
        case 'FETCH_SUCCESS':
            return{
                ...state,
                isLoading: false,
                productleft: action.payload,
                productright: action.payload

            };

        case 'FETCH_ERROR':
            return{
                ...state,
                isLoading: false,
                error: action.payload
    
            };
      default:
        return state
    }
  }

const Featured = () => {

    
    const [{productleft,productright}, dispatch] = useReducer(reducer, {
        isLoading: false,
        productleft: [],
        productright: [],
        error: ''
    });


    useEffect(()=>{
        let getproducts = async ()=>{
            dispatch({type: 'FETCH_REQUEST'})
            try{
                let productInfo = await axios.get('/api/products/all')
                dispatch({type: 'FETCH_SUCCESS',payload: productInfo.data })
               
            }
            catch(err){
                dispatch({type: 'FETCH_ERROR',payload:err.message })
                
            }
           
        }
        
        getproducts()
    },[])
console.log(productright);

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
                    {
                        productleft.map((item)=>(
                            item.left === "true"
                            &&
                            <Col lg = {6}>
                                <div className="left-features text-center">
                                    <div className="feature-name">
                                        <h4>{item.name}</h4>
                                        <p>{item.price}</p>
                                    </div>
                                    <div className="featured-image">
                                        <img src= {item.image} alt="featuredimage" />
                                    </div>
                                    "Countdown"
                                </div>
                            </Col>
                        ))
                    }
                     <Col lg = {6}>
                     {
                        productright.map((item)=>(
                            item.right === "true"
                            &&
                            <Row>
                                <Col lg = {12}>
                                    <div className="right-featured d-flex align-items-center">
                                        <div className="right-featured-image">
                                            <img src={item.image} alt="rightfeaturedimage" />
                                        </div>
                                        <div className="right-featured-content ps-4">
                                            <span>Limited offer</span>
                                            <div className="feature-name">
                                                <h4>{item.name}</h4>
                                                <p>{item.price}</p>
                                            </div>
                                            "Countdown"
                                        </div>
                                        
                                    </div>
                                </Col>
                            </Row>
                        ))
                    }       
                    </Col>              
                           
                
                </Row>
            </Container>
        </section>
   </>
  )
}

export default Featured