import {Box,Typography,IconButton,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {API_URL} from "../../../API/URL/url"
import Skeleton from '@mui/material/Skeleton';
import { useRecoilState } from 'recoil';
import { fetchPopularShoes,runningShoesBookMark } from '../../../API/api/RunningShoes/shoes_api';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {ShoesMain_ShoesBookMark} from "../../../state/Shoes/ShoesMain_State"
import { shoesList } from '../../../style/plate/ShoesList';
import BookMarkHandle from '../../../Util/bookmark';

import Title from "../Main_Component/Main_Title"

import './style.css';

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';


export default function Shoes(props){
    const loadingcomponent =[1,2,3,4,5,6];

    const [shoes,setShoes] = useState([]);
    const [shoesBookmark,setShoesBookmark] = useRecoilState(ShoesMain_ShoesBookMark);
    
    const session = localStorage.getItem('sessionid');

    const FetchList = async () => {
        const _PopularShoes = await fetchPopularShoes(6,session);
    
        if(_PopularShoes.response){

            switch(_PopularShoes.response.status){
                case 401:
                    props.setError("로그인이 필요한 서비스입니다.")
                    props.setOpen(true)
                    break;
                case 500:
                    props.setError("서버에 문제가 발생했습니다.")
                    props.setOpen(true)
                    break;
                default:
                    break;
            }
            props.setOpen(true)
        }
        else{
            setShoes(_PopularShoes);
        }
        
        props.setLoading2(false);
    }

    const onClickBookMart = (id,event) =>{
        event.stopPropagation();
        if(BookMarkHandle("shoes",id,session,navigate)){
            setShoesBookmark((prev)=>({...prev,[id]:!shoesBookmark[id]}))
        }
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

    useEffect(()=>{
        for(const item of shoes){
            setShoesBookmark((prev)=>({...prev,[item.id]:item.bookmarked}))
        }
    },[shoes])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',my:'22px'}}>

            <Title title="지금 인기있는 러닝화 " navigate="/shoes" />

            {/*대회정보*/}
            {
                props.loadingall?
                <Box sx={{width:'100%',pt:2,height:'250px'}}>
                    <Swiper
                        spaceBetween={8}
                        modules={[FreeMode]}
                        slidesPerView={'auto'}
                        freeMode={{enabled: true}}	// 추가
                    >
                        {loadingcomponent.map((item,index)=>{
                            return(
                            <SwiperSlide key ={index} className="shoes">
                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',width:'100%',height:'100%',flexDirection:'column'}}>
                                    <Skeleton variant="rectangular" width={'100%'} height={"100%"} sx={{mt:1,borderRadius:2}}/>
                                </Box>
                            </SwiperSlide>   
                            )
                        })}
                    </Swiper>
                </Box>
                :
                <Box sx={{pt:2,width:'100%'}}>
                    {
                        shoes?
                        <Box >
                            <Swiper
                                spaceBetween={8}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                                style={{paddingLeft:"20px",paddingRight:"20px",width:"auto"}}
                            >
                                {
                                    shoes.map((item,index)=>{
                                        return(
                                            <SwiperSlide key={index} className='shoes'>
                                                <Box onClick={()=>navigateToShoesDetail(item.id)} sx={{width:'100%',height:'250px'}}>
                                                    <Box sx={{position:'relative',backgroundColor:'#f4f4f4',borderRadius:'8px'}}>
                                                        <img src={`${API_URL}${!item.shoesImg.length?null:item.shoesImg[0].url}`} style={{width:'170px',height:'170px',objectFit:'contain',objectPosition:'center',px:1,borderRadius:'8px'}}/>
                                                            {
                                                                shoesBookmark[item.id]?
                                                                <IconButton onClick={(e)=>onClickBookMart(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                                    <BookmarkIcon/>
                                                                </IconButton>
                                                                :
                                                                <IconButton onClick={(e)=>onClickBookMart(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                                    <BookmarkBorderIcon/>
                                                                </IconButton>
                                                            }
                                                    </Box>
                                                    <Box sx={shoesList.shoesDetailBox}>
                                                        <Typography sx={shoesList.shoesDetailBrand}>
                                                            {item.brand}
                                                        </Typography>
                                                        <Typography sx={shoesList.shoesDetailName}>
                                                            {item.koreanName}
                                                        </Typography>
                                                        <Typography sx={shoesList.shoesDetailPrice}>
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
                        <Box sx={{height:'250px',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                                존재하지 않습니다 :(
                            </Typography>
                        </Box>
                    }
                </Box>
            }
        </Box>    
    )
}