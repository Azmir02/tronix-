import React,{useReducer,useContext,useEffect, useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom';


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
                productleft: action.payload,
                productright: action.payload,
                productbottom: action.payload

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

const Featured = () => {

    
    const [{productleft,productright,productbottom}, dispatch] = useReducer(reducer, {
        isLoading: false,
        productleft: [],
        productright: [],
        productbottom: [],
        error: ''
    });

    let [discount,setDiscount] = useState("")
    let [discount2,setDiscount2] = useState("")
    let [discount3,setDiscount3] = useState("")
    let [maindiscount,setMaindiscount] = useState("")
    let [maindiscount2,setMaindiscount2] = useState("")
    let [maindiscount3,setMaindiscount3] = useState("")

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
        productleft.map((item)=>{
            setDiscount(item.offer);
            let beforeoffer = (item.price * discount) / 100
            let afteroffer = item.price - beforeoffer
            setMaindiscount(afteroffer);
        })
        productright.map((item)=>{
            setDiscount2(item.offer);
            let beforeoffer2 = (item.price * discount2) / 100
            let afteroffer2 = item.price - beforeoffer2
            setMaindiscount2(afteroffer2);
        })
        productbottom.map((item)=>{
            setDiscount3(item.offer);
            let beforeoffer3 = (item.price * discount3) / 100
            let afteroffer3 = item.price - beforeoffer3
            setMaindiscount3(afteroffer3);
        })
       
    })
     
    console.log();

  



  return (
   <>
    <section className='product-feature'>
            <Container>
                <Row>
                    <Col lg = {4} className = "m-auto">
                        <div className="header text-center">
                            <h2>Featured Products</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {
                        productleft.map((item)=>(
                            item.left === "true"
                            &&
                            <Col lg = {6}>
                                <div className="left-features text-center">
                                    <div className="feature-name">
                                        <h4><Link to = {`/api/products/name/${item.slug}`}>{item.name}</Link></h4>
                                        {maindiscount ? <del>{item.price}</del> : <p>{item.price}</p>}
                                        {maindiscount ? <p>{maindiscount.toFixed(2)}</p> : ""}
                                    </div>
                                    <div className="featured-image">
                                        <img src= {item.image} alt="featuredimage" />
                                    </div>
                                    "Countdown"
                                </div>
                            </Col>
                        ))
                    }
                     <Col lg = {6}>
                     {
                        productright.map((item)=>(
                            item.right === "true"
                            &&
                            <Row>
                                <Col lg = {12}>
                                    <div className="right-featured d-flex align-items-center">
                                        <div className="right-featured-image">
                                            <img src={item.image} alt="rightfeaturedimage" />
                                        </div>
                                        <div className="right-featured-content ps-4">
                                            <span>Limited offer</span>
                                            <div className="feature-name">
                                                <h4><Link to = {`/api/products/name/${item.slug}`}>{item.name}</Link></h4>
                                                {maindiscount2 ? <del>{item.price}</del> : <p>{item.price}</p>}
                                                {maindiscount2 ? <p>{maindiscount2.toFixed(2)}</p> : ""}
                                            </div>
                                            "Countdown"
                                        </div>
                                        
                                    </div>
                                </Col>
                            </Row>
                        ))
                    }       
                     {
                        productbottom.map((item)=>(
                            item.bottom === "true"
                            &&
                            <Row>
                                <Col lg = {12}>
                                    <div className="right-featured d-flex align-items-center">
                                        <div className="right-featured-image">
                                            <img src={item.image} alt="rightfeaturedimage" />
                                        </div>
                                        <div className="right-featured-content ps-4">
                                            <span>Limited offer</span>
                                            <div className="feature-name">
                                             <h4><Link to = {`/api/products/name/${item.slug}`}>{item.name}</Link></h4>
                                                {maindiscount3 ? <del>{item.price}</del> : <p>{item.price}</p>}
                                                {maindiscount3 ? <p>{maindiscount3.toFixed(2)}</p> : ""}
                                            </div>
                                            "Countdown"
                                        </div>
                                        
                                    </div>
                                </Col>
                            </Row>
                        ))
                    }       
                    </Col>              
                           
                
                </Row>
            </Container>
        </section>
   </>
  )
}

export default Featured