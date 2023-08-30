import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import {API_URL} from "../../../API/URL/url"
import { fetchPopularContest } from '../../../API/api/Contest/contest_api';

import { Swiper, SwiperSlide } from "swiper/react";
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
    const [competition1,setCompetition1] = useState([]);
    const [competition2,setCompetition2] = useState([]);

    const FetchList = async () => {
        const _Popularcompetitions = await fetchPopularContest(6);
    
        if(_Popularcompetitions.response){
            props.setError(_Popularcompetitions.response.status)
            props.setOpen(true)
        }
        else{
            setCompetition1(_Popularcompetitions.filter((obj,index) => index % 2 === 0));
            setCompetition2(_Popularcompetitions.filter((obj,index) => index % 2 === 1));
        }
        
        props.setLoading1(false);
    }

    const Detail = (props) =>{
        return(
            <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',width:'100%',height:'100%',flexDirection:'column'}}>
                <Box onClick={()=>navigateToCompetitionDetail(props.item.id)} key = {props.item.id} sx={{width:'270px',height:'110px',mt:2,backgroundColor:'#F6F6F6',borderRadius:3,display:'flex',justifyContent:'start',alignItems:'center'}}>
                    <Box sx={{width:'90px',height:'90px',backgroundColor:'#4F1D76',borderRadius:3,mx:1,backgroundImage:`url(${API_URL}${props.item.mainBanner.mainBanner})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'top center'}}/>
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'160px',flexDirection:'column'}}>
                        <Box sx={{display:'flex',width:'100%',justifyContent:'start',alignItems:'center'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px'}}>
                                {props.item.name}
                            </Typography>
                        </Box>
                        <Box sx={{width:'100%'}}>
                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'10px',color:'#606060',mr:2}}>
                                    {convertToCustomDate(props.item.competitionTime)}
                                </Typography>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'10px',color:'#606060'}}>
                                    {props.item.place}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{width:'100%'}}>
                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'10px',color:'#606060'}}>
                                    접수마감 :
                                </Typography>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'10px',color:'#606060'}}>
                                    {convertToCustomDate(props.item.receptionStartTime)}
                                </Typography>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'10px',color:'#606060'}}>
                                    ~
                                </Typography>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'10px',color:'#606060'}}>
                                    {convertToCustomDate(props.item.receptionEndTime)}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{width:'100%',mt:1}}>
                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                {
                                    props.item.courseTags.map((item,index)=>{
                                        return(
                                            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'30px',height:'15px',backgroundColor:'#4F1D76',borderRadius:3,mr:1}}>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'8px',color:'#ffffff'}}>
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
            </Box>
        )
    }
    
    const loadingcomponent = [1,2,3];

    const navigate = useNavigate();

    const navigateToCompetitionDetail =(id) =>{
        navigate(`/competition/detail/${id}`)
    }

    useEffect(()=>{
        FetchList();
        props.setLoading1(true);
    },[])



    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',pt:4,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px',ml:2}}>
                        지금 인기있는 러닝대회
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D',mr:2}}>
                        <Link to ="/schedule" style={{ textDecoration: 'none', color:'#4F1D76' }}>
                            더보기 {'>'}
                        </Link>
                    </Typography>
                </Box>
            </Box>

            {/*대회정보*/}
            {
                props.loadingall?
                <Box sx={{width:'100%',height:'260px',pt:1}}>
                    <Swiper
                        spaceBetween={0}
                        modules={[FreeMode]}
                        slidesPerView={'auto'}
                        freeMode={{enabled: true}}	// 추가
                    >
                        {loadingcomponent.map((item,index)=>{
                            return(
                            <SwiperSlide key ={index} className="competition">
                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',width:'100%',height:'100%',flexDirection:'column'}}>
                                    <Skeleton variant="rectangular" width={'100%'} height={"100px"} sx={{mt:1,borderRadius:2}}/>

                                    <Skeleton variant="rectangular" width={'100%'} height={"100px"} sx={{mt:1,borderRadius:2}}/>
                                </Box>
                            </SwiperSlide>   
                            )
                        })}
                    </Swiper>
                </Box>
                :
                <Box sx={{width:"100%"}}>
                    {
                        competition1&&competition2?
                        <Box sx={{width:'100%',height:'260px',pt:1}}>
                            <Swiper
                                spaceBetween={0}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                            >
                                {competition1.map((item,index)=>{
                                    return(
                                    <SwiperSlide key ={index} className="competition">
                                        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',width:'100%',height:'100%',flexDirection:'column'}}>
                                        <Detail item = {competition1[index]}/>

                                        {
                                            competition2[index]?
                                            <Detail item = {competition2[index]}/>
                                            :
                                            ""
                                        }
                                        </Box>
                                    </SwiperSlide>   
                                    )
                                })}
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
