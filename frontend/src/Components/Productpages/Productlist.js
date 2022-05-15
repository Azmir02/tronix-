import React,{useEffect, useState,useReducer,useContext} from 'react'
import { Col, Container, Row,Navbar,Nav,Badge,Spinner} from 'react-bootstrap'
import {BsEnvelope,BsSearch ,BsBag,BsListUl,BsMicrosoft} from "react-icons/bs";
import { Link ,useNavigate} from 'react-router-dom';
import Detailsrating from './Detailsrating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Store } from '../Store';
import Footer from '../layouts/Footer';
import Ratings from '../Ratings';
import Productsummery from './Productsummery';
import Productsummery2 from './Productsummery2';




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
  const {state,state2,dispatch3, dispatch:cartContext} = useContext(Store) 
  const {cart:{cartItems}} = state
  const {wishlist:{wishlistItems}} = state2
  const navigate = useNavigate()


  const [{isLoading,product,error}, dispatch] = useReducer(reducer, {
      isLoading: false,
      product: [],
      error: ''
  });

  //listing product
  const [lists,setLists] = useState(true)
  const [searchtopic,setSearchtopic] = useState("")
  const [searchresult,setSearchresult] = useState([])




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
          console.log(item);
        }
      })
      setSearchresult(searchArr)
      dispatch3({
        type: "SEARCH_RESULT",
        payload: searchArr
      })
      navigate("/api/products/productlist")
  
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
                <Link to = "/cartpage"><BsBag></BsBag></Link>
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
                        <input onChange={handleSearch} type="text" placeholder='Search here' />
                        <button onClick = {handleSearches} type='button'><BsSearch></BsSearch></button>
                        </div>
                    </div>
                </Col>
           </Row>
    </Container>

    {/*=====view part======*/}
    <Container>
      <Row className='mt-5'>
        <Col lg = {6}>
          <div className="left-view-part"></div>
        </Col>
        <Col lg = {6}>
          <div className="right-design-part text-end">
            <button type='button' onClick={()=>setLists(true)}><BsListUl className={lists == true ? "filteractive" : ""}></BsListUl></button>
            <button type='button' onClick={()=>setLists(false)}><BsMicrosoft className={lists == false ? "filteractive" : ""}></BsMicrosoft></button>
          </div>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row className='main-category-part'>
        <Col lg = {3}>
          <div className='category-part'></div>
        </Col>
        <Col lg = {9}>
          <div className='view-items'></div>
          {/*for listing product*/}

            {
              isLoading ?
                  <div className="loading">
                    <Spinner animation="border" role="status">
                    <span className="visually-hidden"></span>
                    </Spinner>
                  </div>
              :

                lists
                ?
                <Productsummery product = {product}></Productsummery>
                :
                <Productsummery2 product = {product}></Productsummery2>

            }
            
        </Col>
      </Row>
    </Container>

        {/*======footer part=====*/}

        <Footer></Footer>
    </>
  )
}

export default Productlist