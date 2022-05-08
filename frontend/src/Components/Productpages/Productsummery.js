import React,{useEffect, useState,useReducer,useContext} from 'react'
import { Col, Container, Row,Navbar,Nav,Badge,Spinner} from 'react-bootstrap'
import {BsFillHeartFill,BsEnvelope,BsSearch ,BsBag,BsListUl,BsMicrosoft} from "react-icons/bs";
import { Link } from 'react-router-dom';
import Detailsrating from './Detailsrating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Store } from '../Store';
import Ratings from '../Ratings';


const Productsummery = ({product}) => {
    const {state,state2,state3,dispatch2, dispatch:cartContext} = useContext(Store) 
  const {cart:{cartItems}} = state
  const {wishlist:{wishlistItems}} = state2


    
    //add-to-cart
    const handleCart = async (product)=>{
        const existingItem = cartItems.find((item)=> item._id == product._id)
        const quantity = existingItem ? existingItem.quantity + 1 : 1

        const {data} = await axios.get(`/api/productid/${product._id}`)

        if(data.inStock < quantity){
            toast.error(`${data.name} is out of stock`, {
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

        toast.success(`${data.name} added to cart`, {
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

    //wishlist
    const handleWishlist = (product)=>{
      dispatch2({
        type: 'ADD_WISHLIST',
        payload: product
      })

    }


  return (
    <>
    {
      state3.searchmain.length === 0
      ?
      product.map((item)=>(
        <Row className='main-view-part align-items-center'>
        <Col lg = {3}>
          <div className='view-image'>
            <img style={{width: "100%"}} src={item.image} className = "w-100 img-fluid"/>
          </div>
        </Col>
        <Col lg = {6}>
          <div className='view-details ps-3'>
            <Detailsrating ratings = {item.rating}></Detailsrating>
            <p>Reviews ({item.reviews})</p>
            <div className='view-header'>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              {item.inStock == 0
                 ?
                 <div className="add-cart">
                     <button onClick={()=>handleCart(item)}  type='button'>Out of stock</button>
                     <ToastContainer limit = {1}/>
                 </div>
               
                 :
                 <div className="add-cart">
                     <button onClick={()=>handleCart(item)} type='button'>{item.button}</button>
                     <ToastContainer limit = {1}/>
                 </div>                     
                }
            </div>
          </div>
        </Col>
        <Col lg = {3}>
          <div className='view-price text-end'>
                <h4>${item.price}</h4>
                <div className="whishlist">
                {wishlistItems.find(product=> product._id === item._id)
                  ?  
                 <>
                    <BsFillHeartFill className="wishlist-mark" onClick={()=>handleWishlist(item)}></BsFillHeartFill>
                    <span>Add to whishlist</span> 
                  </>
                  :
                 <>
                    <BsFillHeartFill onClick={()=>handleWishlist(item)}></BsFillHeartFill>
                    <span>Add to whishlist</span>
                 </>
                }                         
                </div>
          </div>
        </Col>
      </Row>
      ))
      :
      state3.searchmain.map((item)=>(
        <Row className='main-view-part align-items-center'>
        <Col lg = {3}>
          <div className='view-image'>
            <img style={{width: "100%"}} src={item.image} className = "w-100 img-fluid"/>
          </div>
        </Col>
        <Col lg = {6}>
          <div className='view-details ps-3'>
            <Detailsrating ratings = {item.rating}></Detailsrating>
            <p>Reviews ({item.reviews})</p>
            <div className='view-header'>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              {item.inStock == 0
                 ?
                 <div className="add-cart">
                     <button onClick={()=>handleCart(item)}  type='button'>Out of stock</button>
                 </div>
               
                 :
                 <div className="add-cart">
                     <button onClick={()=>handleCart(item)} type='button'>{item.button}</button>
                     <ToastContainer limit = {1}/>
                 </div>                     
                }
            </div>
          </div>
        </Col>
        <Col lg = {3}>
          <div className='view-price text-end'>
                <h4>${item.price}</h4>
                <div className="whishlist">
                {wishlistItems.find(product=> product._id === item._id)
                  ?  
                 <>
                    <BsFillHeartFill className="wishlist-mark" onClick={()=>handleWishlist(item)}></BsFillHeartFill>
                    <span>Add to whishlist</span> 
                  </>
                  :
                 <>
                    <BsFillHeartFill onClick={()=>handleWishlist(item)}></BsFillHeartFill>
                    <span>Add to whishlist</span>
                 </>
                }                         
                </div>
          </div>
        </Col>
      </Row>
      ))

    
    }
    </>
  )
}

export default Productsummery