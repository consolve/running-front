import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';

export default function Crew_Detail_Title(props){

    useEffect(() =>{
        
        
    },[])

    return(
        <Box sx={{backgroundColor:'#ffffff',borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'column',px:'20px',pt:'24px',pb:2}}>
                <Typography color = {"primary.main"} sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'12px',lineHeight:"14.32px"}}>
                {props.crew.runningPlace}
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px',mt:'3px',lineHeight:"28.64px"}}>
                {props.crew.name}
                </Typography>
            </Box>
        </Box>   
    )
}