import {Box,Typography,IconButton} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import WestIcon from '@mui/icons-material/West';
import {ContestBookMark} from "../../../../API/api/Contest/contest_api"
import TopbarTheme from '../../../../style/plate/topbar';


export default function RunnerTalk_TopBar(props){

    // const session = localStorage.getItem('sessionid');

    const navigate = useNavigate();
    const [bookmark,setBookmark] = useState(false);

    const navigateToBack = () =>{
        navigate(-1);
    }


    useEffect(() =>{

    },[])

    return(
        <Box sx={TopbarTheme}>
            <Box sx={{mx:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',height:"100%",borderBottom:'3px solid',borderBottomColor:'#F6F6F6'}}>
                <Box onClick = {navigateToBack} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <IconButton type="button" sx={{}} aria-label="search">
                        <WestIcon sx={{width:"28px",height:"28px"}}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>    
    )
}