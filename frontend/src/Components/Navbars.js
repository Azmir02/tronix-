import React, { useContext, useState,useReducer,useEffect } from 'react'
import {Navbar,Container,Nav,Badge} from 'react-bootstrap'
import { BsSearch,BsEnvelope ,BsBag} from "react-icons/bs";
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { Store } from './Store';
import user from '../User.png'
import axios from 'axios';


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

const Navbars = () => {
  const {state,dispatch3,state4,dispatch4} = useContext(Store)
  const {userInfo} = state4
  const navigate = useNavigate()

  
  const {search} = useLocation()
  const redirectUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectUrl ? redirectUrl : "/"


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
    if(searchtopic){
      navigate("/catalog")
    }

  }

  //Logout-user
  const handleLogout = ()=>{
    dispatch4({
      type: "USER_LOGOUT",
    })
    localStorage.removeItem('users')
  } 

 


  return (
   <>
   <Navbar expand="lg">
   <Container>     
         <Navbar.Brand>
             <div className="logo">
                <a href="#">Tronix</a>
             </div>
         </Navbar.Brand>
             <div className="searchnav">
                <div className="search-bar">
                  <input onChange={handleSearch} type="text" placeholder='Search here' />
                  <button onClick = {handleSearches} type='button'><BsSearch></BsSearch></button>
                </div>
             </div>
            
            <div className="cartoption">
              <div className="cart-bag">
                    <Link to = "/cartpage"><BsBag></BsBag></Link>
                    {state.cart.cartItems.length > 0 &&   <Badge pill>{state.cart.cartItems.length}</Badge>}
                
                <BsEnvelope></BsEnvelope>
                {
                  userInfo
                  ?
                  <>
                  <img src={user} alt="user" />
                  <div className="username-box">
                    <span className='userName'>{userInfo.data.name}</span>
                    <div className="user-dropdown">
                        <span onClick={handleLogout} >Logout</span>
                    </div>
                  </div>
                  </>
                  :
                  <>
                    <Link style={{marginRight: "32px"}} to = "/signin?redirect=/shipping">Sign in</Link>
                  <button className='signup' type='button'><Link  to = {`/signup?redirect=${redirect}`}>Sign up</Link></button>
                  </>
                }
              </div>
            </div>
   </Container>
   </Navbar>


   <Navbar expand="lg">
  <Container>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="m-auto">
          <div className="menu">
              <Link to = "/">Home</Link>
              <Link to = "/about">About</Link>
              <Link to = "/api/products/all">Product</Link>
              <Link to = "/blog">Blog</Link>
              <Link to = "/contact">Contact</Link>
          </div>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
   </>
  )
}

export default Navbars