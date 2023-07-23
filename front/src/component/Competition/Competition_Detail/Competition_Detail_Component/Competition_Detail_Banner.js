import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Competition_Detail_Banner(){

    useEffect(() =>{
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#4F1D76',flexDirection:'column',width:'100%',height:'200px'}}>
            <Box sx={{backgroundImage:`url("https://source.unsplash.com/collection/0")`,width:'100%',height:'100%',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%',backgroundColor:'rgba(0, 0, 0, 0.6)',flexDirection:'column'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'23px',color:"#ffffff"}}>
                        DAY-23
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'23px',color:"#ffffff",mt:-0.5}}>
                        2023 서울 마라톤 대회
                    </Typography>
                </Box>
                
            </Box>
        </Box>    
    )
}