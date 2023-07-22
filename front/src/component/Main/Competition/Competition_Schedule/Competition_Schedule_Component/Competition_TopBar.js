import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';



export default function Competition_TopBar(){

    useEffect(() =>{
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',backgroundColor:'#ffffff',height:'70px',width:'100%',borderBottom:1,borderColor:'#E8E8E8'}}>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'23px',ml:3}}>
                    대회일정
                </Typography>
            </Box>

            <Box
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