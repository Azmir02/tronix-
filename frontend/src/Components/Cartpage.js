import axios from 'axios';
import React,{useContext, useEffect, useState,useReducer} from 'react'
import { Col, Container, Row,Navbar,Nav,Breadcrumb,Badge,Modal,Button} from 'react-bootstrap'
import { BsPlus,BsChevronRight,BsDash,BsEnvelope ,BsX,BsBag,BsArrowRightShort} from "react-icons/bs";
import { useParams,useNavigate } from 'react-router-dom'
import cuponcode from '../cuponcode.png'
import { Link } from 'react-router-dom';
import { Store } from './Store';
import Footer from './layouts/Footer';
import Errorpage from './Errorpage';
import Processing from './Processing';




const Cartpage = () => {
    const {state,dispatch} = useContext(Store) 
    const {cart:{cartItems}} = state
    const navigate = useNavigate()

    //modal
    const [show, setShow] = useState(false);
    const [totalprice,setTotalprice] = useState("")
    const [cupons,setCupons] = useState("")
    const [getcupons,setGetcupons] = useState("")
    const [maindiscount,setMaindiscount] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    //for quantity update
    const quantityUpgrade = (item,quantity)=>{
        dispatch({
        type: "ADD_TO_CART",
        payload:{...item,quantity}
        })

    }

    useEffect(()=>{
      const a = async()=>{
        let cupon = await axios.get("/api/products/cupon")
        setGetcupons(cupon.data);
      }
      a()
      try{
        const findcupon = getcupons.find((item)=> item.cupon === cupons)
        if(findcupon){
          let cupondiscount = (totalprice * findcupon.discount)/100
          let afterdiscount = totalprice - cupondiscount
          setMaindiscount(afterdiscount);
        }
        else{
          console.log("hoy nai");
        }
      }
      catch{
        console.log("nai");
      } 

      let totalPrice = cartItems.reduce((accumulator,currentvalue)=> accumulator + currentvalue.quantity * currentvalue.price,0)
      setTotalprice(totalPrice)
    },[cartItems,maindiscount,totalprice])

  //for delete cart
  const handleDelete = (item)=>{
    dispatch({
        type: "REMOVE_CART",
        payload: item
    })
  }
  //for cuponcode
  const handleCupon = ()=>{
    try{
      const findcupon = getcupons.find((item)=> item.cupon === cupons)
      if(findcupon){
        let cupondiscount = (totalprice * findcupon.discount)/100
        let afterdiscount = totalprice - cupondiscount
        setMaindiscount(afterdiscount);
      }
      else{
        console.log("hoy nai");
      }
    }
    catch{
      console.log("nai");
    }    

    setShow(false)
  }


  //Checkout
  const handleCheckout = ()=>{
    navigate("/signin?redirect=/shipping")
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
        <Breadcrumb className='breadcumb mt-3'>
                <h6>
                  <Link to = "/">Home</Link>
                  <BsArrowRightShort></BsArrowRightShort>
                  <span>My Cart</span>
                </h6>
        </Breadcrumb>
   </Container>
   
   {/*Cart Body*/}
   <Container>
       <Row>
           <Col lg = {6} className = "m-auto">
               <div className="cart-header text-center">
                   <h1>My Cart</h1>
               </div>
               <Processing step1 = "true"></Processing>
           </Col>
       </Row>
       <Row className='my-5'>
           <Col lg = {8}>
               <div className="cart-items">
                   <div className="main-carts-body">
                   {
                       cartItems.length === 0
                       ?
                        <Errorpage></Errorpage>
                       :
                       cartItems.map((item)=>(
                            <div className='inner-carts d-flex align-items-center justify-content-between'>
                                <div className="item-image">
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="item-details">
                                    <h4><Link to = {`/api/products/${item.slug}`}>{item.name}</Link></h4>
                                    <p>${item.price}</p>
                                    <div className="quantity-inc_dec mt-5">
                                        <div className="quantity-part w-50">
                                            
                                                <button type='button' onClick={()=>quantityUpgrade(item,item.quantity == 0 ? 0 : item.quantity -1)}><BsDash></BsDash></button>

                                                <span className='quantity-count'>{item.quantity}</span>
                                                
                                                <button type='button' onClick={()=>quantityUpgrade(item,item.quantity + 1)}><BsPlus></BsPlus></button>
                                            </div>
                                        </div>
                                </div>
                                <div className="item-delete">
                                    <button onClick={()=>handleDelete(item)} type='button'><BsX></BsX></button>
                                </div>
                            </div>
                       ))

                   }
                   </div>
               </div>
           </Col>
           <Col lg = {4}>
             <div className="cupon-option mt-4">
                   <div  onClick={handleShow} className="cupon d-flex align-items-center justify-content-between">
                      <img src={cuponcode} alt="" />
                      <span>Have a cupon code?</span>
                      <BsChevronRight></BsChevronRight>
                   </div>
                   <div className="summery">
                     <h5>Summery</h5>
                     <div className="summery-pricing mt-5 d-flex justify-content-between align-items-center">
                          <div className="total w-50">
                            <p>Total</p>
                          </div>
                          <div className="discount-rate text-end w-50">
                            {maindiscount ? <h5>${maindiscount.toFixed()}</h5> : ""}
                            {maindiscount ? <del><h5>${totalprice}</h5></del> : <h5>${totalprice}</h5>}
                          </div>
                     </div>
                      <div className="checkout-button text-center mt-5">
                        <button onClick={handleCheckout} type='submit'>Checkout</button>
                        <Link to = "/">Continue Shopping</Link>
                      </div> 
                   </div>
                   
             </div>
           </Col>
       </Row>
   </Container>


   {/*For modal*/}
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Apply for cupon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-field">
                <input onChange={e=>setCupons(e.target.value)} type="text" placeholder='Enter Cupon'/>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick = {handleCupon} variant="primary" >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    {/*Footer part*/}
    <Footer></Footer>
    </>
  )
}

export default Cartpage