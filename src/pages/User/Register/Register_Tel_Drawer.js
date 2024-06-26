import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography,Input,Button,TextField } from '@mui/material';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {SmsCheckCode,SmsSendCode} from '../../../API/api/Login/user_api';
import {useRecoilState} from 'recoil';
import {
    User_Number
} from '../../../state/User/UserLogin_State';
import {Modal} from '@mui/material';


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

const getSeconds = (time) => {
    const seconds = Number(time % 60);
    if(seconds < 10) {
        return "0" + String(seconds);
    } else {
        return String(seconds);
    }
}



export default function TemporaryDrawer(props) {

    const navigate = useNavigate();
    const [otp,setOtp] = useState();
    const [number,setNumber] = useRecoilState(User_Number);

    const DrawerTheme = {
        width:'100%',
        height:'600px',
        minWidth:'360px',
        maxWidth:'450px',
        borderTopLeftRadius:20,
        borderTopRightRadius:20, 
        backgroundColor:'#ffffff',
        display:'flex',
        justifyContent:'start',
        alignItems:'center',
        flexDirection:'column',
    }

    const [time, setTime] = useState(300); // 남은 시간 (단위: 초)

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);

        if(time === 0) {
            clearInterval(timer);
        }


        return () => clearInterval(timer);
    }, [time]);

    const handleOtp = (event) => {
        const input = event.target.value.replace(/[^0-9]/g, '');
        setOtp(input);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }
        props.setOpen((prev)=>prev=open);
        console.log(props.open)
    };

    const reSendOtp = async () =>{
        const res = await SmsSendCode(number);
        setTime((prev)=>prev=300);

        if(res.status===200){
            return;
        }
        else{
            props.setError(res.response.status);
            props.setModalOpen(true);
        }
    }

    const checkOtp = async () =>{
        const res = await SmsCheckCode(otp,number);

        let message = "";

        if(res.response){
            message = res.response.data.error;
        }
        else{
            message = res.data.success;
        }

        switch(message){
            case "correct code":
                navigate('/register/nickname');
                break;
            case "Invalid code.":
                props.setError("인증번호가 일치하지 않습니다.");
                props.setModalOpen(true);
                return;
            case 'Code has expired.':
                props.setError("인증번호가 만료되었습니다.");
                props.setModalOpen(true);
                return;
            default:
                props.setError("알 수 없는 오류가 발생했습니다.");
                props.setModalOpen(true);
                return;
        }
    }

    useEffect(()=>{
        setTime((prev)=>prev=300);
    },[props.open])

    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center'}}
        role="presentation"
        >
            <Box sx={DrawerTheme}>
                <Box sx={{width:'90%',display:'flex',mt:5}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'23px'}}>
                        인증번호를 입력해주세요.
                    </Typography>
                </Box>

                <Box sx={{display:'flex',width:'90%',mt:5,position:'relative',alignItems:'center'}}>
                    <Input type='tel' pattern="[0-9]" onChange={handleOtp} sx={{width:'100%',fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'22px'}}/>
                    <Box sx={{position:'absolute',right:'85px',display:'flex',alignItems:'center',height:'100%'}}>
                        <Typography color = "#C4C9CF" sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'15px'}}>
                            {parseInt(time/60)}:{getSeconds(time)}
                        </Typography>
                    </Box>   
                    <Button onClick={!otp?reSendOtp:checkOtp} color={!otp?'gray':"primary"} variant="contained"  sx={{position:'absolute',right:0,bottom:'5px',height:'38px',width:'72px',boxShadow:0}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'15px'}}>
                            {otp? "확인" : "재요청"}
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:"center"}}>
            <React.Fragment>
                <Drawer
                    PaperProps={{
                        sx: {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        }
                    }}
                    anchor={'bottom'}
                    open={props.open}
                    onClose={toggleDrawer(false)}
                >   
                    {list()}
                </Drawer>
            </React.Fragment>

        
        </Box>
    );
}
