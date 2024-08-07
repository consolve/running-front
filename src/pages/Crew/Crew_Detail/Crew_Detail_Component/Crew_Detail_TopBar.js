import {Box,Typography,IconButton} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import WestIcon from '@mui/icons-material/West';
import BookMarkHandle from "../../../../Util/bookmark";

const TopbarTheme = {
    position:'fixed',
    top:0,
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'transparent',
    height:'60px',
    width:'100%',
    minWidth:'360px',
    maxWidth:'450px',
    zIndex:1000
}


export default function Crew_Detail_TopBar(props){

    const session = localStorage.getItem('sessionid');

    const navigate = useNavigate();
    const [bookmark,setBookmark] = useState(false);

    const navigateToBack = () =>{
        navigate(-1);
    }

    const onClickBookMart = (id) =>{
        if(BookMarkHandle("crew",id,session,navigate)){
            setBookmark(prev=>prev=!bookmark);
        }
    }

    useEffect(() =>{
        setBookmark(prev=>prev=props.crew.bookmarked)
    },[])

    return(
        <Box sx={TopbarTheme}>
            <Box onClick = {navigateToBack} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <IconButton type="button" sx={{color:'white',ml:2 }} aria-label="search">
                    <WestIcon sx={{width:"28px",height:"28px"}}/>
                </IconButton>
            </Box>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                {
                    bookmark?
                    <IconButton onClick={(e)=>onClickBookMart(props.crew.id,e)} sx={{color:'white',mr:1}}>
                        <BookmarkIcon/>
                    </IconButton>
                    :
                    <IconButton onClick={(e)=>onClickBookMart(props.crew.id,e)} sx={{color:'white',mr:1}}>
                        <BookmarkBorderIcon/>
                    </IconButton>
                }
            </Box>
        </Box>    
    )
}