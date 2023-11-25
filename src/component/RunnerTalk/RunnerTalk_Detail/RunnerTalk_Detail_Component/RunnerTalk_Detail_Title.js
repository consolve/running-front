import {Box,Typography,Button,Card} from '@mui/material';
import React, { useEffect, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

export default function RunnerTalk_Detail_Detail(props){

    const navigate = useNavigate();

    const navigateToCategory = (name) =>{
        const id = props.category.filter((item)=>item.name === name)[0].id;

        navigate(`/runnertalk/category/${id}`)
    }

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',backgroundColor:'#ffffff',borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>
            
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'90%'}}>
                <Typography onClick={()=>navigateToCategory(props.detail.category)} color = {"#4F1D76"} sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'12px'}}>
                    {props.detail.category}{" >"}
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'20px',mt:0.5}}>
                    <MoreVertIcon sx={{height:'20px',color:'#D9D9D9'}}/>
                </Typography>
            </Box>
        </Box>    
    )
}