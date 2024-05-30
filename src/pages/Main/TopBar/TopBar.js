import {Box,Typography,Paper,Avatar} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import TopbarTheme from '../../../style/plate/topbar';
import { useNavigate } from "react-router-dom";
import Logo from "../../../Image/Vector.svg"
import { API_URL } from '../../../API/URL';
import DefaultProfile from "../../../Image/user-circle.svg"

export default function Main_TopBar(){

    const navigate = useNavigate();

    const navigateToScheduleMain = () =>{
        navigate('/')
    }

    const navigateToProfile = () =>{
        navigate('/profile')
    }

    const profile = window.localStorage.getItem('profile');

    return(
        <Box 
        sx={TopbarTheme}>
            <Box sx={{mx:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',height:"100%",borderBottom:'3px solid',borderBottomColor:'#F6F6F6',}}>
                <Box onClick = {navigateToScheduleMain} sx={{display:'flex',justifyContent:'center',alignItems:'center',ml:2}}>
                    <Box component="img" src={Logo}/>
                </Box>

                <Box sx={{mr:2}}>
                    <Avatar onClick={navigateToProfile} alt="Profile" src={profile==="/media/None.png"?DefaultProfile:`${API_URL}${profile}`} sx={{width:"28px",height:"28px"}}/>
                </Box>
            </Box>
        </Box>    
    )
}