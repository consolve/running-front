import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './style.css';

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

export default function Crew(){

    const Crew_List = [
        {
            location:'수도권',
            crew:[{
                name:'00Runners',
                regular:'매주 금요일',
                time:'PM 7:00',
                tag:["서울","전역"]
            },
            {
                name:'00Runners',
                regular:'매주 금요일',
                time:'PM 7:00',
                tag:["서울","전역"]
            },
            ]
        },
        {
            location:'충청권',
            crew:[{
                name:'00Runners',
                regular:'매주 금요일',
                time:'PM 7:00',
                tag:["충청","전역"]
            },
            {
                name:'00Runners',
                regular:'매주 금요일',
                time:'PM 7:00',
                tag:["충청","전역"]
            },
            ]
        },
    ]

    const navigate = useNavigate();

    const navigateToCompetitionDetail =() =>{
        navigate("/comp_detail")
    }

    const [crews,setCrews] = useState([
        
    ]);

    const FetchCrewsList = async () =>{
        const list = Crew_List;
        setCrews(list);     
    }
    
    useEffect(() =>{
        FetchCrewsList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',pt:6,display:'flex',alignItems:'center',justifyContent:'start'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px',ml:2}}>
                        혼자말고, 크루와 함께해요
                    </Typography>
                </Box>
            </Box>

            {/*대회정보*/}
            <Box sx={{width:'100%',height:'350px',mt:1}}>
                <Swiper
                    spaceBetween={0}
                    modules={[FreeMode]}
                    slidesPerView={'auto'}
                    freeMode={{enabled: true}}	// 추가
                >
                    {
                        Crew_List.map((item,index)=>{
                            return(
                                <SwiperSlide className='crew'>
                                    <Box sx={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:"start"}}>
                                        <Box sx={{width:'200px',display:'flex',flexDirection:'column',justifyContent:"center",alignItems:'start',ml:2}}>
                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px'}}>
                                                {item.location}
                                            </Typography>
                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',color:'#9D9D9D'}}>
                                                총 {item.crew.length}개의 러닝크루가 있어요
                                            </Typography>
                                        </Box>

                                        <Box sx={{width:'100%',height:'100px',mt:1,backgroundColor:'#F6F6F6',borderRadius:'7px',display:'flex',alignItems:"center"}}>
                                                <Box sx={{width:'80px',height:'80px',backgroundColor:'#4F1D76',borderRadius:3,mx:1}}/>
                                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',width:`calc(100% - 96px)`,flexDirection:'column'}}>
                                                    <Box sx={{width:'80px'}}>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px',lineHeight:'normal'}}>
                                                            {item.crew[0].name}
                                                        </Typography>
                                                    </Box>

                                                    <Box>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'11px',color:'#606060'}}>
                                                            {item.crew[0].regular}
                                                        </Typography>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'11px',color:'#606060',mt:-0.5}}>
                                                            {item.crew[0].time}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{display:'flex',mt:0.5}}>
                                                        {
                                                            item.crew[0].tag.map((item,index)=>{
                                                                return(
                                                                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'30px',height:'13px',backgroundColor:'#4F1D76',borderRadius:3,mr:0.5}}>
                                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'8px',color:'#ffffff',lineHeight:'10px'}}>
                                                                            {item}
                                                                        </Typography>
                                                                    </Box>
                                                                )
                                                            })
                                                        }
                                                    </Box>

                                                </Box>
                                            </Box>
                                            
                                            <Box sx={{width:'100%',height:'100px',mt:2,backgroundColor:'#F6F6F6',borderRadius:'7px',display:'flex',alignItems:"center"}}>
                                                <Box sx={{width:'80px',height:'80px',backgroundColor:'#4F1D76',borderRadius:3,mx:1}}/>
                                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',width:`calc(100% - 96px)`,flexDirection:'column'}}>
                                                    <Box sx={{width:'80px'}}>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px',lineHeight:'normal'}}>
                                                            {item.crew[1].name}
                                                        </Typography>
                                                    </Box>

                                                    <Box>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'11px',color:'#606060'}}>
                                                            {item.crew[1].regular}
                                                        </Typography>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'11px',color:'#606060',mt:-0.5}}>
                                                            {item.crew[1].time}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{display:'flex',mt:0.5}}>
                                                        {
                                                            item.crew[1].tag.map((item,index)=>{
                                                                return(
                                                                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'30px',height:'13px',backgroundColor:'#4F1D76',borderRadius:3,mr:0.5}}>
                                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'8px',color:'#ffffff',lineHeight:'10px'}}>
                                                                            {item}
                                                                        </Typography>
                                                                    </Box>
                                                                )
                                                            })
                                                        }
                                                    </Box>

                                                </Box>
                                            </Box>

                                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'95%',flexDirection:'column',mt:1}}>
                                            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px',height:'40px',mt:1,width:'100%',border:1,color:'#E8E8E8'}}>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#606060'}}>
                                                    다른 꿀팁보기
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </Box>
        </Box>    
    )
}