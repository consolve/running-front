import {Box,Typography,Paper,Avatar} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import WestIcon from '@mui/icons-material/West';
import Logo from "../../../Image/White_Logo.png"
import { API_URL } from '../../../API/URL';

const TopbarTheme = {
    position:'fixed',
    top:50,
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    height:'60px',
    width:'100%',
    borderBottom:1,
    minWidth:'360px',
    maxWidth:'420px',
    zIndex:1000,
    backgroundColor:'transparent',
    borderBottom:0
}

export default function Main_TopBar(){

    const navigate = useNavigate();

    const navigateToScheduleMain = () =>{
        navigate('/schedule')
    }

    const profile = window.localStorage.getItem('profile');
    const test = "/media/TAMSAMSOM-006.png"

    return(
        <Box sx={TopbarTheme}>
            <Box onClick = {navigateToScheduleMain} sx={{display:'flex',justifyContent:'center',alignItems:'center',ml:2}}>
                <Box component='img' src={Logo} sx={{}}/>
            </Box>

            <Box sx={{mr:2}}>
                <Avatar alt="T" src={`${API_URL}${test}`} />
            </Box>
        </Box>    
    )
}