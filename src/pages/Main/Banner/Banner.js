import {Box,Typography,Button} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../../style/fonts/pretendardvariable.css"
import { API_URL } from '../../../API/URL';
//https://swiperjs.com/react#installation
//MIT License
import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { Autoplay } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/autoplay';
import './style.css';

import { getBannerImage } from '../../../API/api/Contest/contest_api';

import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function Main(){

    const [bannerImage,setBannerImage] = useState([]);

    const FetchBanner = async () => {
        const _response = await getBannerImage();
        if(_response.response){
            switch(_response.response.status){
                case 404:
                    break;
                default:
                    break;
            }
        }
        else{
            setBannerImage(prev=>prev=_response);
        }
    }


    useEffect(() =>{
        FetchBanner();
    },[]);

    return(
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'480px',flexDirection:'column',width:'100%',mt:'60px'}}>
           <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                spaceBetween={-15}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="swiper-banner"
            >
                {
                    bannerImage.map((image,index) => {
                        return(
                        <SwiperSlide className="swiper-slide-banner" key={index}>
                            <img className = "swiper-slide-image" src={`${API_URL}${image.url}`} />
                        </SwiperSlide>
                        )
                    })
                }
                
            </Swiper>
        </Box>    
    )
}