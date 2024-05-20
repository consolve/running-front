import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import WestIcon from '@mui/icons-material/West';

const TopbarTheme = {
    position:'fixed',
    top:0,
    backgroundColor:'#ffffff',
    height:'60px',
    zIndex:1000,
    maxWidth:"450px",
    minWidth:"360px",
    width:"100%"
}

export default function Shoes_Detail_TopBar(){

    const navigate = useNavigate();

    const navigateToBack = () =>{
        navigate(-1);
    }

    useEffect(() =>{
    },[])

    return(
        <Box sx={TopbarTheme}>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',height:"100%",borderBottom:'3px solid',borderBottomColor:'#F6F6F6',}}>
                <Box onClick = {navigateToBack} sx={{display:'flex',justifyContent:'center',alignItems:'center',ml:"20px"}}>
                    <IconButton type="button" sx={{}} aria-label="search">
                        <WestIcon sx={{}}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>    
    )
}