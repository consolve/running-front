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

import Title from "../../../../component/Competition/Competition_Title"


export default function Competition_Schedule_Calendar(props){

    const navigate = useNavigate();
    
    const [loading3,setLoading3] = useRecoilState(CompetitionSchedule_CalendarLoading);
    const [loadingall,setLoadingall] = useRecoilState(CompetitionSchedule_AllLoading);
    const [calendar,setCalendar] = useState([{url:''}]);

    const FetchList = async () => {
        const _CalendarCompetition = await fetchCalendarContest();

        console.log(_CalendarCompetition)
    
        if(_CalendarCompetition.response){
            props.setError(_CalendarCompetition.response.status)
            props.setOpen(true)
        }
        else{
            setCalendar(prev=>prev=_CalendarCompetition);
        }
        
        setLoading3(false);
    }

    useEffect(() =>{
        FetchList();
    },[])


    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mb:'60px'}}>

            <Title title={"대회 캘린더"} content={"대회 일정을 캘린더로 한 눈에 확인하세요"}/>

            {
                loadingall?
                <Box sx={{mt:3,mb:5}}>
                    <Skeleton variant="rectangular" width={'350px'} height={"350px"} sx={{mt:1,borderRadius:2}}/>
                </Box>
                :
                <Box sx={{backgroundColor:'#D9D9D9',width:'350px',height:'350px',mt:3,mb:5,borderRadius:2,backgroundImage:`url(${API_URL}${calendar[0].url})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'contain',objectFit:'contain',objectPosition:'center'}}/>
            }
        </Box>    
    )
}