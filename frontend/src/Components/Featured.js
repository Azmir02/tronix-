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
                let productInfo = await axios.get('/api/products/featureproduct')
                dispatch({type: 'FETCH_SUCCESS',payload: productInfo.data })
                dispatch({type: 'FETCH_SUCCESS',payload: productInfo.data })
               
            }
            catch(err){
                dispatch({type: 'FETCH_ERROR',payload:err.message })
                
            }
           
        }
        
        getproducts()
    },[])
    console.log(productleft);


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
                    
                                <Col lg = {6}>
                                    <div className='left-featured'>
                                       asd
                                    </div>
                                </Col>
                            
                     
                        <Col lg = {6}>
                    asdasd
                        </Col>
                </Row>
            </Container>
        </section>
   </>
  )
}

export default Featured