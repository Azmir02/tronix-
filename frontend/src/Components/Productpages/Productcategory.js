import React, { useEffect, useState,useReducer, useContext } from 'react'
import { Col, Row ,Spinner} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Ratings from '../Ratings'
import { BsFillHeartFill} from "react-icons/bs";
import { Store } from '../Store'




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



const Productcategory = () => {

    const {state,state2,dispatch2, dispatch:cartContext} = useContext(Store) 
    const {cart:{cartItems}} = state
    const {wishlist:{wishlistItems}} = state2

    const [{isLoading,product,error}, dispatch] = useReducer(reducer, {
        isLoading: false,
        product: [],
        error: ''
    });



    useEffect(()=>{
        let getproducts = async ()=>{
            dispatch({type: 'FETCH_REQUEST'})
            try{
                let productInfo = await axios.get('/api/products')
                dispatch({type: 'FETCH_SUCCESS',payload: productInfo.data })
            }
            catch(err){
                dispatch({type: 'FETCH_ERROR',payload:err.message })
                
            }
           
        }
        getproducts()
    },[])

    


    //wishlist
    const handleWishlist = (product)=>{
        dispatch2({
        type: 'ADD_WISHLIST',
        payload: product
    })
}


    //add-to-cart
    const handleCart = async (product)=>{
        const existingItem = cartItems.find((item)=> item._id == product._id)
        const quantity = existingItem ? existingItem.quantity + 1 : 1

        const {data} = await axios.get(`/api/products/id/${product._id}`)
        console.log(data);
        if(data.inStock < quantity){
            toast.error(`Product is out of stock`, {
                position: "bottom-center",
                autoClose: 1000,
                limit: 1,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
              return
        }
        
        toast.success(`Product added to cart`, {
            position: "top-right",
            autoClose: 1000,
            limit: 1,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        cartContext({
            type: "ADD_TO_CART",
            payload:{...product,quantity}
        })
    }

  

  return (
    <>
       <div className="allproduct">
       <Row>
                <Col lg = {5} className = "m-auto mt-5">
                    <div className="header text-center">
                        <h3>All Categories</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. </p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg = {3}>
                    <h2>catlist</h2>
                </Col>

                <Col lg = {9}>
                    <div className="category">
                        <h2>cat</h2>
                    </div>
                    <div className="brand">
                        <h2>
                            brand
                        </h2>
                    </div>
                    <div className="product-list mt-5">
                        <div className="main-product-list d-flex align-items-center">
                            <div className="list-text w-50">
                                <p>Product List</p>
                            </div>
                            <div className="view-all w-50 text-end">
                                <Link to = "/api/products">View All</Link>
                            </div>
                        </div>
                    </div>
                    

                    <Row>
                        {isLoading

                        ?
                        <div className="loading">
                            <Spinner animation="border" role="status">
                            <span className="visually-hidden"></span>
                            </Spinner>
                        </div>

                        :
                            product.map((item)=>(
                                
                                item.showproduct === true
                                ?
                                <Col lg = {4} className = "mt-5">
                                    <div className="product-all">
                                        <div className="product-image">
                                            <img style={{width: "100%",borderRadius: "8px"}} src= {item.image} alt="" />
                                        </div>
                                        <div className="product-content text-center mt-3">
                                            <h4><Link to = {`/api/products/name/${item.slug}`}>{item.name}</Link></h4>
                                            <h5>${item.price}</h5>
                                        </div>
                                        <div className="ratings-part text-center">
                                            <div className="left-rating">
                                                <Ratings rating = {item.rating} />
                                            </div>
                                            <div className="sales"></div>
                                        </div>
                                        <div className="add-cart-wishlist mt-4 d-flex justify-content-center align-items-center">
                                           
                                            {item.inStock == 0
                                            ?
                                            <div className="add-cart w-50">
                                                <button onClick={()=>handleCart(item)} type='button'>Out of stock</button>
                                                <ToastContainer limit = {1}/>
                                            </div>
                                          
                                            :
                                            <div className="add-cart w-50">
                                                <button onClick={()=>handleCart(item)} type='button'>{item.button}</button>
                                                <ToastContainer limit = {1}/>
                                                
                                            </div>
                                            }
                                            <div className="whishlist">

                                                {wishlistItems.find(product=> product._id === item._id)
                                                 ?  
                                                 <BsFillHeartFill className="wishlist-mark" onClick={()=>handleWishlist(item)}></BsFillHeartFill> 
                                                 :
                                                 <BsFillHeartFill onClick={()=>handleWishlist(item)}></BsFillHeartFill>
                                                 }
                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                :
                                ""
                            ))
                    }
                            
                    </Row>
                </Col>
            </Row>
       </div>
    </>
  )
}

export default Productcategory