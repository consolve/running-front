import {Box,Typography,IconButton,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {API_URL} from "../../../API/URL/url"
import Skeleton from '@mui/material/Skeleton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { fetchCrewAll,runningCrewBookMark } from '../../../API/api/RunningCrew/crew_api';
import { CrewMain_CrewBookMark } from '../../../state/Crew/CrewMain_State';
import BookMarkHandle from '../../../Util/bookmark';

import Title from "../Main_Component/Main_Title"

import './style.css';

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import { useRecoilState } from 'recoil';


export default function Crew(props){
    const loadingcomponent =[1,2,3,4,5,6];
    const session = localStorage.getItem('sessionid');

    const [crew,setCrew] = useState([]);
    const [crewBookmark,setCrewBookMark] = useRecoilState(CrewMain_CrewBookMark)

    const FetchList = async () => {
        const _AllCrew = await fetchCrewAll("?page=1",session);
    
        if(_AllCrew.response){

            switch(_AllCrew.response.status){
                case 401:
                    props.setError("로그인이 필요합니다.")
                    props.setOpen(true)
                    break;
                case 404:
                    props.setError("크루가 존재하지 않습니다.")
                    props.setOpen(true)
                    break;
                case 500:
                    props.setError("서버 오류입니다. 잠시 후 다시 시도해주세요.")
                    props.setOpen(true)
                    break;
                default:
                    props.setError("알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.")
                    props.setOpen(true)
                    break;
            }
            props.setOpen(true)
        }
        else{
            setCrew(_AllCrew);
        }
        
        props.setLoading3(false);
    }

    const navigate = useNavigate();

    const navigateToShoesDetail =(index) =>{
        navigate(`/crew/detail/${index}`)
    }

    const onClickBookMart = (id,event) =>{
        event.stopPropagation();
        if(BookMarkHandle("crew",id,session,navigate)){
            setCrewBookMark((prev)=>({...prev,[id]:!crewBookmark[id]}))
        }
    }

    useEffect(() =>{
        FetchList();
    },[])

    useEffect(()=>{
        for(const item of crew){
            setCrewBookMark((prev)=>({...prev,[item.id]:item.bookmarked}))
        }
    },[crew])


    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',my:'20px'}}>

            <Title title={"혼자말고, 크루와 함께해요"} navigate={"/crew"}/>

            {/*크루*/}
            {
                props.loadingall?
                <Box sx={{width:'100%',pt:2,height:'250px'}}>
                    <Swiper
                        cssMode={true}
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
                        crew?
                        <Box >
                            <Swiper
                                spaceBetween={8}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                                style={{paddingLeft:"20px",paddingRight:"20px",width:"auto"}}
                            >
                                {
                                    crew.map((item,index)=>{
                                        return(
                                            <SwiperSlide key={index} className='shoes'>
                                                <Box onClick={()=>navigateToShoesDetail(item.id)} sx={{width:'100%'}}>
                                                    <Box sx={{position:'relative'}}>
                                                        <Box sx={{width:'170px',height:'170px',backgroundColor:'primary.main',borderRadius:3,mx:'auto',backgroundImage:`url(${API_URL}${item.mainImg})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                                        {
                                                            crewBookmark[item.id]?
                                                            <IconButton onClick={(e)=>onClickBookMart(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                                <BookmarkIcon sx={{color:"primary.main"}}/>
                                                            </IconButton>
                                                            :
                                                            <IconButton onClick={(e)=>onClickBookMart(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                                <BookmarkBorderIcon sx={{color:"#ffffff"}}/>
                                                            </IconButton>
                                                        }
                                                    </Box>
                                                    <Box sx={{width:"100%",mt:1,mb:0,ml:0.5}}>
                                                        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                            {
                                                                item.activityAreaTag.map((item,index)=>{
                                                                    return(
                                                                        <Box key={index} sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'40px',height:'15px',backgroundColor:'primary.main',borderRadius:3,mr:1}}>
                                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px',color:'#ffffff'}}>
                                                                                {item.name}
                                                                            </Typography>
                                                                        </Box>
                                                                    )
                                                            })
                                                            }      
                                                        </Box>

                                                        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',width:'100%'}}>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                                                                {item.name}
                                                            </Typography>
                                                            <Box sx={{display:'flex'}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    정기런
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    &nbsp;{'|'}&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    {item.regularRun}
                                                                </Typography>
                                                            </Box>

                                                            <Box sx={{display:'flex',mt:-0.5}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    시간
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    &nbsp;{'|'}&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    {item.runningTime}
                                                                </Typography>
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