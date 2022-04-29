import React,{useEffect, useState,useReducer,useContext} from 'react'
import { Col, Container, Row,Navbar,Nav,Breadcrumb,Badge,Spinner} from 'react-bootstrap'
import { BsInstagram,BsFacebook,BsTwitter,BsLinkedin,BsFillHeartFill,BsEnvelope,BsPerson,BsSearch ,BsBag,BsArrowRightShort} from "react-icons/bs";
import { Link } from 'react-router-dom';
import Detailsrating from './Detailsrating';
import axios from 'axios'
import { Store } from '../Store';




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

const Productlist = () => {
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
                let productInfo = await axios.get('/api/products/all')
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

  return (
    <>
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
        className="m-auto my-2 my-lg-0"
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
           <Row className='p-list-main'>
                <Col lg = {8} className = "m-auto p-list">
                    <div className="header text-center">
                        <h3>What are you looking for?</h3>
                    </div>
                    <div className="searchnav_two">
                        <div className="search-bar">
                        <input type="text" placeholder='Search here' />
                        <button type='button'><BsSearch></BsSearch></button>
                        </div>
                    </div>
                </Col>
           </Row>
           
    </Container>
    <Container>
      <Row>
        <Col lg = {3}>
          <div className='category-part'></div>
        </Col>
        <Col lg = {9}>
          <div className='view-items'></div>
          {isLoading
            ?
              <div className="loading">
                  <Spinner animation="border" role="status">
                  <span className="visually-hidden"></span>
                  </Spinner>
              </div>
            :
            product.map((item)=>(
              <Row className='main-view-part align-items-center'>
              <Col lg = {3} className = "mb-5">
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
                           <button  type='button'>Out of stock</button>
                       </div>
                     
                       :
                       <div className="add-cart">
                           <button  type='button'>{item.button}</button>
                           
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
          
        </Col>
      </Row>
    </Container>

    </>
  )
}

export default Productlist