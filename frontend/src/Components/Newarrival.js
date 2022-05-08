import React,{useReducer,useContext,useEffect} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import { Store } from './Store'
import { Link } from 'react-router-dom'




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

const Newarrival = () => {
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
  return (
    <>
        <section className='new-arrival'>
            <Container>
                <Row>
                    <Col lg = {4} className = "m-auto">
                        <div className="header text-center">
                            <h2>New Arrival</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                {
                    product.map((item)=>(
                        item.arrival == "true"
                        ?
                        <Col lg = {4}>
                            <div className="arrival-item">
                                <div className="product-all position-relative">
                                    <div className="arrival-new">
                                        <span>New</span>
                                    </div>
                                    <div className="arrival-image">
                                        <img style={{width: "100%",borderRadius: "8px"}} src= {item.image} alt="arrivalimage" />
                                    </div>
                                    <div className="arrival-content text-center mt-3">
                                        <h4><Link to = {`/api/products/${item.slug}`}>{item.name}</Link></h4>
                                        <h5>${item.price}</h5>
                                    </div>       
                                </div>
                            </div>
                        </Col>
                        :
                        ""
                    ))
                }
                   
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Newarrival