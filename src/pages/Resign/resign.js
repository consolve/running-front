import {Box,Typography,Divider,Backdrop, CircularProgress} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../hoc/auth"
import { useNavigate } from "react-router-dom";
import TopBar from "./_component/TopBar";
import { reportApi } from '../../API/api/Profile/report_api';
import Error from "../../component/Error/ErrorModal";
import Submit from "./_component/Submit"
import Input from "./_component/Input"
import {resignApi} from "../../API/api/Profile/resign"  
import Modal from "./_component/Modal"

function Resign({isUpdate=false}){

    const navigate = useNavigate();

    const session = localStorage.getItem('sessionid');

    const navigateToBack  = () =>{
        navigate('/login/main');
    }

    const [loading,setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalOpen,setModalOpen] = useState(false);

    const [number,setNumber] = useState("");


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };
    const handleModalClose = () => {
        setModalOpen(false)
    }

    const handleNumber = (e) => {
        setNumber(e.target.value);
    }

    const [errorOpen, setErrorOpen] = React.useState(false);
    const [error,setError] = useState("");

    const fetchReport = async () =>{
        setLoading(true);

        const response = await resignApi(session,number);

        if(response.response){
            setError(response.response.status)
            setErrorOpen(true)
        }
        else{
            setLoading(false);
            localStorage.removeItem('sessionid');
            localStorage.removeItem('user_number');
            navigateToBack();
        }
    }

    useEffect(() =>{
        window.scrollTo({top:0})
    },[])

    return(
        <Box sx={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar setError = {setError} setErrorOpen={setErrorOpen} />
           
            <Box sx={{width:"100%",mb:'10px',mt:'62.4px'}}>

                {
                    loading?
                    <Backdrop
                        sx={{ color: '#fff', zIndex:1000 }}
                        open={true}
                        >
                        <CircularProgress color="primary" />
                    </Backdrop>
                    :
                    ""
                }

                <Box onClick={handleOpen} sx={{px:"20px"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px',my:'9px'}}>
                        회원 탈퇴
                    </Typography>

                    <Divider sx={{color:"#EDEDED",wdith:"100%"}}/>
                </Box>
                
                <Box sx={{px:"20px",pt:'30px'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px',my:'9px'}}>
                        계정 전화번호
                    </Typography>
                    
                    <Input handleNumber = {handleNumber}/>
                </Box>

                <Box sx={{px:"19px"}}>
                    <Typography color="#A6A6A6" sx={{fontFamily:'Pretendard Variable',fontWeight:'400',fontSize:'10px',my:'9px'}}>
                        악의적인 이용방지를 위하여 탈퇴 및 가입을 반복할 경우 서비스 이용이 제한될 수 있습니다.
                    </Typography>
                    
                    <Typography color="#A6A6A6" sx={{fontFamily:'Pretendard Variable',fontWeight:'400',fontSize:'10px',my:'9px'}}>
                        탈퇴 후 개인정보, 쓴 글 등 데이터가 삭제되며, 복구할 수 없습니다.
                    </Typography>

                    <Typography color="#A6A6A6" sx={{fontFamily:'Pretendard Variable',fontWeight:'400',fontSize:'10px',my:'9px'}}>
                        다시 가입하여도 이용 제한 기록은 초기화되지 않습니다.
                    </Typography>

                    <Typography color="#A6A6A6" sx={{fontFamily:'Pretendard Variable',fontWeight:'400',fontSize:'10px',my:'9px'}}>
                        작성한 글은 삭제되지 않으며, (알수없음)으로 닉네임이 표시됩니다.
                    </Typography>
                    

                </Box>

            </Box>
            
            <Modal open={modalOpen} handleClose = {handleModalClose}/>

            <Error error={error} open={errorOpen} handleClose={handleClose}/>

            <Submit number={number} onClick={fetchReport}/>

        </Box>    
    )
}

export default Auth(Resign,null);
