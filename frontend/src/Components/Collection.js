import React, { useEffect, useState,useReducer} from 'react'
import { Col, Row ,Spinner,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
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
                product: action.payload

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

export const Collection = () => {

    const [{isLoading,product,error}, dispatch] = useReducer(reducer, {
        isLoading: false,
        product: [],
        error: ''
    });

    useEffect(()=>{
        let getproducts = async ()=>{
            dispatch({type: 'FETCH_REQUEST'})
            try{
                let productInfo = await axios.get('/api/collection')
                dispatch({type: 'FETCH_SUCCESS',payload: productInfo.data })
            }
            catch(err){
                dispatch({type: 'FETCH_ERROR',payload:err.message })
                
            }
           
        }
        getproducts()
    },[])


  return (
    <>
        <section className='collection'>
            <Container>
                <Row>
                    <Col lg = {4} className = "m-auto">
                        <div className="collectoion-header text-center">
                            <h1>Our Collections</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. </p>    
                        </div>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    {
                        product.map((item)=>(
                            <>
                                <Col lg = {6}>
                                    <div className="collection-part">
                                        <img src={item.image} alt="collectionImage" />
                                        <div className="collection-overlay text-center">
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                </Col>
                            </>
                        ))
                    }
                </Row>
            </Container>
        </section>
    </>
  )
}
