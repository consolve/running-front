import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {Skeleton} from '@mui/material';
import {API_URL} from "../../../../API/URL/url"
import {useRecoilState} from 'recoil'
import {
    ShoesMain_PopularLoading,
    ShoesMain_Error,
    ShoesMain_AllLoading,
} from '../../../../state/Shoes/ShoesMain_State';
import { fetchPopularShoes } from '../../../../API/api/RunningShoes/shoes_api';

import './style.css';

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

export default function Shoes_Hot(props){

    
    const [loading1,setLoading1] = useRecoilState(ShoesMain_PopularLoading);
    const [error,setError] = useRecoilState(ShoesMain_Error);
    const [loadingall,setLoadingall] = useRecoilState(ShoesMain_AllLoading);
    const [popular,setPopular] = useState([]);

    const loading =[1,2,3,4,5,6]
    

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const FetchList = async () => {
        const _PopularShoes = await fetchPopularShoes(6);
    
        if(_PopularShoes.response){
            setError(_PopularShoes.response.status)
            props.setOpen(true)
        }
        else{
            setPopular(_PopularShoes);
        }
        
        setLoading1(false);
    }


    const navigate = useNavigate();

    const navigateToShoesDetail =(id) =>{
        navigate(`/shoes/detail/${id}`)
    }

    useEffect(() =>{
        FetchList();
    },[])


    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',mt:'50px'}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',pt:1,display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px',ml:2}}>
                        지금 인기있는 러닝화
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',color:'#9D9D9D',ml:2,mb:1,mt:0.5}}>
                        최근 많은 러너분들이 찾는 러닝화를 모아봤어요
                    </Typography>
                </Box>
            </Box>

            {/*대회정보*/}
            {
                loadingall?
                <Swiper
                    spaceBetween={-6}
                    modules={[FreeMode]}
                    slidesPerView={'auto'}
                    freeMode={{enabled: true}}	// 추가
                >
                    {
                        loading.map((item,index)=>{
                            return(
                                <SwiperSlide key = {item} className='shoes'>
                                    <Box sx={{width:'100%',height:'200px'}}>
                                        <Skeleton variant="rectangular" width={'100%'} height={"100%"} sx={{borderRadius:3}}/>
                                    </Box>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                :
                <Box sx={{width:'100%'}}>
                    {
                        popular?
                        <Box sx={{width:'100%',height:'220px',pt:1}}>
                            <Swiper
                                spaceBetween={-6}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                            >
                                {
                                    popular.map((item,index)=>{
                                        return(
                                            <SwiperSlide key={item.id} className='shoes'>
                                                <Box onClick = {()=>navigateToShoesDetail(item.id)} sx={{width:'100%',height:'220px'}}>
                                                    <Box sx={{width:'150px',height:'150px',backgroundColor:'#4F1D76',borderRadius:3,backgroundImage:`url(${API_URL}${item.shoesImg})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                                    <Box sx={{display:'flex',flexDirection:'column',ml:1,mt:1}}>
                                                        <Typography sx={{lineHeight:"20px",fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                            {item.brand}
                                                        </Typography>
                                                        <Typography sx={{lineHeight:"20px",fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                            {item.koreanName}
                                                        </Typography>
                                                        <Typography sx={{lineHeight:"20px",fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                                                            {formatNumberWithCommas(item.price)}
                                                        </Typography>
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

            {/*더보기*/}
            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'95%',flexDirection:'column',mt:1}}>
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px',height:'40px',mt:1,width:'100%',border:1,color:'#E8E8E8'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#606060'}}>
                        더보기
                    </Typography>
                </Box>
            </Box>

        </Box>    
    )
}