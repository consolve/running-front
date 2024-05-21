import {Box,Typography,Button,Input,CircularProgress} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from '../../../hoc/auth';
import { styled } from '@mui/system';
import { useNavigate } from "react-router-dom";
import Drawer from "./User_Tel_Drawer"
import { SmsSendCode } from '../../../API/api/Login/user_api';
import {Modal} from '@mui/material';
import {useRecoilState} from 'recoil';
import {
    User_Name,
    User_Number,
    User_NickName,
    User_Crew
} from '../../../state/User/UserLogin_State';
import WestIcon from '@mui/icons-material/West';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Login(){

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const [error,setError] = useState();
    const [loading,setLoading] = useState(false);

    const [name,setName] = useRecoilState(User_Name);
    const [number,setNumber] = useRecoilState(User_Number);
    const [nickname,setNickName] = useRecoilState(User_NickName);
    const [crew,setCrew] = useRecoilState(User_Crew);
    const [open,setOpen] = useState(false);
    
    const handleName = (e) =>{
        setName(e.target.value);
    }

    const handlenumber = (e) =>{
        setNumber(e.target.value);
    }

    const navigate = useNavigate();

    const navigateToRegisterName = async () =>{
        setLoading(true);

        const res = await SmsSendCode(number);

        if(res.status===200){
            localStorage.setItem('user_number',number);
            setLoading(false);
            setOpen(true)
        }
        else{
            setError(res.response.status);
            setLoading(false);
            setModalOpen(true);
        }

    }

    const navigateToBack = () =>{
        navigate(-1);
        setName("");
        setNumber("");
        setNickName("");
        setCrew("");
    }

    useEffect(()=>{
       
    },[])

    const isButtonEnabled = name && number ;

    return(
      <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'100vh',flexDirection:'column',pl:2}}>
        
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'start',width:'100%',maxWidth:'420px',minWidth:'360px',height:'80px'}}>
            <Box onClick = {navigateToBack} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <WestIcon sx={{}}/>
            </Box>
        </Box>
        
        <Box sx={{width:'100%',pt:3}}>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'28px'}}>
                안녕하세요, 러너님!
            </Typography>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'28px',mt:-0.5}}>
                반갑습니다!
            </Typography>
        </Box>

        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'start',flexDirection:'column',pt:7,width:'93%',mr:2}}>

            <Box sx={{display:'flex',width:'100%'}}>
                <Input value = {name} placeholder="이름을 입력해주세요" onChange={handleName} sx={{width:'100%',fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'22px'}}/>   
            </Box>

            <Box sx={{display:'flex',width:'100%',mt:5}}>
                <Input value = {number} placeholder="전화번호를 입력해주세요" onChange={handlenumber} sx={{width:'100%',fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'22px'}}/>   
            </Box>
        </Box>

        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', position:"absolute",bottom:30,minWidth:'360px',mr:2,maxWidth:'420px',width:"100%"}}>
            <Button onClick={navigateToRegisterName} variant="contained" color='primary' disabled={!isButtonEnabled} sx={{width:'90%',height:'50px',borderRadius:3}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'19px',fontWeight:'500'}}>
                    인증번호 발송
                </Typography>
            </Button>
        </Box>
            
        <Drawer open={open} setOpen={setOpen} setModalOpen={setModalOpen} setError={setError}/>

        {
            loading?
            <Box sx={{position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',pr:2}}>
                <CircularProgress color="primary"/>
            </Box>
            :
            ""
        }

        <Box>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                disableScrollLock
            >
                <Box sx={style}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                    {error}
                </Typography>
                </Box>
            </Modal>
        </Box>

    </Box>    
    )
}


export default Auth(Login,false,'/');