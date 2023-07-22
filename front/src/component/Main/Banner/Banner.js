import {Box,Typography,Button} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../../style/fonts/pretendardvariable.css"
import { useNavigate } from "react-router-dom";

//https://swiperjs.com/react#installation
//MIT License
import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { Autoplay } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/autoplay';
import './style.css';

export default function Main(){

    useEffect(() =>{

    },[]);

    return(
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#4F1D76',height:'250px',flexDirection:'column',width:'100%'}}>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{ delay: 4000 }}	// 추가
            >
                <SwiperSlide>
                    Slide 1
                </SwiperSlide>
                <SwiperSlide>
                    Slide 2
                </SwiperSlide>
                <SwiperSlide>
                    Slide 3
                </SwiperSlide>
                <SwiperSlide>
                    Slide 4
                </SwiperSlide>
            </Swiper>
        </Box>    
    )
}