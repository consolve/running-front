import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TopbarTheme from '../../../../style/plate/topbar';


export default function Competition_TopBar(){

    const navigate = useNavigate();

    const navigateToScheduleSearch = () =>{
        navigate('/schedule/search')
    }

    useEffect(() =>{
    },[])

    return(
        <Box sx={TopbarTheme}>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'23px',ml:3}}>
                    대회일정
                </Typography>
            </Box>

            <Box
                onClick={navigateToScheduleSearch}
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 160,mr:2,backgroundColor:'#f4f4f4',borderRadius:3 }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1,fontFamily: 'Pretendard Variable',fontWeight:500 }}
                    placeholder="풀코스, 10K, 하프"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Box>
        </Box>    
    )
}