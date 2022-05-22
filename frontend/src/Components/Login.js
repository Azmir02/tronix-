import React,{useContext, useState} from 'react'
import { Container,Navbar ,Nav,Badge,Row,Col} from 'react-bootstrap'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { BsEnvelope ,BsBag,BsEyeSlashFill,BsEyeFill,BsInstagram,BsFacebook,BsTwitter} from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import user from '../User.png'
import lock from '../Lock.png'
import { Store } from './Store';
import Footer from './layouts/Footer';
import axios from 'axios';

const Login = () => {

    const {state,dispatch4} = useContext(Store) 
    const {cart:{cartItems}} = state
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [showpass,setPass] = useState('password')


    const {search} = useLocation()
    const redirectUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectUrl ? redirectUrl : "/"


    const navigate = useNavigate()

    
    let showPass = ()=>{
      if(showpass == 'password'){
        setPass('text')
      }
      else{
        setPass('password')
      }
    }
  


    // Login-Functionality
    const handleSubmit = async (e)=>{
      e.preventDefault()
      try{
        let userDatapost = await axios.post("/api/users",{
          email,
          password
        })
        dispatch4({
          type: "USER_LOGIN",
          payload: userDatapost
        })
        localStorage.setItem('users',JSON.stringify(userDatapost))
        navigate(redirect || "/")
      }

      catch{
        toast.error(`Give the correct information`, {
          position: "bottom-center",
          autoClose: 1000,
          limit: 1,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      }
  
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

    <section className='login-page'>
        <Container>
            <Row>
                <Col lg = {6} className = "m-auto">
                    <div className="login-form">
                        <h3>Login</h3>
                        <p>Don't have an account yet? <Link to = {`/signup?redirect=${redirect}`}>Register here!</Link></p>
                          <div className="login-body">
                          <form>
                            <div className="form-field">
                              <label>Email</label>
                              <img src={user} alt="user" />
                              <input value = {email} onChange={e=>setEmail(e.target.value)} type="email" placeholder='Example@gmail.com' />
                            </div>
                            <div className="form-field mt-4">
                              <label>Password</label>
                              <img src={lock} alt="lock" />
                              <input value = {password} onChange={e =>setPassword(e.target.value)} type= {showpass} placeholder='Password' />
                              {showpass == "text" ? <BsEyeFill className='eye' onClick={showPass}></BsEyeFill>  : <BsEyeSlashFill onClick={showPass} className='eye'></BsEyeSlashFill>}
                            </div>
                            <div className="form-button">
                              <button onClick={handleSubmit} type='suubmit'>Login</button>
                              <ToastContainer limit = {1}/>
                            </div>
                          </form>
                          </div>

                          <div className="third-party mt-5 d-flex align-items-center justify-content-center">
                            <span>Login With:</span> 
                            <button type='button'><BsInstagram></BsInstagram></button>
                            <button type='button'><BsFacebook></BsFacebook></button>
                            <button type='button'><BsTwitter></BsTwitter></button>
                          </div>
                    </div>
                    
                </Col>
            </Row>
        </Container>
    </section>
    <Footer></Footer>
    </>
  )
}

export default Login