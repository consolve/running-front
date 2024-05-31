import {Box,Typography,Button,Input,Modal} from '@mui/material';
import React, { useState } from "react";
import Auth from '../../../hoc/auth'
import { useNavigate } from "react-router-dom";
import {useRecoilState} from 'recoil';
import {
    User_NickName
} from '../../../state/User/UserLogin_State';
import WestIcon from '@mui/icons-material/West';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

function Login(){

    const vibrate = keyframes`
    0%{
        transform: translate(1px, 1px);
    }
    10%{
        transform: translate(-1px, -1px);
    }
    20%{
        transform: translate(-1px, 1px);
    }
    30%{
        transform: translate(1px, 1px);
    }
    40%{
        transform: translate(-1px, 1px);
    }
    50%{
        transform: translate(1px, -1px);
    }
    60%{
        transform: translate(1px, 1px);
    }
    70%{
        transform: translate(-1px, 1px);
    }
    80%{
        transform: translate(1px, -1px);
    }
    90%{
        transform: translate(-1px, 1px);
    }
    100%{
        transform: translate(1px, 1px);
    }
    `

    const AnimatedBox = styled(Box)`
    animation: ${vibrate} 0.5s ease-in-out;
    `;

    const navigate = useNavigate();
    const [nickName,setNickName] = useRecoilState(User_NickName);
    const [open,setOpen] = useState(false);
    const [error,setError] = useState("");


    const handleClose = () => {
        setOpen(false);
    };

    const navigateToRegisterCrew =() =>{
        if(nickName.length > 10){
            setOpen(true);
            return;
        }
        setOpen(false)
        navigate("/register/crew");
    }

    const handleNickName = (e) =>{
        if(e.target.value.length <= 10){
            setOpen(false);
        }
        else{
            setOpen(true);  
        }
        setNickName(e.target.value);
    }

    const navigateToBack = () =>{
        navigate(-1);
    }

    return(
        <>
        <Box sx={{
            position:"fixed",
            top:10,
            height:'60px',
            width:'100%',
            minWidth:'360px',
            maxWidth:'450px',
        }}>
            <Box onClick = {navigateToBack} sx={{display:'flex',justifyContent:'start',alignItems:'center',height:"100%",ml:2}}>
                <WestIcon sx={{}}/>
            </Box>
        </Box>
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',backgroundColor:'#ffffff',height:'100%',flexDirection:'column',mt:'94px',width:"100%"}}>
            <Box sx={{display:"flex",flexDirection:"column",px:'22px',width:"calc(100% - 44px)"}}>
              
                <Box sx={{width:'100%',pt:3}}>
                    <Typography color = "primary.main" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'28px'}}>
                        환영합니다!
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'28px',mt:3}}>
                        러너님을
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'28px'}}>
                        어떻게 불러드리면 될까요?
                    </Typography>
                </Box>
                <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',flexDirection:'column',pt:2,width:'100%'}}>
                    <Box sx={{display:'flex',width:'100%',mt:5,position:'relative',alignItems:'center'}}>
                        <Input error={open} value = {nickName} placeholder="10자 내로 입력해주세요." onChange={handleNickName} sx={{width:'100%',mr:2,fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'23px'}}/>
                        <Box sx={{position:'absolute',right:'20px',display:'flex',alignItems:'center',height:'100%',mr:2}}>
                            <Typography color = "#C4C9CF" sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'23px'}}>
                                {nickName.length}{"/10"}
                            </Typography>
                        </Box>  
                    </Box>
                </Box>
            </Box>
        {
            open&&
            <AnimatedBox sx={{width:"100%"}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px',color:"red"}}>
                    {"닉네임은 10글자 이내로 입력해주세요."}
                </Typography>
            </AnimatedBox>
        }

        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', position:"absolute",bottom:30,minWidth:'360px',maxWidth:'420px',mr:2,width:"100%"}}>
            <Button onClick={navigateToRegisterCrew} variant="contained" color='primary' disabled={!nickName} sx={{width:'90%',height:'50px',borderRadius:3}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'19px',fontWeight:'500'}}>
                    다음
                </Typography>
            </Button>
        </Box>

        {/* <Box>
            <Modal
                open={open}
                onClose={handleClose}
                disableScrollLock
            >
                <Box sx={{position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 200,
                    bgcolor: 'background.paper',
                    border: '1px solid #000',
                    boxShadow: 24,
                    p: 4,}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                        {error}
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                        {error}
                    </Typography>
                </Box>
            </Modal>
        </Box> */}

      </Box>  
      </> 
    )
}

export default Auth(Login,false);