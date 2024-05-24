import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import ShareIcon from '@mui/icons-material/Share';
import {API_URL} from "../../../../API/URL/url"

import { Swiper, SwiperSlide } from "swiper/react";


import 'swiper/css';
import 'swiper/css/scrollbar';

import './style.css';

// import required modules
import { Scrollbar } from 'swiper/modules';

export default function Competition_Detail_Banner(props){
    const ref = useRef(null);

    useEffect(() =>{
        ref.current.style.setProperty('height', '0%');

        ref.current.style.setProperty('height', '350px');

    },[])

    return(
        <Box ref = {ref} sx={{position:'relative',zIndex:0,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'primary.main',flexDirection:'column',height:'350px'}}>
            {
                props.shoes.shoesImg?
                    <Swiper
                        spaceBetween={0}
                        scrollbar={{
                            hide: true,
                        
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper"
                        style={{overflow:'hidden'}}
                    >
                        {
                            props.shoes.shoesImg.map((item,index)=>{
                                return(
                                    <SwiperSlide key={index} style={{width:'100%'}}>
                                        <Box sx={{position:'relative',width:"100%",height:"100%",backgroundColor:'#f4f4f4'}}>
                                            <img src={`${API_URL}${item.url}`} style={{width:'100%',height:'100%',objectFit:'contain',objectPosition:'center'}}/>
                                        </Box>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                :
                    <Box sx={{backgroundColor:"primary.main",width:'100%',height:'100%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
            }
        </Box>    
    )
}