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

    const navigateToScheduleSearch = () =>{
        navigate('/schedule/search')
    }

    const navigateToHome = () =>{
        navigate('/');
    }


    useEffect(() =>{
    },[])

    return(
        <Box sx={TopbarTheme}>
            <Box sx={{mx:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',height:"100%",borderBottom:'3px solid',borderBottomColor:'#F6F6F6',}}>
                <Box onClick = {navigateToHome} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <IconButton type="button" sx={{ }} aria-label="search">
                        <WestIcon sx={{}}/>
                    </IconButton>
                </Box>
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'23px'}}>
                        대회일정
                    </Typography>
                </Box>

                <Box
                    onClick={navigateToScheduleSearch}
                    >
                    <IconButton type="button" sx={{ }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>    
    )
}