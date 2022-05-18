import axios from 'axios';
import React,{useContext, useEffect, useState,useReducer} from 'react'
import { Col, Container, Row,Navbar,Nav,Breadcrumb,Badge} from 'react-bootstrap'
import { BsPlus,BsChevronLeft,BsChevronRight,BsDash,BsInstagram,BsFacebook,BsTwitter,BsLinkedin,BsTelephone,BsEnvelope,BsPerson,BsSearch ,BsBag,BsArrowRightShort,BsFillHeartFill} from "react-icons/bs";
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import Detailsrating from './Detailsrating';
import ReactImageMagnify from "react-image-magnify";
import deliver from '../../FastDelivery.png'
import voucher from '../../voucher.png'
import stock from '../../Package.png'
import Errorpage from '../Errorpage';


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
    const {state,state2, dispatch:cartContext,dispatch2} = useContext(Store) 
    const {cart:{cartItems}} = state
    const {wishlist:{wishlistItems}} = state2

    const [{isLoading,product,error}, dispatch] = useReducer(reducer, {
        isLoading: false,
        product: {},
        error: ''
    });

    const [quantity,setQuantity] = useState(0)
    const [relatedproducts,setRelatedproducts] = useState([])
    const [wishlistproduct,setWishlistproduct] = useState('')
    const [discount,setDiscount] = useState("")

    useEffect(()=>{
        let getproducts = async ()=>{
            dispatch({type: 'FETCH_REQUEST'})
            try{
                let productInfo = await axios.get(`/api/products/${params.slug}`)
                dispatch({type: 'FETCH_SUCCESS',payload: productInfo.data })


                 //related products
                let productall = await axios.get('/api/products')
                let filterproduct = productall.data.filter((item)=> item.category == productInfo.data.category && item.name !== productInfo.data.name)
                setRelatedproducts(filterproduct)
            }
            catch(err){
                dispatch({type: 'FETCH_ERROR',payload:err.message })
            }
        
           
           
        }
        getproducts()
    },[params.slug])


    useEffect(()=>{
      if(product.offer >  0){
        const beforediscount = (product.offer * product.price)/100
        const afterdiscount = product.price - beforediscount
        setDiscount(afterdiscount);
      }
    },[product])

    
  

    useEffect(()=>{
      const existingItem = cartItems.find((item)=> item._id == product._id)
      const quantity = existingItem ? existingItem.quantity : 0
      setQuantity(quantity)
      //wishlist products
        try{
          let wishlists = wishlistItems.find((item) => product._id === item._id)
          setWishlistproduct(wishlists._id == product._id)
        }
        catch{
          setWishlistproduct(false)
        }
    },[cartItems,product,wishlistItems])


  //add to cart
    const handleCart = async (product)=>{
      const existingItem = cartItems.find((item)=> item._id == product._id)
      const quantity = existingItem ? existingItem.quantity + 1 : 1

      const {data} = await axios.get(`/api/products/${product._id}`)
      
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
      cartContext({
        type: "ADD_TO_CART",
        payload:{...product, price: discount ? discount : product.price,quantity}
    })

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
      
  }

  //for quantity update
  const quantityUpgrade = (product,quantity)=>{
    cartContext({
      type: "ADD_TO_CART",
      payload:{...product,quantity}
    })

  }
//wishlist
const handleWishlist = ()=>{
  dispatch2({
    type: 'ADD_WISHLIST',
    payload: product
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
                  <span>Product details</span>
                </h6>
        </Breadcrumb>
   </Container>
   
   <div className="product-details mt-5">
       <Container>
           <Row className='align-items-center'>
              <Col lg = {12}>
                {
                  product
                  ?
                    <Row>
                  <Col lg = {6}>
                    <div className="details-product-left">
                        {product.image && <ReactImageMagnify
                            {...{
                              smallImage: {
                                alt: "Wristwatch by Ted Baker London",
                                isFluidWidth: true,
                                src: `${product.image}`,
                                sizes:
                                  "(min-width: 500px) 33.5vw, (min-width: 400px) 50vw, 100vw"
                              },
                              largeImage: {
                                alt: "",
                                src: `${product.image}`,
                                width: 1200,
                                height: 1200
                              },
                              isHintEnabled: true
                            }}
                      />}
                    </div>
                    <Row className='justify-content-center align-items-center mt-5'>
                      <Col lg = {1}>
                          <div className="prev-arrow">
                            <button type='button'><BsChevronLeft></BsChevronLeft></button>
                          </div>
                      </Col>
                      <Col lg = {8}>
                        {relatedproducts.length > 0
                        ?
                        <Row>
                            {
                                relatedproducts.map((item)=>(
                                  <>
                                    <Col lg = {3}>
                                      <div className="related-image">
                                        <Link to = {`${`/api/products/${item.slug}`}`}><img  className='w-100 img-fluid' src= {item.image} alt = "product-image"/></Link>
                                      </div>
                                    </Col>
                                  </>
                              ))
                            }
                        </Row>
                        :
                        ""
                        }

                      </Col>
                      <Col lg = {1}>
                          <div className="next-arrow">
                            <button type='button'><BsChevronRight></BsChevronRight></button>
                          </div>
                      </Col>
                    </Row>
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
                                <BsFillHeartFill className={`${wishlistproduct ? "wishlist-mark" : ""}`} onClick={handleWishlist}></BsFillHeartFill>
                                  <span>Add to whishlist</span>
                                </div>
                              </div>
                        </div>
                        <div className="product-name mt-3">
                            <h2>{product.name}</h2>
                        </div>
                        <div className="product-price mt-3 mb-5">
                            {discount ? <h3>${discount}</h3> : ""}
                            {discount ? <p><del>{product.price}</del></p> : <h3>${product.price}</h3>}
                            { 
                              product.offer > 0
                              ?
                              <span>save {product.offer}%</span>
                              :
                              ""
                            }
                            
                           
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

                :

                <Errorpage></Errorpage>
                }
              </Col>
           </Row>
       </Container>
   </div>
    </>
  )
}

export default Productdetails