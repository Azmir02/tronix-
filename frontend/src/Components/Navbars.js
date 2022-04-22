import React, { useContext } from 'react'
import {Navbar,Container,Nav,Badge} from 'react-bootstrap'
import { BsSearch,BsEnvelope ,BsBag} from "react-icons/bs";
import { Link } from 'react-router-dom';
import { Store } from './Store';

const Navbars = () => {
  const {state} = useContext(Store)
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
                  <input type="text" placeholder='Search here' />
                  <button type='button'><BsSearch></BsSearch></button>
                </div>
             </div>
            
            <div className="cartoption">
              <div className="cart-bag">
                    <BsBag></BsBag>
                    {state.cart.cartItems.length > 0 &&   <Badge pill>{state.cart.cartItems.length}</Badge>}
                
                <BsEnvelope></BsEnvelope>
                <Link style={{marginRight: "32px"}} to = "/signin">Sign in</Link>
                <button className='signup' type='button'><Link  to = "/signup">Sign up</Link></button>
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