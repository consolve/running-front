import {Box,Typography,Button} from '@mui/material';
import Input from '@mui/base/Input';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Logo from "../../Image/RIFE_Logo.png"
import "../../style/fonts/pretendardvariable.css"
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

//MUI Button Custom
const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return <Input slots={{ input: StyledInputElement }} {...props} ref={ref}/>;
});

//Button CSS
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
    const [tel,setTel] = useState();
    
    //입력시 전화번호 자동 변경
    const handleTel = (e) =>{
        e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
        setTel(e.target.value);
    }

    //raect router dom navigate
    const navigate = useNavigate();

    const navigateToMain = () =>{
        navigate("/Main");
    }

    const handleSubmit = async () =>{
        
        if(tel.length === 13){
            alert(tel);
        }
        else{
            console.log(tel);
            alert("전화번호를 입력해 주세요!");
        }
    }


    return(
      <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'100vh',flexDirection:'column',pl:2}}>

        {/*왼쪽 위 로고*/}
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

        {/*상단 텍스트*/}
        <Box sx={{width:'100%',pt:7}}>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'36px'}}>
                환영합니다 !
            </Typography>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'36px'}}>
                기다리고 있었어요 :)
            </Typography>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D',pt:3}}>
                러너님의 번호를 알려주세요 !
            </Typography>
        </Box>

        {/*인증번호*/}
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',flexDirection:'column',pt:7,width:'100%'}}>
            <Box sx={{display:'flex'}}>
                <CustomInput placeholder="전화번호를 입력해주세요" onChange={handleTel}/>
                <Button onClick={handleSubmit} variant="contained" color='primary' sx={{width:'100px',height:'42px',borderRadius:3,mt:'20px',ml:2}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'12px'}}>
                        인증번호 발송
                    </Typography>
                </Button>
            </Box>
            <Box sx={{display:'flex'}}>
                <CustomInput placeholder="인증번호를 입력해주세요"/>
                <Button onClick={navigateToMain} variant="contained" color='primary' sx={{width:'100px',height:'42px',borderRadius:3,mt:'20px',ml:2}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'12px'}}>
                        인증확인
                    </Typography>
                </Button>
            </Box>
        </Box>

      </Box>    
    )
}