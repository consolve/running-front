import {Box,Typography,Button} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import createTheme from '@mui/material';
import Logo from "../../Image/RIFE_Logo.png"
import User_Login from "./User_Login";
import { Link } from 'react-router-dom';
import "../../style/fonts/pretendardvariable.css"
import { useNavigate } from "react-router-dom";



export default function Login(){
    const navigate = useNavigate();

    const navigateToRegister =() =>{
        navigate("/register_tel");
    }

    return(
      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',height:'100vh',flexDirection:'column'}}>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Box
                    component="img"
                    sx={{
                        width: '150px',
                    }}
                    alt="LOGO"
                    src={Logo}
                />
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',pt:3}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'bold',fontSize:'13px',color:'#4F1D76'}}>
                        Running + Life = RIFE
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:500,fontSize:'13px',pt:1}}>
                        대회 일정부터 러닝꿀팁까지,
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'bold',fontSize:'13px'}}>
                        러닝라이프를 한 층 업그레이드 해보세요 !
                    </Typography>
                </Box>
            </Box>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', position:"absolute",bottom:30,maxWidth:'420px',minWidth:'360px'}}>
                <Button onClick={navigateToRegister} variant="contained" color='primary' sx={{width:'85%',height:'50px',borderRadius:3}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'14px'}}>
                        업그레이드 하기
                    </Typography>
                </Button>
                <Box sx={{display:'flex',pt:2}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'bold',fontSize:'14px',color:'#8E8D8D'}}>
                        이미 계정이 있나요? 
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'bold',fontSize:'14px'}}>
                        <Link to ="/user_login" style={{ textDecoration: 'none', color:'#4F1D76' }}>
                            로그인
                        </Link>
                    </Typography>
                </Box>
            </Box>
      </Box>    
    )
}