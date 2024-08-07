import {Box,Typography,Divider,Backdrop, CircularProgress} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import { useNavigate } from "react-router-dom";
import TopBar from "../../../component/Community/Post_Component/RunnerTalk_Write_TopBar";
import { fetchRunnerTalkCategory,FetchRunnerTalkPost } from '../../../API/api/RunningTalk/runningTalk_api';
import CancelIcon from '@mui/icons-material/Cancel';
import Drawer from "../../../component/Community/Post_Component/RunnerTalk_Write_Drawer"
import Header from "../../../component/Community/Post_Component/RunnerTalk_Write_Header"
import Content from "../../../component/Community/Post_Component/RunnerTalk_Write_Content"
import SetImage from "../../../component/Community/Post_Component/RunnerTalk_Write_Image"
import {useRecoilState} from 'recoil';
import {
    RunnerTalk_Write_Category,
    RunnerTalk_Write_Image,
    RunnerTalk_Write_Header,
    RunnerTalk_Write_Content
} from '../../../state/RunnerTalk/RunnerTalk_Write_State';
import Error from "../../../component/Error/ErrorModal";


import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';

function RunnerTalk({isUpdate=false}){
    const [title,setTitle] = useRecoilState(RunnerTalk_Write_Header);
    const [content,setContent] = useRecoilState(RunnerTalk_Write_Content);

    const navigate = useNavigate();

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [loading,setLoading] = useState(true);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };

    const FetchRunnerTalkCategoryFunction = async () => {
        const _Category = await fetchRunnerTalkCategory();

        if(_Category.response){
            setError(_Category.response.status)
            setErrorOpen(true)
        }
        else{
            setCategory(prev=>prev=_Category)
        }

        setLoading(false);
    }

    const [errorOpen, setErrorOpen] = React.useState(false);
    const [error,setError] = useState("");
    const [category,setCategory] = useState([]);
    //카테고리 이름
    const [checkCategory,setCheckCategory] = useRecoilState(RunnerTalk_Write_Category);

    const [Base64s, setBase64s] = useRecoilState(RunnerTalk_Write_Image);

    const deleteImage = (index) =>{
        setBase64s(Base64s.filter((_,i)=>i!==index));
    }

    useEffect(() =>{
        window.scrollTo({top:0})
        FetchRunnerTalkCategoryFunction();
    },[])

    useEffect(() => {
        return () => {
            setCheckCategory("");
            setBase64s([]);
            setContent("");
            setTitle("");
        };
      }, [])


    return(
        <Box sx={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar handlePost={FetchRunnerTalkPost} setError = {setError} setErrorOpen={setErrorOpen} setLoading = {setLoading}/>
           
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
                    <Drawer category ={category} setCheckCategory={setCheckCategory} open={open} setOpen={setOpen}/>
                }

                <Box onClick={handleOpen} sx={{px:"20px"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',my:'22px'}}>
                        {checkCategory?checkCategory:"주제를 선택해주세요"}
                    </Typography>

                    <Divider sx={{color:"#EDEDED",wdith:"100%"}}/>
                </Box>
                
                <Box sx={{px:"20px"}}>
                    <Header/>                   

                    <Content placeholder={"러너님의 러닝라이프를 공유해주세요"}/>
                </Box>

                <Box sx={{width:"100%",my:1}}>
                    {
                        Base64s.length !==0?
                        <Swiper
                            spaceBetween={5}
                            modules={[FreeMode]}
                            slidesPerView={'auto'}
                            freeMode={{enabled: true}}	// 추가
                            style={{paddingLeft:"20px",paddingRight:"20px",width:"auto"}}
                            cssMode={true}
                        >
                            {
                                Base64s.map((item,index)=>{
                                    return(
                                        <SwiperSlide key={index} className='shoes'>
                                            <Box sx={{width:"100%"}}>
                                                <CancelIcon onClick={()=>deleteImage(index,setBase64s,Base64s)} color = "primary" sx={{position:'absolute',top:0,right:0,zIndex:10}}/>
                                                <Box sx={{position:"relative",width:'100%',display:'flex',alignItems:"center",flexDirection:"column",alignItems:"start"}}>
                                                    <Box sx={{position:'relative'}}>
                                                        <Box sx={{width:'170px',height:'170px',backgroundColor:'#4F1D76',borderRadius:3,mx:'auto',backgroundImage:`url(${item})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                                    </Box>
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
            
            <SetImage/>
        </Box>    
    )
}

export default Auth(RunnerTalk,null);
