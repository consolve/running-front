import {Box,Typography,Skeleton,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchPopularTalk } from '../../../API/api/RunningTalk/runningTalk_api';
import { API_URL } from '../../../API/URL';

import Title from "../Main_Component/Main_Title"

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/free-mode';
import './style.css';

// import required modules
import { Grid } from 'swiper/modules';
import { FreeMode } from 'swiper/modules';



export default function  Community(props){

    const navigate = useNavigate();
    const session = localStorage.getItem('sessionid');

    const navigateToCompetitionDetail =(id) =>{
        navigate(`/runnertalk/detail/${id}`)
    }

    const [runningtalk,setRunningTalk] = useState([]);

    const FetchList = async () => {
        const _PopularRunningTalk = await fetchPopularTalk(6,session);
    
        if(_PopularRunningTalk.response){
            switch(_PopularRunningTalk.response.status){
                case 401:
                    props.setError("로그인이 필요합니다.")
                    break;
                case 404:
                    props.setError("서버와의 연결이 원활하지 않습니다.")
                    props.setOpen(true)
                    break;
                default:
                    break;
            }

            props.setOpen(true)
        }
        else{
            setRunningTalk(_PopularRunningTalk);
        }
        
        props.setLoading4(false);
    }
    
    useEffect(() =>{
        FetchList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',py:'22px'}}>

            <Title title={"이런 러닝 꿀팁은 어때요?"} navigate={"runnertalk"}/>

            {/*대회정보*/}
            <Box sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                {
                    props.loadingall?
                    <Box sx={{width:"100%",mt:"10px"}}>
                        <Skeleton variant="rectangular" height={"100px"} sx={{mx:"20px",borderRadius:2}}/>
                        <Skeleton variant="rectangular" height={"100px"} sx={{mx:"20px",borderRadius:2,mt:'10px'}}/>
                    </Box>
                    :
                    <Swiper
                    cssMode={true}
                    slidesPerView={1}
                    grid={{
                        rows: 2,
                        fill: "row"
                    }}
                    spaceBetween={'-6px'}
                    modules={[Grid,FreeMode]}

                    >
                {
                        runningtalk.map((item,index)=>{
                            return(
                                    <SwiperSlide key = {index} className='swiper-slide-community'>
                                        <Box onClick ={() => navigateToCompetitionDetail(item.id)} sx={{width:'100%',height:'110px',backgroundColor:'#F6F6F6',borderColor:'#F6F6F6',borderRadius:3,display:'flex',alignItems:'center',filter:"drop-shadow(0 0 0)"}}>
                                            <Box sx={{width:'90px',height:'90px',backgroundColor:'#F6F6F6',borderRadius:3,mx:1,backgroundImage:`url(${API_URL}${item.images.length?item.images[0].img:""})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'top center'}}/>
                                            <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',width:`calc(100% - 106px)`,flexDirection:'column',height:"100%"}}>
                                                <Box sx={{width:'100%'}}>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px'}}>
                                                        {item.title}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{width:'95%',height:"45px"}}>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'8px',height:'100%',color:'#606060',whiteSpace:'pre-line',overflow:'hidden',textOverflow:'ellipsis',WebkitLineClamp:3,display:'-webkit-box',WebkitBoxOrient:'vertical'}}>
                                                        {item.content}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:"center",mt:0.5}}>
                                                    <Box sx={{display:'flex',height:'14px',alignItems:"center"}}>
                                                        <Avatar src={`${API_URL}${item.user_profile}`} sx={{width:'11px',height:'11px',mr:0.5}}/>
                                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060'  ,height:'100%',lineHeight:'normal'}}>
                                                            {item.user}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{mr:3, display:'flex'}}>
                                                        <Box sx={{display:'flex',alignItems:'center',height:'14px'}}>
                                                            <TurnedInNotIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                            <Typography align ="center" sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',mr:1,height:'100%'}}>
                                                                {item.bookmarkPoint}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{display:'flex',alignItems:'center',height:'14px'}}> 
                                                            <ThumbUpOffAltOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',mr:1,height:'100%'}}>
                                                                {item.likePoint}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{display:'flex',alignItems:'center',height:'14px'}}>
                                                            <ModeCommentOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',height:'100%'}}>
                                                                {item.commentPoint}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                }
               
            </Box>

            
        </Box>    
    )
}