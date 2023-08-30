import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {API_URL} from "../../../API/URL/url"
import Skeleton from '@mui/material/Skeleton';
import { fetchPopularShoes } from '../../../API/api/RunningShoes/shoes_api';

import './style.css';

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

export default function Shoes(props){
    const loadingcomponent =[1,2,3,4,5,6];

    const [shoes,setShoes] = useState([]);

    const FetchList = async () => {
        const _PopularShoes = await fetchPopularShoes(6);
    
        if(_PopularShoes.response){
            props.setError(_PopularShoes.response.status)
            props.setOpen(true)
        }
        else{
            setShoes(_PopularShoes);
        }
        
        props.setLoading2(false);
    }

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

    const navigate = useNavigate();

    const navigateToShoesDetail =(index) =>{
        navigate(`/shoes/detail/${index}`)
    }
    
    useEffect(() =>{
        FetchList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',mt:2}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',pt:1,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px',ml:2}}>
                        지금 인기있는 러닝화
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D',mr:2}}>
                        <Link to ="/shoes" style={{ textDecoration: 'none', color:'#4F1D76' }}>
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
                                    <Skeleton variant="rectangular" width={'100%'} height={"100%"} sx={{mt:1,borderRadius:2}}/>
                                </Box>
                            </SwiperSlide>   
                            )
                        })}
                    </Swiper>
                </Box>
                :
                <Box sx={{width:'100%'}}>
                    {
                        shoes?
                        <Box sx={{width:'100%',height:'250px',pt:1}}>
                            <Swiper
                                spaceBetween={-6}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                            >
                                {
                                    shoes.map((item,index)=>{
                                        return(
                                            <SwiperSlide className='shoes'>
                                                <Box onClick={()=>navigateToShoesDetail(item.id)} sx={{width:'100%',height:'250px'}}>
                                                    <Box sx={{width:'150px',height:'150px',backgroundColor:'#4F1D76',borderRadius:3,backgroundImage:`url(${API_URL}${item.shoesImg})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'top center'}}/>
                                                    <Box sx={{display:'flex',flexDirection:'column',ml:1,mt:1}}>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px'}}>
                                                            {item.brand}
                                                        </Typography>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                            {item.koreanName}
                                                        </Typography>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
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
                        <Box>
                            error
                        </Box>
                    }
                </Box>
            }
        </Box>    
    )
}