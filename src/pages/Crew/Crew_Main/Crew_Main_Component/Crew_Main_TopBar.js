import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import {ReactComponent as SearchIcon} from '../../../../Image/search.svg';
import TopbarTheme from '../../../../style/plate/topbar';
import WestIcon from '@mui/icons-material/West';


export default function Competition_TopBar(){

    const navigate = useNavigate();

    const navigateToCrewSearch = () =>{
        navigate('/crew/search')
    }

    const navigateToHome = () =>{
        navigate('/');
    }


    useEffect(() =>{
    },[])

    return(
        <Box sx={TopbarTheme}>
            <Box sx={{mx:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',height:"100%",borderBottom:'3px solid',borderBottomColor:'#F6F6F6',}}>
                <Box onClick = {navigateToHome} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <IconButton type="button" sx={{ }} aria-label="search">
                        <WestIcon sx={{width:"28px",height:"28px"}}/>
                    </IconButton>
                </Box>
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'23px'}}>
                        러닝크루
                    </Typography>
                </Box>

                <Box
                    onClick={navigateToCrewSearch}
                    >
                    <IconButton type="button" sx={{ }} aria-label="search">
                        <SearchIcon width={21} height={21}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>    
    )
}