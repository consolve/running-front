import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import WestIcon from '@mui/icons-material/West';
import TopbarTheme from '../../../../style/plate/topbar';



export default function Competition_TopBar(){

    const navigate = useNavigate();

    const navigateToBack = () =>{
        navigate(-1);
    }

    useEffect(() =>{
    },[])

    return(
        <Box sx={TopbarTheme}>
            <Box onClick = {navigateToBack} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <WestIcon sx={{ml:2}}/>
            </Box>
        </Box>    
    )
}