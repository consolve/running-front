import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import TopBar from "./Competition_Schedule_Component/Competition_TopBar";
import Month from "./Competition_Schedule_Component/Competition_Schedule_Month"
import Register from "./Competition_Schedule_Component/Competition_Schedule_canRegister"

export default function Competition_Schedule(){

    useEffect(() =>{
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar/>
            <Month/>
            <Register/>
        </Box>    
    )
}