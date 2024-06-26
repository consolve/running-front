import {Box,Typography,Button} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Auth from "../../hoc/auth"
import {ReactComponent as Logo} from "../../Image/Vector.svg"




function Login(){
    const navigate = useNavigate();

    const navigateToRegister =() =>{
        navigate("/register/tel");
    }

    return(
      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',height:'100vh',flexDirection:'column'}}>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Logo width={'150px'} height="150px"/>
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',pt:3}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'bold',fontSize:'13px',color:'primary.main'}}>
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
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', position:"absolute",bottom:30,minWidth:'360px',maxWidth:"420px",width:"100%"}}>
                <Button onClick={navigateToRegister} variant="contained" color='primary' sx={{width:'90%',height:'50px',borderRadius:3}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'14px'}}>
                        회원가입
                    </Typography>
                </Button>
                <Box sx={{display:'flex',pt:2}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'bold',fontSize:'14px',color:'#8E8D8D'}}>
                        이미 계정이 있나요? 
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'bold',fontSize:'14px'}}>
                        <Link to ="/login" style={{ textDecoration: 'none', color:'primary.main' }}>
                            로그인
                        </Link>
                    </Typography>
                </Box>
            </Box>
      </Box>    
    )
}

export default Auth(Login,false,"/");