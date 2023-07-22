import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../../../style/fonts/pretendardvariable.css"
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode,Grid } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

import './style.css';

export default function Competition(){

    const competition_list = [
        {
            id:2,
            title:'2023 서울 마라톤대회',
            date:{
                year:'2023',
                month:'04',
                day:'02'
            },
            location:'서울 노원구',
            register:{
                start:'2023.04.05',
                end:'05.21'
            },
            distance: '10KM'
        },
        {
            id:3,
            title:'2023 서울 마라톤대회',
            date:{
                year:'2023',
                month:'04',
                day:'02'
            },
            location:'서울 노원구',
            register:{
                start:'2023.04.05',
                end:'05.21'
            },
            distance: '10KM'
        },
        {
            id:4,
            title:'2023 서울 마라톤대회',
            date:{
                year:'2023',
                month:'04',
                day:'02'
            },
            location:'서울 노원구',
            register:{
                start:'2023.04.05',
                end:'05.21'
            },
            distance: '10KM'
        },
        {
            id:5,
            title:'2023 서울 마라톤대회',
            date:{
                year:'2023',
                month:'04',
                day:'02'
            },
            location:'서울 노원구',
            register:{
                start:'2023.04.05',
                end:'05.21'
            },
            distance: '10KM'
        }
    ]

    const [show_competition,setShow_Competition] = useState([
        
    ]);

    const FetchCompetitionList = async () =>{
        const list = competition_list;
        setShow_Competition(list);     
    }
    
    useEffect(() =>{
        FetchCompetitionList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',backgroundColor:'#ffffff',height:'400px',flexDirection:'column',width:'100%'}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',pt:4,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'28px',ml:2}}>
                        지금 인기있는 러닝대회
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px',color:'#8E8D8D',mr:2}}>
                        더보기 {'>'}
                    </Typography>
                </Box>
            </Box>

            {/*대회정보*/}
            <Box sx={{width:'100%',height:'300px',pt:2}}>
                <Swiper
                    modules={[FreeMode]}
                    slidesPerView={'auto'}
                    freeMode={{enabled: true}}	// 추가
                >
                    {show_competition.map((item,index)=>{
                        const slide_list = [];
                        index*=2;

                        slide_list.push(show_competition[index]);
                        slide_list.push(show_competition[index+1]);

                        if(index >= show_competition.length){
                            return;
                        }
                        return(
                        <SwiperSlide key ={index}>
                            <Box  sx={{display:'flex',justifyContent:'start',alignItems:'start',width:'310px',height:'100%',flexDirection:'column',ml:1}}>
                            {slide_list.map((item,index)=>(
                                    <Box key = {show_competition[index].id} sx={{width:'330px',height:'280px',mt:2,backgroundColor:'#F6F6F6',borderRadius:3,display:'flex',justifyContent:'start',alignItems:'center'}}>
                                        <Box sx={{width:'100px',height:'100px',backgroundColor:'#4F1D76',borderRadius:3,mx:2}}/>
                                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'190px',flexDirection:'column'}}>
                                            <Box sx={{display:'flex',width:'100%',justifyContent:'start',alignItems:'center'}}>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                                                    {show_competition[index].title}
                                                </Typography>
                                            </Box>
                                            <Box sx={{width:'100%'}}>
                                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060',mr:2}}>
                                                        {show_competition[index].date.year}
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                        {show_competition[index].location}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{width:'100%'}}>
                                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                        접수마감 :
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                        {show_competition[index].register.start}
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                        ~
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                        {show_competition[index].register.end}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{width:'100%',mt:2}}>
                                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'40px',height:'15px',backgroundColor:'#4F1D76',borderRadius:3,mr:1}}>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px',color:'#ffffff'}}>
                                                            10KM
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'40px',height:'15px',backgroundColor:'#4F1D76',borderRadius:3,mr:1}}>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px',color:'#ffffff'}}>
                                                            10KM
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                            ))}
                        </Box>
                        </SwiperSlide>   
                        )
                    })}
                </Swiper>
            </Box>
        </Box>    
    )
}