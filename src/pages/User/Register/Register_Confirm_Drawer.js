import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography,Input,Button,TextField,Divider,CircularProgress } from '@mui/material';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import {UserRegister,UserLogin} from '../../../API/api/Login/user_api';
import {useRecoilState} from 'recoil';
import {
    User_Name,
    User_Number,
    User_NickName,
    User_Crew
} from '../../../state/User/UserLogin_State';
import {Modal} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoadingButton from '@mui/lab/LoadingButton';
import Personal from '../../../component/Term/privacy';
import Service from "../../../component/Term/Service";


export default function TemporaryDrawer(props) {

    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

    const [name,setName] = useRecoilState(User_Name);
    const [number,setNumber] = useRecoilState(User_Number);
    const [nickName,setNickName] = useRecoilState(User_NickName);
    const [crew,setCrew] = useRecoilState(User_Crew);

    const [service,setService] = useState(false);
    const [information,setInformation] = useState(false);
    const [marketing,setMarketing] = useState(false);
    const [personalTerm,setPersonalTerm] = useState(false);
    const [serviceTerm,sestServiceTerm] = useState(false);
    
    const DrawerTheme = {
        width:'100%',
        height:'700px',
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

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }
        props.setOpen((prev)=>prev=open);
    };

    const allConfirm = (e) => {
        setService(e.target.checked);
        setInformation(e.target.checked);
        setMarketing(e.target.checked);
    }

    const handleChange1 = (e) => {
        setService(e.target.checked);
    }

    const handleChange2 = (e) => {
        setInformation(e.target.checked);
    }

    const handleChange3 = (e) => {
        setMarketing(e.target.checked);
    }

    const handlePrivacyTerm = () => {
        navigate("/term/privacy");
    }

    const handleServiceTerm = () => {
        navigate("/term/service")
    }

    const RegisterUser = async () =>{
        setLoading(true);

        if(name===""||number===""||nickName===""||crew===""||service===false||information===false){
            props.setError("모든 항목을 입력해주세요");
            props.setModalOpen(true);
            setLoading(false);
            return;
        }

        const response = await UserRegister(name,number,nickName,crew,service,information,marketing);

        if(response.response){

            switch(response.response.status){
                case 400:
                    props.setError("이미 존재하는 유저입니다.");
                    props.setModalOpen(true);
                    break;
                case 401:
                    props.setError("필수 항목을 입력해주세요");
                    props.setModalOpen(true);
                    break;
                case 500:
                    props.setError("서버 오류입니다. 잠시 후 다시 시도해주세요");
                    props.setModalOpen(true);
                    break;
                default:
                    props.setError("알 수 없는 오류입니다. 잠시 후 다시 시도해주세요");
                    props.setModalOpen(true);
                    break;
            }

            setLoading(false);
        }
        
        else{
            window.localStorage.setItem('sessionid', response.data.access);
            window.localStorage.setItem('profile', response.data.user.profile);
            setName("");
            setNumber("");
            setNickName("");
            setCrew("");
    
            setLoading(false);
            navigate('/');
        }

    }

    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center'}}
        role="presentation"
        >
            <Box sx={DrawerTheme}>
                <Box sx={{width:'90%',display:'flex',mt:5,flexDirection:'column',justifyContent:"center"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'23px'}}>
                        약관에 동의해주세요
                    </Typography>
                    <Typography color='#9BA0A9' sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'17px',width:"290px"}}>
                        러너님의 러닝라이프를 한 층더 업그레이드 할 수 있어요
                    </Typography>
                </Box>  

                <Box sx={{display:'flex',width:'95%',mt:3,position:'relative',alignItems:'center'}}>
                   <Box>
                        <Box sx={{display:'flex',alignItems:'center'}}>
                            <Checkbox checked={service&&information&&marketing} onChange={allConfirm} icon={<CheckCircleIcon sx={{color:"#D7D8E0"}}/>} checkedIcon={<CheckCircleIcon sx={{color:'primary.main'}} />} />
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'20px'}}>
                                모두 동의
                            </Typography>
                        </Box>
                        <Typography color='#9BA0A9' sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',ml:'42px'}}>
                            서비스 이용을 위해 아래 약관에 모두 동의 합니다.
                        </Typography>
                   </Box>
                </Box>

                <Divider sx={{width:"95%",mt:2}}/>

                <Box sx={{display:'flex',flexDirection:"column",justifyContent:"center",width:'95%',mt:2}}>
                    <Box sx={{display:'flex',position:'relative',alignItems:'center',justifyContent:"space-between"}}>
                        <Box sx={{display:'flex',alignItems:'center'}}>
                            <Checkbox checked={service} onChange={handleChange1} icon={<CheckCircleIcon sx={{color:"#D7D8E0"}}/>} checkedIcon={<CheckCircleIcon sx={{color:'primary.main'}} />} />
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'17px'}}>
                                (필수) 서비스 이용약관 동의
                            </Typography>
                        </Box>
                        <Box
                        onClick={handleServiceTerm}
                        sx={{display:"flex",alignItems:"center",pr:'9px'}}>
                            <Typography 
                                sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:"#C4C9CF"}}>
                                보기
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{display:'flex',position:'relative',alignItems:'center',justifyContent:"space-between"}}>
                        <Box sx={{display:'flex',alignItems:'center'}}>
                            <Checkbox checked={information} onChange={handleChange2} icon={<CheckCircleIcon sx={{color:"#D7D8E0"}}/>} checkedIcon={<CheckCircleIcon sx={{color:'primary.main'}} />} />
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'17px'}}>
                                (필수) 개인정보 처리방침 동의
                            </Typography>
                        </Box>
                        <Box
                        onClick={handlePrivacyTerm}
                        sx={{display:"flex",alignItems:"center",pr:'9px'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:"#C4C9CF"}}>
                                보기
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{display:'flex',position:'relative',alignItems:'center'}}>
                        <Box sx={{display:'flex',alignItems:'center'}}>
                            <Checkbox checked={marketing} onChange={handleChange3} icon={<CheckCircleIcon sx={{color:"#D7D8E0"}}/>} checkedIcon={<CheckCircleIcon sx={{color:'primary.main'}} />} />
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'17px'}}>
                                (선택) 마케팅 수신 동의
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', position:"absolute",bottom:30,minWidth:'360px',maxWidth:'420px',width:"100%"}}>
                    {
                        loading?
                        <LoadingButton loading variant="contained" color='primary' sx={{width:'90%',height:'50px',borderRadius:3}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'19px',fontWeight:'500'}}>
                                다음
                            </Typography>
                        </LoadingButton>
                        :
                        <Button disabled={!(service&&information)} onClick={RegisterUser} variant="contained" color='primary' sx={{width:'90%',height:'50px',borderRadius:3}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'19px',fontWeight:'500'}}>
                                다음
                            </Typography>
                        </Button>
                    }
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

            {
                personalTerm &&
                <Personal handleClose={handlePrivacyTerm}/>
            }

            {
                serviceTerm &&
                <Service handleClose={handleServiceTerm}/>
            }

        </Box>
    );
}
