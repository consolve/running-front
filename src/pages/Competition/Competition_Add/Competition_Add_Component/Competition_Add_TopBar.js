import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TopbarTheme from '../../../../style/plate/topbar';
import WestIcon from '@mui/icons-material/West';


export default function Competition_TopBar(){

    const navigate = useNavigate();

    const navigateToHome = () =>{
        navigate('/schedule');
    }

    useEffect(() =>{
    },[])

    return(
        <Box sx={{position:"relative",display:'flex',alignItems:'center',justifyContent:'center',width:'90%',maxWidth:'405px',minWidth:'324px',height:'60px',borderBottom:1,borderBottomColor:'#E0E0E0'}}>

            <Box onClick = {navigateToHome} sx={{position:"absolute",left:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
                <IconButton type="button" sx={{ }} aria-label="search">
                    <WestIcon sx={{width:"28px",height:"28px"}}/>
                </IconButton>
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'23px'}}>
                    대회등록
                </Typography>
            </Box>
            
        </Box>    
    )
}