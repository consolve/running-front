import {Box,Typography,Button} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../style/fonts/pretendardvariable.css"
import { useNavigate } from "react-router-dom";
import Banner from "./Banner/Banner"
import Competition from "../Competition/Competition_Main.js/Competition"

export default function Main(){

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'100vh',flexDirection:'column'}}>
            <Banner/>
            <Competition/>
        </Box>    
    )
}