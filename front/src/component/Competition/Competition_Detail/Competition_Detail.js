import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Banner from "./Competition_Detail_Component/Competition_Detail_Banner"

export default function Competition_Detail(){

    useEffect(() =>{
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%',height:'100vh'}}>
           <Banner/>
            <Box sx={{width:'95%'}}>
                
            </Box>
        </Box>    
    )
}