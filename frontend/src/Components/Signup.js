import React,{useContext, useState,useEffect} from 'react'
import { Container,Navbar ,Nav,Badge,Row,Col} from 'react-bootstrap'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { BsEnvelope ,BsBag,BsEyeFill,BsEyeSlashFill} from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import user from '../User.png'
import lock from '../Lock.png'
import { Store } from './Store';
import Footer from './layouts/Footer';
import axios from 'axios';

const Signup = () => {

    const {state,dispatch4,state4} = useContext(Store) 
    const {cart:{cartItems}} = state


    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmpassword,setConfirmpassword] = useState("")
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
    
      
      let formvalidation = ({email,password,confirmpassword})=>{

          if(!email || !password || !confirmpassword){
            toast.error(`Please register Now`, {
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
          else if(password !== confirmpassword){
            toast.error(`Password doesn't matched`, {
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
          else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)){
            toast.error(`Password must be have stronger`, {
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
          else{
              return true
          }
          
          
      }


    // Login-Functionality
    const handleSubmit = async (e)=>{
      e.preventDefault()
      if(formvalidation({email,password,confirmpassword})){
        let {userSingup} = await axios.post("/api/users/loaduser",{
            name,
            email,
            password,
            confirmpassword
          })
          navigate("/signin")
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
                        <h3>Create Account</h3>
                        <p>Already have an account? <Link to = {`/signin?redirect=${redirect}`}>Please, login!</Link></p>
                          <div className="login-body">
                          <form>
                            <div className="form-field">
                              <label>Name</label>
                              <img src={user} alt="user" />
                              <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder='Username' />
                            </div>

                            <div className="form-field mt-4">
                              <label>Email</label>
                              <img src={user} alt="user" />
                              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder='Example@gmail.com' />
                            </div>

                            <div className="form-field mt-4">
                              <label>Password</label>
                              <img src={lock} alt="lock" />
                              <input  value={password} onChange={e =>setPassword(e.target.value)} type= {showpass} placeholder='Password' />
                              {showpass == "text" ? <BsEyeFill className='eye' onClick={showPass}></BsEyeFill>  : <BsEyeSlashFill onClick={showPass} className='eye'></BsEyeSlashFill>}
                            </div>

                            <div className="form-field mt-4">
                              <label>Confirm Password</label>
                              <img src={lock} alt="lock" />
                              <input value={confirmpassword} onChange={e =>setConfirmpassword(e.target.value)} type="password" placeholder='Confirm password' />
                            </div>
                            <div className="form-button">
                              <button onClick={handleSubmit} type='suubmit'>Register</button>
                              <ToastContainer limit = {1}/>
                            </div>
                          </form>
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

export default Signup