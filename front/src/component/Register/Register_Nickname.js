import {Box,Typography,Button} from '@mui/material';
import Input from '@mui/base/Input';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Logo from "../../Image/RIFE_Logo.png"
import "../../style/fonts/pretendardvariable.css"
import { styled } from '@mui/system';
import { useNavigate } from "react-router-dom";

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return <Input slots={{ input: StyledInputElement }} {...props} ref={ref}/>;
});
  
const StyledInputElement = styled('input')(
({ theme }) => `
    width: 220px;
    font-family: Pretendard Variable;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5rem;
    padding: 8px 12px;
    border-radius: 10px;
    margin-top:20px;
    color: #1A2027;
    background-color: #F4F4F4;
    border: 1px solid #ffffff;

    &:focus {
        border-color: #4F1D76;
    }

    // firefox
    &:focus-visible {
        outline: 0;
    }
`,
);

export default function Login(){

    const navigate = useNavigate();

    const navigateToRegisterCrew =() =>{
        navigate("/register_crew");
    }

    return(
      <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'100vh',flexDirection:'column',pl:2}}>
        <Box sx={{display:'flex',alignItems:'start',justifyContent:'start',width:'100%',maxWidth:'420px',minWidth:'360px'}}>
            <Box
                component="img"
                sx={{
                    width: '60px',
                    pt:3,

                }}
                alt="LOGO"
                src={Logo}
            />
        </Box>
        <Box sx={{width:'100%',pt:7}}>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'36px'}}>
                러너님의 닉네임은
            </Typography>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'36px'}}>
                무엇인가요 ?
            </Typography>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D',pt:1}}>
                이제 하나만 남았어요 !
            </Typography>
        </Box>
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',flexDirection:'column',pt:2,width:'100%'}}>
            <Box sx={{display:'flex',width:'100%'}}>
                <CustomInput placeholder="닉네임을 입력해주세요" />
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
                    <Button onClick={navigateToRegisterCrew} variant="contained" color='primary' sx={{width:'100px',height:'42px',borderRadius:3,mt:'20px',mx:2}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'12px'}}>
                            중복확인
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
      </Box>    
    )
}