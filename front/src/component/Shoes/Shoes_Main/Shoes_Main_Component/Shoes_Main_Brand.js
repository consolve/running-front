import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { fetchBrandShoes,fetchBrandTag } from '../../../../API/api/RunningShoes/shoes_api';
import Skeleton from '@mui/material/Skeleton';
import { API_URL } from '../../../../API/URL';
import {useRecoilState} from 'recoil';
import {
    ShoesMain_BrandLoading,
    ShoesMain_Error,
    ShoesMain_AllLoading,
} from '../../../../state/Shoes/ShoesMain_State';

import './style.css';

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

export default function Shoes_Brand(props){


    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }


    const [brand, setBrand] = useState(0);
    const [brandtags,setBrandTags] = useState([]);
    const [loading,setLoading] = useRecoilState(ShoesMain_BrandLoading);
    const [brandloading,setBrandLoading] = useState(true);
    const [error,setError] = useRecoilState(ShoesMain_Error);
    const [loadingall,setLoadingall] = useRecoilState(ShoesMain_AllLoading);

    const loadinglist = [1,2,3,4,5,6]

    const handleToggleBrand = (value) => {
        if(loading){
            return;
        }
        else{
            setBrand((prev)=>prev=value)   
        }
    };
    

    const navigate = useNavigate();

    const navigateToShoesDetail =(id) =>{
        navigate(`/shoes/detail/${id}`)
    }

    const [shoes,setShoes] = useState([]);

    const FetchShoesBrand = async () =>{
        const _BrandTags = await fetchBrandTag();
        console.log(_BrandTags)

        if(_BrandTags.response){
            props.setError(_BrandTags.response.status);
            props.setOpen(true);
        }
        else{
            return _BrandTags;
        }

        setBrandLoading(false);
    }


    const FetchShoesList = async (value) =>{
        const _BrandShoes = await fetchBrandShoes(value);
        console.log(_BrandShoes)

        if(_BrandShoes.response){
            props.setError(_BrandShoes.response.status);
            props.setOpen(true);
        }
        else{
            setShoes(_BrandShoes);
        }

        setLoading(false);   
    }

    async function FirstFetchList(){
        const _BrandTags = await FetchShoesBrand();
        const _BrandShoes = await fetchBrandShoes(_BrandTags[0].name);

        if(_BrandShoes.response){
            props.setError(_BrandShoes.response.status);
            props.setOpen(true);
        }
        else if(_BrandTags.response){
            props.setError(_BrandTags.response.status);
            props.setOpen(true);
        }
        else{
            setBrandTags(_BrandTags);
            setShoes(_BrandShoes);
        }

        setLoading(false); 
        setBrandLoading(false);
    }

    useEffect(() =>{
        setLoading(true);
        setBrandLoading(true)
        FirstFetchList();
    },[])


    useEffect(() =>{
        setLoading(true)
        if(brandtags.length === 0){
            return;
        }
        else{
            FetchShoesList(brandtags[brand].name)
        }
    },[brand])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',mt:2}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',pt:1,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px',ml:2}}>
                        브랜드별 러닝화
                    </Typography>
                </Box>
            </Box>
            
            {
                brandloading?
                <Box sx={{width:'100%',mt:1,mb:2}}>
                    {/*필터*/}
                    <Swiper
                        spaceBetween={-6}
                        modules={[FreeMode]}
                        slidesPerView={'auto'}
                        freeMode={{enabled: true}}	// 추가
                    >
                        {
                            loadinglist.map((item,index)=>{
                                return(
                                    <SwiperSlide key = {item} className="tag-loading swiper-left-margin-16">
                                        <Box sx={{width:'100%',height:'22px',display:"flex",alignItems:"center"}}>
                                            <Skeleton variant="rectangular" width={'50px'} height={"22px"} sx={{borderRadius:3}}/>
                                        </Box>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </Box>
                :
                <Box sx={{width:"100%"}}>
                    {
                        brandtags?
                        <Box sx={{width:'100%',mt:1,mb:2}}>
                            <Swiper
                                spaceBetween={-16}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                            >
                            
                                {
                                brandtags.map((item,index)=>{
                                    return(
                                        <SwiperSlide key ={index} className='swiper-width-auto swiper-left-margin-16'>
                                            <Box onClick = {() =>handleToggleBrand(index)} backgroundColor = {brand === index?'#4F1D7642':"#E8E8E8"} sx={{height:'22px',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'3px',mx:0.5}}>
                                                <Typography color = {brand === index?"#4F1D76":"#000000"} sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px',mx:1}}>
                                                    {item.name}
                                                </Typography>
                                            </Box>
                                        </SwiperSlide>
                                    )
                                })
                                }
        
                            </Swiper>
                        </Box>
                        :
                        ""
        
                    }
                </Box>

            }

            {
                loading||loadingall?
                <Box sx={{width:"100%"}}>

                    <Swiper
                        spaceBetween={-6}
                        modules={[FreeMode]}
                        slidesPerView={'auto'}
                        freeMode={{enabled: true}}	// 추가
                    >
                        {
                            loadinglist.map((item,index)=>{
                                return(
                                    <SwiperSlide key = {item} className='shoes'>
                                        <Box sx={{width:'100%'}}>
                                            <Skeleton variant="rectangular" width={'100%'} height={"250px"} sx={{borderRadius:3}}/>
                                        </Box>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </Box>
                :
                <Box sx={{width:'100%'}}>
                    {
                        <Box sx={{width:'100%',height:'250px'}}>
                            {
                                shoes.length!=0?
                                    <Swiper
                                        spaceBetween={-6}
                                        modules={[FreeMode]}
                                        slidesPerView={'auto'}
                                        freeMode={{enabled: true}}	// 추가
                                    >
                                        {
                                            shoes.map((item,index)=>{
                                                console.log(item)
                                                return(
                                                    <SwiperSlide className='shoes'>
                                                        <Box onClick = {()=>navigateToShoesDetail(item.id)} sx={{width:'100%',height:'250px',display:'flex',alignItems:"center",flexDirection:"column",alignItems:"start"}}>
                                                            <Box sx={{width:'150px',height:'150px',backgroundColor:'#4F1D76',borderRadius:3,backgroundImage:`url(${API_URL}${item.shoesImg})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                                            <Box sx={{display:'flex',flexDirection:'column',ml:1,mt:1,width:"100%"}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px'}}>
                                                                    {item.brand}
                                                                </Typography>
                                                                <Typography sx={{lineHeight:"20px",fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    {item.name}
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                                                                    {formatNumberWithCommas(item.price)}{"원"}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                    </Swiper>
                                :
                                <Box sx={{height:'250px',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                                        존재하지 않습니다 :(
                                    </Typography>
                                </Box>
                            }
                        </Box>
                    }
                </Box>
            }

            {/*신발정보 */}


        </Box>    
    )
}