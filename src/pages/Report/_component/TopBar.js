import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import {useRecoilState} from 'recoil';
import WestIcon from '@mui/icons-material/West';
import {
    RunnerTalk_Write_Header,
    RunnerTalk_Write_Content,
    RunnerTalk_Write_Category,
    RunnerTalk_Write_Image
} from "../../../state/RunnerTalk/RunnerTalk_Write_State"
import {FetchRunnerTalkPost} from "../../../API/api/RunningTalk/runningTalk_api"
import TopbarTheme from '../../../style/plate/topbar';

export default function RunnerTalk_Main_TopBar(props){

    const navigate = useNavigate();

    const navigateToRunnerTalkMain = () =>{
        navigate(-1)
    }

    return(
        <Box sx={TopbarTheme}>
            <Box sx={{mx:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',height:"100%",borderBottom:'3px solid',borderBottomColor:'#F6F6F6',}}>
                <Box onClick = {navigateToRunnerTalkMain} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <IconButton type="button" sx={{ }} aria-label="search">
                        <WestIcon sx={{width:"28px",height:"28px"}}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>    
    )
}