import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import { API_URL } from '../../../../API/URL/url';
import {useRecoilState} from 'recoil';
import {
    ShoesMain_FeatureLoading,
    ShoesMain_Error,
    ShoesMain_AllLoading,
} from '../../../../state/Shoes/ShoesMain_State';
import { fetchFeatureShoes } from '../../../../API/api/RunningShoes/shoes_api';
import {fetchFeatureTag} from '../../../../API/api/RunningShoes/shoes_api'



import './style.css';

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

export default function Shoes_Feature(props){

    const [loading3,setLoading3] = useRecoilState(ShoesMain_FeatureLoading);
    const [error,setError] = useRecoilState(ShoesMain_Error);
    const [loadingall,setLoadingall] = useRecoilState(ShoesMain_AllLoading);

    const featureShoes =[];
    const [feature,setFeature] = useState([]);
    const [shoes,setShoes] = useState([]);

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }


    const loadingList = [1,2,3,4,5]

    const navigate = useNavigate();

    const navigateToShoesDetail =(id) =>{
        navigate(`/shoes/detail/${id}`)
    }

    const FetchList = async () => {
        const _FeatureTag = await fetchFeatureTag();
        let _FeatureName = [];
        
    
        if(_FeatureTag.response){
            setError(_FeatureTag.response.status)
            props.setOpen(true)
            return;
        }
        else{
            setFeature(_FeatureTag);
            _FeatureName = _FeatureTag.map((item)=>item.name);
            const featureShoes = await fetchFeatureShoes(_FeatureName);
            setShoes(featureShoes);
        }

        console.log(_FeatureName);
        setLoading3(false);
    }

    useEffect(() =>{
        FetchList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',mb:8}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',pt:1,display:'flex',alignItems:'center',justifyContent:'start'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px',ml:2}}>
                        특징별 러닝화
                    </Typography>
                </Box>
            </Box>
            {
                loadingall?
                    <Swiper
                        spaceBetween={0}
                        modules={[FreeMode]}
                        slidesPerView={'auto'}
                        freeMode={{enabled: true}}	// 추가
                    >
                        {
                            loadingList.map((item,index)=>{
                                return(
                                    <SwiperSlide key = {item} className='crew'>
                                        <Box sx={{width:'100%',height:'350px'}}>
                                            <Skeleton variant="rectangular" width={'100%'} height={"100%"} sx={{borderRadius:3}}/>
                                        </Box>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                :
                <Box sx={{width:"100%"}}>
                    {
                        shoes?
                        <Box sx={{width:'100%',height:'350px',mt:1}}>
                            <Swiper
                                spaceBetween={0}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                            >
                                {
                                    shoes.map((item,index)=>{
                                        return(
                                            <SwiperSlide className='crew'>
                                                <Box sx={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:"start"}}>
                                                    <Box sx={{width:'200px',display:'flex',flexDirection:'column',justifyContent:"center",alignItems:'start',ml:2}}>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px'}}>
                                                            {feature[index].name}
                                                        </Typography>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',color:'#9D9D9D'}}>
                                                            {feature[index].description}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{display:'flex',flexDirection:'column',width:'100%',height:'220px',justifyContent:'start',alignItems:'center',mt:1}}>
                                                    {
                                                        item.data.shoes.map((shoes,index)=>{
                                                            return(
                                                                <Box onClick ={()=>navigateToShoesDetail(shoes.id)} sx={{width:'100%',height:'100px',mt:1,backgroundColor:'#F6F6F6',borderRadius:'7px',display:'flex',alignItems:"center"}}>
                                                                    <Box sx={{width:'80px',height:'80px',backgroundColor:'#4F1D76',borderRadius:3,mx:1,backgroundImage:`url(${API_URL}${shoes.shoesImg})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                                                    <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',width:`calc(100% - 96px)`,flexDirection:'column'}}>
                                                                        <Box sx={{width:'80px'}}>
                                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px',height:"40px",lineHeight:'20px',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                                {shoes.koreanName}
                                                                            </Typography>
                                                                        </Box>

                                                                        <Box>
                                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'11px',color:'#606060'}}>
                                                                                {shoes.brand}
                                                                            </Typography>
                                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'11px',color:'#606060',mt:-0.5}}>
                                                                                {formatNumberWithCommas(shoes.price)}{"원"}
                                                                            </Typography>
                                                                        </Box>
                                                                        
                                                                    </Box>
                                                                </Box>
                                                            )
                                                        })   
                                                    }
                                                    </Box>

                                                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',flexDirection:'column',mt:1}}>
                                                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px',height:'40px',mt:1,width:'100%',border:1,color:'#E8E8E8'}}>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#606060'}}>
                                                                더보기
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
                        :
                        <Box sx={{width:"100%",height:'250px',pt:1}}>
                            error
                        </Box>
                    }
                </Box>
            }
        </Box>    
    )
}