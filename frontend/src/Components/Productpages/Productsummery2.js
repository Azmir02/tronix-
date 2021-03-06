import React,{useContext} from 'react'
import { Col, Row} from 'react-bootstrap'
import {BsFillHeartFill} from "react-icons/bs";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Store } from '../Store';
import Ratings from '../Ratings';



const Productsummery2 = ({product,search2}) => {
    const {state,state2,state3,dispatch2, dispatch:cartContext} = useContext(Store) 
    const {cart:{cartItems}} = state
    const {wishlist:{wishlistItems}} = state2
    const {searchmain} = state3
 



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
        if(product !== 0 ){
            cartContext({
                type: "ADD_TO_CART",
                payload:{...product,price: product.offer !== 0 ? product.price - ((product.price * product.offer)/100) : product.price,quantity}
            })
        }
        else{
            cartContext({
                type: "ADD_TO_CART",
                payload:{...product,quantity}
            })
        }
    }

 



  return (
    <>
       <Row className="allproduct">
       {
        search2.length === 0
        ?
        product.map((item)=>(
        
            <Col lg = {4} className = "mt-5">
            <div className="product-all">
                <div className="product-image">
                    <img style={{width: "100%",borderRadius: "8px"}} src= {item.image} alt="" />
                </div>
                <div className="product-content text-center mt-3">
                    <h4><Link to = {`/api/products/name/${item.slug}`}>{item.name}</Link></h4>
                    <h5>${item.offer !== 0 ? item.price - ((item.price * item.offer)/100) : item.price}</h5>
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
        ))
        :
        search2.map((item)=>(

            <Col lg = {4} className = "mt-5">
            <div className="product-all">
                <div className="product-image">
                    <img style={{width: "100%",borderRadius: "8px"}} src= {item.image} alt="" />
                </div>
                <div className="product-content text-center mt-3">
                    <h4><Link to = {`/api/products/name/Z${item.slug}`}>{item.name}</Link></h4>
                    <h5>${item.offer !== 0 ? item.price - ((item.price * item.offer)/100) : item.price}</h5>
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
        ))
          
    
    }                
                            
</Row>              
    </>
  )
}

export default Productsummery2