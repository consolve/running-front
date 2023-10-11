import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import {API_URL} from "../../../API/URL/url"
import { fetchPopularContest } from '../../../API/api/Contest/contest_api';
import { Swiper, SwiperSlide } from "swiper/react";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
//모듈 필요
import { FreeMode,Grid } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

import './style.css';

const convertToCustomDate = (date) => {
    const customDate = new Date(date); // 월은 0부터 시작하므로 2는 3월을 의미합니다.
    const year = customDate.getFullYear();
    const month = (customDate.getMonth() + 1).toString().padStart(2, '0'); // 1을 더하고 두 자리로 맞춥니다.
    const day = customDate.getDate().toString().padStart(2, '0'); // 두 자리로 맞춥니다.
    return `${year}.${month}.${day}`;
};



export default function Competition(props){
    const [competition,setCompetition] = useState([]);

    const FetchList = async () => {
        const _Popularcompetitions = await fetchPopularContest(3);
    
        if(_Popularcompetitions.response){
            props.setError(_Popularcompetitions.response.status)
            props.setOpen(true)
        }
        else{
            setCompetition(_Popularcompetitions);
        }
        
        props.setLoading1(false);
    }

    const navigate = useNavigate();

    const navigateToCompetitionDetail =(id) =>{
        navigate(`/competition/detail/${id}`)
    }

    useEffect(()=>{
        FetchList();
    },[])



    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',py:'22px'}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px',ml:2}}>
                        지금 인기있는 러닝대회
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D',mr:2}}>
                        <Link to ="/schedule" style={{ textDecoration: 'none', color:'#9D9D9D' }}>
                            더보기 {'>'}
                        </Link>
                    </Typography>
                </Box>
            </Box>

            {/*대회정보*/}
            {
                props.loadingall?
                <Box sx={{width:"100%",height:'120px'}}>
                    <Skeleton variant="rectangular" width={'100%'} height={"100px"} sx={{mt:1,borderRadius:2}}/>
                </Box>
                :
                <Box sx={{width:"100%"}}>
                    {
                        competition?
                        <Box sx={{width:'100%',pt:1}}>
                            <Swiper
                                spaceBetween={-5}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                            >
                                {
                                    competition.map((item,index)=>{
                                        return(
                                            <SwiperSlide key ={index} className='competition'>
                                                <Box key ={index} onClick ={()=>navigateToCompetitionDetail(item.id)} sx={{display:'flex',alignItems:'center',backgroundColor:'#F6F6F6',borderRadius:2,height:'100px',mt:1,width:'100%'}}>
                                                    <Box sx={{width:'90px',height:'90px',backgroundColor:'#4F1D76',borderRadius:3,mx:2,backgroundImage:`url(${API_URL}${item.mainBanner.mainBanner})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'top center'}}/>
                                                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:`calc(100% - 100px)`,flexDirection:'column'  }}>
                                                        <Box sx={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:'16px'}}>
                                                                {item.name}
                                                            </Typography>
                                                            <NotificationsActiveIcon sx={{pr:2}}/>
                                                        </Box>
                                                        <Box sx={{width:'100%'}}>
                                                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                                    {item.place}
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                                    &nbsp;{'|'}&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060',mr:2}}>
                                                                    {convertToCustomDate(item.competitionTime)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{width:'100%'}}>
                                                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                                    접수기간
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                                    &nbsp;{'|'}&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                                    {convertToCustomDate(item.receptionEndTime)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{width:"100%",my:0.5}}>
                                                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                                {
                                                                    item.courseTags.map((item,index)=>{
                                                                        return(
                                                                            <Box key ={index} sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'40px',height:'15px',backgroundColor:'#4F1D76',borderRadius:3,mr:1}}>
                                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px',color:'#ffffff'}}>
                                                                                    {item.name}
                                                                                </Typography>
                                                                            </Box>
                                                                        )
                                                                })
                                                                }      
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </Box>
                        :
                        <Box>
                            error
                        </Box>
                    }
                </Box>
            }
        </Box>    
    )
}
