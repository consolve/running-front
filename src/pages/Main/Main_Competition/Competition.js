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

import Title from "../Main_Component/Main_Title"
import Content from "../../../component/Competition/wide_feed";
import ContentSkeleton from "../../../component/shoes/wide_Skeleton"



//모듈 필요
import { FreeMode,Grid } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

import './style.css';

export default function Competition(props){
    const [competition,setCompetition] = useState([]);
    const sessionid = localStorage.getItem('sessionid');

    const FetchList = async () => {
        const _Popularcompetitions = await fetchPopularContest(3,sessionid);
    
        if(_Popularcompetitions.response){

            switch(_Popularcompetitions.response.status){
                case 401:
                    props.setError("로그인이 필요한 서비스입니다.");
                    break;
                case 404:
                    props.setError("대회가 존재하지 않습니다.");
                    break;
                case 500:
                    props.setError("서버 오류입니다.");
                    break;
                default:
                    props.setError(_Popularcompetitions.response.status);
                    break;
            }
            
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
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',py:'22px'}}>

            <Title title={"지금 인기있는 러닝대회"} navigate={"/schedule"}/>

            {/*대회정보*/}
            {
                props.loadingall?
                <Box sx={{width:"100%",height:'120px'}}>
                    <ContentSkeleton/>
                </Box>
                :
                <Box sx={{width:"100%",display:"flex",justifyContent:"end"}}>
                    {
                        competition?
                        <Box sx={{width:'100%',pt:1}}>
                            <Swiper
                                cssMode={true}
                                spaceBetween={-34}
                                modules={[FreeMode]}
                                slidesPerView={'auto'}
                                freeMode={{enabled: true}}	// 추가
                                style={{width:"auto"}}
                            >
                                {
                                    competition.map((item,index)=>{
                                        return(
                                            <SwiperSlide key ={index} className="competition">
                                                <Content key={item.id} item={item} navigateToCompetitionDetail={()=>navigateToCompetitionDetail(item.id)}/>
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
