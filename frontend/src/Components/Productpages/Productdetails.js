import axios from 'axios';
import React,{useContext, useEffect, useState,useReducer} from 'react'
import { Col, Container, Row,Navbar,Nav,Breadcrumb,Badge} from 'react-bootstrap'
import { BsPlus,BsDash,BsInstagram,BsFacebook,BsTwitter,BsLinkedin,BsTelephone,BsEnvelope,BsPerson,BsSearch ,BsBag,BsArrowRightShort,BsFillHeartFill} from "react-icons/bs";
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import Detailsrating from './Detailsrating';
import deliver from '../../FastDelivery.png'
import voucher from '../../voucher.png'
import stock from '../../Package.png'


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

const Productdetails = () => {
    const params = useParams()
    const {state, dispatch:cartContext} = useContext(Store) 
    const {cart:{cartItems}} = state

    const [{isLoading,product,error}, dispatch] = useReducer(reducer, {
        isLoading: false,
        product: {},
        error: ''
    });

    const [quantity,setQuantity] = useState(0)

    useEffect(()=>{
        let getproducts = async ()=>{
            dispatch({type: 'FETCH_REQUEST'})
            try{
                let productInfo = await axios.get(`/api/products/${params.slug}`)
                dispatch({type: 'FETCH_SUCCESS',payload: productInfo.data })
                console.log(product);
            }
            catch(err){
                dispatch({type: 'FETCH_ERROR',payload:err.message })
            }
           
        }
        getproducts()
    },[params.slug])

    useEffect(()=>{
      const existingItem = cartItems.find((item)=> item._id == product._id)
      const quantity = existingItem ? existingItem.quantity : 0
      setQuantity(quantity)
    },[cartItems,product])


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

  //for quantity update
  const quantityUpgrade = (product,quantity)=>{
    cartContext({
      type: "ADD_TO_CART",
      payload:{...product,quantity}
    })

  }


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
                                    <Link to = "/signin"><BsPerson></BsPerson> <span>account</span></Link>
                                </div>
                        </Col>
                    </Row>
               </div>
        </Container>


        <Navbar expand="lg">
  <Container>
    <Navbar.Brand href="#">
            <div className="logo">
              <a href="#">Tronix</a>
            </div>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="ms-5 my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <div className="menu">
            <Link to = "/">Home</Link>
            <Link to = "/about">About</Link>
            <Link to = "/api/products/all">Product</Link>
            <Link to = "/blog">Blog</Link>
            <Link to = "/contact">Contact</Link>
        </div>
      </Nav>
             <div className="searchnav_two">
                <div className="search-bar">
                  <input type="text" placeholder='Search here' />
                  <button type='button'><BsSearch></BsSearch></button>
                </div>
             </div>
    </Navbar.Collapse>
              <div className="cartoption_two">
                <div className="cart-bag">
                <BsBag></BsBag>
                {state.cart.cartItems.length > 0 &&   <Badge pill>{state.cart.cartItems.length}</Badge>}
                <BsEnvelope></BsEnvelope>
              </div>
              </div>
    </Container>
    </Navbar>


   <Container>
        <Breadcrumb className='breadcumb mt-3'>
                <h6>
                  <Link to = "/">Home</Link>
                  <BsArrowRightShort></BsArrowRightShort>
                  <span>Product details</span>
                </h6>
        </Breadcrumb>
   </Container>
   
   <div className="product-details mt-5">
       <Container>
           <Row className='align-items-center'>
               <Col lg = {6}>
                   <div className="details-product-left">
                       <img style={{width: "100%"}} src= {product.image} alt="" />
                   </div>
               </Col>
               <Col lg = {6}>
                   <div className="subdetails-product">
                      <div className="rating-sithlist d-flex align-items-center">
                            <div className="rating-left w-50">
                                <Detailsrating ratings = {product.rating}></Detailsrating>
                                <p>Reviews ({product.reviews})</p>
                            </div>
                            <div className="wishlist-right w-50 text-end">
                              <div className="whishlist">
                                <BsFillHeartFill></BsFillHeartFill>
                                <span>Add to whishlist</span>
                              </div>
                            </div>
                      </div>
                      <div className="product-name mt-3">
                          <h2>{product.name}</h2>
                      </div>
                      <div className="product-price mt-3 mb-5">
                          <h3>${product.price}</h3>
                      </div>
                      <div className="status-delivery pb-4 d-flex justify-content-between align-items-center">
                        <div className="delivery d-flex align-items-center">
                            <img src= {deliver} alt="" />
                            <span>Free Delivery</span>
                        </div>
                        <div className="delivery d-flex align-items-center">
                            <img src= {voucher} alt="" />
                            <span style={{marginTop: "0"}}>Available Voucher</span>
                        </div>
                        <div className="delivery d-flex align-items-center">
                            <img src= {stock} alt="" />
                            <span style={{marginTop: "0"}}>
                              {product.inStock == 0 ? "Out of stock" : "In Stock"}
                            </span>
                        </div>
                      </div>

                      <div className="product-description mt-3">
                        <h5>Description</h5>
                        <p>{product.description}</p>
                      </div>


                      <div className="cart d-flex align-items-center justify-content-between mt-5">
                        <div className="quantity-part w-50">
                            <span>Quantity</span>
                           
                            <button type='button' onClick={()=>quantityUpgrade(product,quantity == 0 ? 0 : quantity -1)}><BsDash></BsDash></button>

                            <span className='quantity-count'>{quantity}</span>
                              
                            <button type='button' onClick={()=>quantityUpgrade(product,quantity + 1)}><BsPlus></BsPlus></button>
                        </div>
                          <div className="button-area d-flex justify-content-end w-50">
                              <div className="chat me-3">
                              <button  type='button'>Chat</button>                    
                            </div>
                            
                            {product.inStock == 0
                               ?
                               <div className="add-cart w-50">
                                   <button onClick={()=>handleCart(product)} type='button'>Out of stock</button>
                                   <ToastContainer limit = {1}/>
                               </div>
                             
                               :
                               <div className="add-cart w-50">
                                   <button onClick={()=>handleCart(product)} type='button'>{product.button}</button>
                                   <ToastContainer limit = {1}/>
                                   
                               </div>             
                              }
                          </div>
                      </div>
                   </div>
               </Col>
           </Row>
       </Container>
   </div>
    </>
  )
}

export default Productdetails