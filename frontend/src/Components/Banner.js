import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {

    const [bannerslider,setBannerslider] = useState([])


    useEffect(()=>{
        const bannerslider = async ()=>{
            let bannerInfo = await axios.get("/api/home")
            setBannerslider(bannerInfo.data);
        }
        bannerslider()
    },[])
  return (
    <>
        <section id='banner'>
        
            <Container>
                <Row>
                    <Col lg = {12}>
                        <div className="bannerslider">
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                              }}
                              pagination={{
                                clickable: true,
                                dynamicBullets: true,
                              }}
                              navigation={true}
                              speed={1000}
                              modules={[Autoplay, Pagination, Navigation]}
                              className="mySwiper"
                            >
                                {
                                    bannerslider.map((item)=>(
                                        <SwiperSlide>
                                            <div className="banner-iamges position-relative">
                                                <img src={item.image} alt="" />
                                                <div className="banner-content position-absolute">
                                                    <h1>{item.title}</h1>
                                                    <p>{item.para}</p>
                                                    <div className="banner-button">
                                                        <button type='button'>Shop Now</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                    
                         </Swiper>
                        </div>
                    </Col>
                </Row>
            </Container>
            
        </section>
    </>
  )
}

export default Banner