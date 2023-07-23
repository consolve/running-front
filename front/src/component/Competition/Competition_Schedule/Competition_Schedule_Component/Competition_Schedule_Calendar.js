import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


export default function Competition_Schedule_Calendar(){

    const [competition_list,setCompetition_list] = useState([]);

    const FetchCompetitionList = async () => {
        setCompetition_list();
    }

    useEffect(() =>{
        FetchCompetitionList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%'}}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'start',width:'100%',mt:3}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'30px',ml:1}}>
                    러닝 캘린더
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px',color:"#9D9D9D",ml:1}}>
                    러닝 대회를 캘린더로 한 눈에 확인하세요
                </Typography>
            </Box>

            <Box sx={{backgroundColor:'#D9D9D9',width:'100%',height:'330px',mt:3,mb:10,borderRadius:2}}/>
        </Box>    
    )
}