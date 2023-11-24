import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';

export default function Competition_Detail_Detail(props){
    const [isOpen,setOpen] = useState(false);

    useEffect(() =>{
        let now = new Date();
        let receptionTime = new Date(props.competition.receptionEndTime)
        {
            now < receptionTime ? setOpen((prev)=>prev=true) : setOpen((prev)=>prev=false)
        }
        
    },[])

    return(
        <Box sx={{backgroundColor:'#ffffff',borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>
            
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'column',px:'20px',pt:'24px',pb:2}}>
                <Typography color = {isOpen?"#4F1D76":'gray'} sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'12px',lineHeight:"14.32px"}}>
                    {isOpen?"모집중":"모집완료"}
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px',mt:'3px',lineHeight:"28.64px"}}>
                    {props.competition.name}
                </Typography>
            </Box>
        </Box>    
    )
}