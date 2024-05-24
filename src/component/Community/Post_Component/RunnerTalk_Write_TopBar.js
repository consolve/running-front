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

    const session = localStorage.getItem("sessionid");

    const [header,setHeader] = useRecoilState(RunnerTalk_Write_Header);
    const [content,setContent] = useRecoilState(RunnerTalk_Write_Content);
    const [categoryState,setCategoryState] = useRecoilState(RunnerTalk_Write_Category);
    const [image,setImage] = useRecoilState(RunnerTalk_Write_Image);

    const navigateToRunnerTalkMain = () =>{
        navigate('/runnertalk')
    }

    const FetchRunningTalkPostFunction = async () =>{
        props.setLoading(true);

        const response = await FetchRunnerTalkPost(session,categoryState,header,content,image);

        if(response.response){
            props.setError(response.response.status)
            props.setErrorOpen(true)
        }
        else{
            props.setLoading(false);
            navigateToRunnerTalkMain();
        }
    }

    useEffect(() =>{
    },[])

    return(
        <Box sx={TopbarTheme}>
            <Box sx={{mx:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',height:"100%",borderBottom:'3px solid',borderBottomColor:'#F6F6F6',}}>
                <Box onClick = {navigateToRunnerTalkMain} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <IconButton type="button" sx={{ }} aria-label="search">
                        <WestIcon sx={{}}/>
                    </IconButton>
                </Box>
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:"column"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'23px'}}>
                        글쓰기
                    </Typography>
                </Box>

                <Box
                    color={header&&content&&categoryState?"primary.main":"#A6A6A6"}
                    onClick={header&&content&&categoryState?FetchRunningTalkPostFunction:()=>{}}
                    sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:"column",mr:1}}
                    >
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',mt:'4px'}}>
                        확인
                    </Typography>
                </Box>
            </Box>
        </Box>    
    )
}