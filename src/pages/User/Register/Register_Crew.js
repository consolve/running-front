import {Box,Typography,Button,Input,CircularProgress} from '@mui/material';
import React, { useState } from "react";
import Auth from '../../../hoc/auth';
import { useNavigate } from "react-router-dom";
import {useRecoilState} from 'recoil';
import {
    User_Crew
} from '../../../state/User/UserLogin_State';
import Drawer from "./Register_Confirm_Drawer"
import WestIcon from '@mui/icons-material/West';
import {Modal} from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import Error from '../../../component/Error/ErrorModal';


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

function Login(){

    const navigate = useNavigate(); 
    const [crew,setCrew] = useRecoilState(User_Crew);

    const [error,setError] = useState();
    const [errorOpen,setErrorOpen] = useState(false);

    const [Modalopen, setModalOpen] = React.useState(false);
    const [open,setOpen] = useState(false);

    const handleCrew = (e) =>{
        if(e.target.value.length <= 10){
            setModalOpen(false);
        }
        else{
            setModalOpen(true);  
        }
        setCrew(e.target.value);
    }

    const handleOpen = () =>{
        if(crew.length > 10){
            setModalOpen(true);
            return;
        }
        setOpen(true);
    }

    const handleCloseError = () =>{
        setErrorOpen(false);
    }

    const navigateToBack = () =>{
        navigate(-1);
    }

    return(
      <Box sx={{position:'relative',display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'100vh',flexDirection:'column',pl:2}}>
        
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'start',width:'100%',maxWidth:'420px',minWidth:'360px',height:'80px'}}>
            <Box onClick = {navigateToBack} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <WestIcon sx={{}}/>
            </Box>
        </Box>

        <Box sx={{width:'100%',pt:3}}>
            <Typography color = "primary.main" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'28px'}}>
                환영합니다!
            </Typography>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'28px',mt:3}}>
                혹시 가입된
            </Typography>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'28px'}}>
                러닝크루가 있으신가요?
            </Typography>
            
        </Box>
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',flexDirection:'column',pt:2,width:'100%'}}>
            <Box sx={{display:'flex',width:'100%',mt:5,position:'relative',alignItems:'center'}}>
                <Input value = {crew} placeholder="10자 내로 입력해주세요." onChange={handleCrew} sx={{width:"100%",fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'23px',mr:2}}/>
                <Box sx={{position:'absolute',right:'20px',display:'flex',alignItems:'center',height:'100%',mr:2}}>
                    <Typography color = "#C4C9CF" sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'23px'}}>
                        {crew.length}{"/10"}
                    </Typography>
                </Box>  
            </Box>
        </Box>

        {
            Modalopen&&
            <AnimatedBox sx={{width:"100%"}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px',color:"red"}}>
                    {"크루 이름은 10자 이내로 입력해주세요."}
                </Typography>
            </AnimatedBox>
        }

        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', position:"absolute",bottom:30,minWidth:'360px',maxWidth:'420px',mr:2,width:"100%"}}>
            <Button onClick={handleOpen} variant="contained" color='primary' disabled={!crew} sx={{width:'90%',height:'50px',borderRadius:3}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'19px',fontWeight:'500'}}>
                    다음
                </Typography>
            </Button>
        </Box>

        <Drawer open={open} setOpen={setOpen} setError={setError} setModalOpen={setErrorOpen}/>

        <Error error={error} open={errorOpen} setOpen={setErrorOpen} handleClose={handleCloseError}/> 
        
      </Box>    
    )
}


export default Auth(Login,false);