import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import {API_URL} from '../../../../API/URL/url';
import { fetchCalendarContest } from '../../../../API/api/Contest/contest_api';
import {useRecoilState} from 'recoil'
import {
    CompetitionSchedule_CalendarLoading,
    CompetitionSchedule_AllLoading
}   from '../../../../state/Competition/CompetitionSchedule_State';


export default function Competition_Schedule_Calendar(props){

    const navigate = useNavigate();
    
    const [loading3,setLoading3] = useRecoilState(CompetitionSchedule_CalendarLoading);
    const [loadingall,setLoadingall] = useRecoilState(CompetitionSchedule_AllLoading);
    const [calendar,setCalendar] = useState([]);

    const FetchList = async () => {
        const _CalendarCompetition = await fetchCalendarContest(6);
    
        if(_CalendarCompetition.response){
            props.setError(_CalendarCompetition.response.status)
            props.setOpen(true)
        }
        else{
            setCalendar(_CalendarCompetition);
        }
        
        setLoading3(false);
    }

    useEffect(() =>{
        FetchList();
    },[])


    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mb:5}}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'start',width:'100%',mt:3}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'30px',ml:1}}>
                    러닝 캘린더
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px',color:"#9D9D9D",ml:1}}>
                    러닝 대회를 캘린더로 한 눈에 확인하세요
                </Typography>
            </Box>

            {
                loadingall?
                <Box sx={{width:"100%",height:'324px',mt:3,mb:5}}>
                    <Skeleton variant="rectangular" width={'100%'} height={"330px"} sx={{mt:1,borderRadius:2}}/>
                </Box>
                :
                <Box sx={{backgroundColor:'#D9D9D9',width:'100%',height:'330px',mt:3,mb:5,borderRadius:2,backgroundImage:`url(${API_URL}${props.calendar})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'top center'}}/>
            }
        </Box>    
    )
}