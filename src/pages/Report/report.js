import {Box,Typography,Divider,Backdrop, CircularProgress} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../hoc/auth"
import { useNavigate } from "react-router-dom";
import TopBar from "./_component/TopBar";
import { reportApi } from '../../API/api/Profile/report_api';
import CancelIcon from '@mui/icons-material/Cancel';
import Header from "./_component/Header"
import Content from "./_component/Content"
import SetImage from "./_component/Image"
import Error from "../../component/Error/ErrorModal";
import Submit from "./_component/Submit"


import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';

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

function Report({isUpdate=false}){

    const navigate = useNavigate();

    const session = localStorage.getItem('sessionid');

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [loading,setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [header,setHeader] = useState("");
    const [content,setContent] = useState("");


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };

    const [errorOpen, setErrorOpen] = React.useState(false);
    const [error,setError] = useState("");
    const [Base64s, setBase64s] = React.useState([]);

    const deleteImage = (index) =>{
        setBase64s(Base64s.filter((_,i)=>i!==index));
    }

    const fetchReport = async () =>{
        setLoading(true);

        const body = {
            "title":header,
            "content":content,
            "images":Base64s
        }

        const response = await reportApi(session,body);
        console.log(response);


        if(response.response){
            setError(response.response.status)
            setErrorOpen(true)
        }
        else{
            setLoading(false);
            navigateToBack();
        }
    }

    useEffect(() =>{
        window.scrollTo({top:0})
    },[])

    useEffect(() => {
        return () => {
            setBase64s([]);
        };
      }, [])


    return(
        <Box sx={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar setError = {setError} setErrorOpen={setErrorOpen} />
           
            <Box sx={{width:"100%",mb:'70px',mt:'62.4px'}}>

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
                        문의 및 신고
                    </Typography>

                    <Divider sx={{color:"#EDEDED",wdith:"100%"}}/>
                </Box>
                
                <Box sx={{px:"20px"}}>
                    <Header setHeader = {setHeader}/>                   

                    <Content setContent={setContent} placeholder={"자세한 문의 및 신고내용을 입력해주세요"}/>
                </Box>

                <Box sx={{width:"100%",my:1}}>
                    {
                        Base64s.length !==0?
                        <Swiper
                            spaceBetween={5}
                            modules={[FreeMode]}
                            slidesPerView={'auto'}
                            freeMode={{enabled: true}}	// 추가
                            style={{paddingLeft:"20px",paddingRight:"20px"}}
                            cssMode={true}
                        >
                            {
                                Base64s.map((item,index)=>{
                                    return(
                                        <SwiperSlide key={index} className='shoes left-margin-0'>
                                            <CancelIcon onClick={()=>deleteImage(index,setBase64s,Base64s)} color = "primary" sx={{position:'absolute',top:0,right:0,zIndex:10}}/>
                                            <Box sx={{position:"relative",width:'100%',display:'flex',alignItems:"center",flexDirection:"column",alignItems:"start"}}>
                                                <Box sx={{position:'relative'}}>
                                                    <Box sx={{width:'170px',height:'170px',backgroundColor:'#4F1D76',borderRadius:3,mx:'auto',backgroundImage:`url(${item})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                                </Box>
                                            </Box>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                        :
                        ""
                    }
                </Box>

            </Box>
            
            <Error error={error} open={errorOpen} handleClose={handleClose}/>
            
            <SetImage setBase64s={setBase64s} Base64s={Base64s} />

            <Submit header={header} content={content} onClick={fetchReport}/>

        </Box>    
    )
}

export default Auth(Report,null);
