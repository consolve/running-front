import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import TopbarTheme from '../../../../style/plate/topbar';
import WestIcon from '@mui/icons-material/West';


export default function RunnerTalk_Main_TopBar(){

    const navigate = useNavigate();

    const navigateToHome = () =>{
        navigate(-1);
    }

    return(
        <Box sx={TopbarTheme}>
            <Box sx={{mx:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',height:"100%",borderBottom:3,color:"#F6F6F6"}}>
                <Box onClick = {navigateToHome} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <IconButton type="button" sx={{ }} aria-label="search">
                        <WestIcon sx={{width:"28px",height:"28px"}}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>    
    )
}