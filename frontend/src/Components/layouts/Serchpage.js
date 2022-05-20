import React,{useContext, useEffect,useReducer, useState} from 'react'
import { Container,Row,Col,Navbar ,Nav,Breadcrumb,Badge,Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BsInstagram,BsFacebook,BsTwitter,BsLinkedin,BsTelephone,BsEnvelope,BsPerson,BsSearch ,BsBag,BsArrowRightShort,BsFillHeartFill} from "react-icons/bs";
import { Store } from '../Store';
import { Swiper, SwiperSlide } from 'swiper/react';
import Ratings from '../Ratings';
import { ToastContainer, toast } from 'react-toastify';
import { Autoplay, Pagination, Navigation } from "swiper";
import axios from 'axios';
import Footer from './Footer';



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



const Serchpage = () => {
    const {state,state2, state3,dispatch3,dispatch:cartContext,dispatch2} = useContext(Store) 
    const {cart:{cartItems}} = state
    const {wishlist:{wishlistItems}} = state2
    const {searchmain} = state3


    const [brand,setBrand] = useState([])
    const [searchtopic,setSearchtopic] = useState("")
    const [searchresult,setSearchresult] = useState([])

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

    useEffect(()=>{
      let branddatas = async ()=>{
        let brand = await axios.get("/api/brands")
        setBrand(brand.data)
      }
      branddatas()
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
          toast.error(`${data.name}  is out of stock`, {
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

  

  // search-functionality

  const handleSearch = (e)=>{
    setSearchtopic(e.target.value)
    if(e.target.value){
    let searchArr = []
    product.map((item)=>{
      if(item.name.includes(searchtopic.toLowerCase())){
        searchArr.push(item)
      }
    })
      setSearchresult(searchArr)
    }
    else{
      setSearchresult([])
    }
  }


  const handleSearches = ()=>{
    let searchArr = []
    product.map((item)=>{
     if(item.name.includes(searchtopic.toLowerCase())){
      searchArr.push(item)
      }
    })
    setSearchresult(searchArr)
    dispatch3({
      type: "SEARCH_RESULT",
      payload: searchArr
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
                  <input onChange={handleSearch} type="text" placeholder='Search here' />
                  <button onClick = {handleSearches} type='button'><BsSearch></BsSearch></button>
                </div>
             </div>
    </Navbar.Collapse>
              <div className="cartoption_two">
                <div className="cart-bag">
                <Link to = "/cartpage"><BsBag></BsBag></Link>
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
                  <span>Search Results</span>
                </h6>
        </Breadcrumb>
   </Container>


   <section className='search-result'>
      <Container>
        <Row>
          <Col lg = {12}>
            <div className="category-selection"></div>
          </Col>
          <Col lg = {12}>
            <div className="category-box"></div>
          </Col>
        </Row>
        <Row>
          <Col lg = {12} className = "mt-5">
            <Row>
              <Col lg = {4}>
                <div className="brand-header mb-5">
                    <h3>Featured Brand</h3>
                </div>
              </Col>
            <Swiper
              spaceBetween={0}
              slidesPerView={6}
              autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation={false}
                speed={1000}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
              {
                 brand.map((item)=>(
                  <SwiperSlide>
                  
                      <Col lg = {5} className = "m-auto">
                          <div className="featured-brand text-center">
                              <img src= {item.image} alt="brandimage" className='w-100 img-fluid' />
                          </div>
                      </Col>
                  
                  </SwiperSlide>
                 ))
              }
            </Swiper>
             
            </Row>
          </Col>
        </Row>
      </Container>
   </section>

{/* Products-part */}
   <section className='prodcuts'>
      <Container>
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
              searchmain.length === 0

                ?
                product.map((item)=>(
                  
                  <Col lg = {3} className = "mt-5">
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
                ))
                :
                searchmain.map((item)=>(
                  
                  <Col lg = {3} className = "mt-5">
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
                ))

}
         </Row>
    </Container>
   </section>


   <Footer></Footer>
    </>
  )
}

export default Serchpage