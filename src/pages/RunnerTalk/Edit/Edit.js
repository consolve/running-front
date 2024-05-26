import {Box,Typography,Divider,Backdrop, CircularProgress} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import { useNavigate } from "react-router-dom";
import TopBar from "../../../component/Community/Post_Component/RunnerTalk_Write_TopBar";
import { fetchRunnerTalkCategory, fetchRunnerTalkCPostDetail,UpdatePost } from '../../../API/api/RunningTalk/runningTalk_api';
import { API_URL } from '../../../API/URL';
import CancelIcon from '@mui/icons-material/Cancel';
import Drawer from "../../../component/Community/Post_Component/RunnerTalk_Write_Drawer"
import Header from "../../../component/Community/Post_Component/RunnerTalk_Write_Header"
import Content from "../../../component/Community/Post_Component/RunnerTalk_Write_Content"
import SetImage from "../../../component/Community/Post_Component/RunnerTalk_Write_Image"
import Error from "../../../component/Error/ErrorModal";
import {useParams} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
    RunnerTalk_Write_Category,
    RunnerTalk_Write_Image,
    RunnerTalk_Write_Content,
    RunnerTalk_Write_Header,
    RunnerTalk_Write_Id
} from "../../../state/RunnerTalk/RunnerTalk_Write_State"
import {
    getBase64FromUrl
} from "../../../Util/imageType"


import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';

function RunnerTalk(){
    //카테고리 이름
    const [checkCategory,setCheckCategory] = useRecoilState(RunnerTalk_Write_Category);
    const [title,setTitle] = useRecoilState(RunnerTalk_Write_Header);
    const [content,setContent] = useRecoilState(RunnerTalk_Write_Content);
    const [Base64s, setBase64s] = useRecoilState(RunnerTalk_Write_Image);
    const [postId,setPostId] = useRecoilState(RunnerTalk_Write_Id);

    const { id } = useParams();
    const navigate = useNavigate();
    const session = localStorage.getItem("sessionid");

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

    const handleConvert = async (url) => {
        try {
            const base64String = await getBase64FromUrl(`${process.env.REACT_APP_URL}${url}`);
            return base64String;
        } catch (error) {
            console.error('이미지를 base64로 변환하는 중 오류 발생:', error);
        }
    };

    const FetchDetail = async () =>{
        const [_RunnerTalkDetail] = await fetchRunnerTalkCPostDetail(id,session);

        if(_RunnerTalkDetail.response){
            setError(_RunnerTalkDetail.response.status)
            setErrorOpen(true)
        }
        else{
            const _id = _RunnerTalkDetail.id;
            const _category = _RunnerTalkDetail.category;
            const _title = _RunnerTalkDetail.title;
            const _content = _RunnerTalkDetail.content;
            const _images = _RunnerTalkDetail.images;

            const convertImages = []

            for(const item of _images){
                const convertImage = await handleConvert(`${item.img}`);
                convertImages.push(convertImage);
            }

            setPostId(prev=>prev=_id);
            setCheckCategory(prev=>prev=_category);
            setTitle(prev=>prev=_title);
            setContent(prev=>prev=_content);
            setBase64s(prev=>prev=convertImages);

        }
    }

    const FetchRunnerTalkCategoryFunction = async () => {
        const _Category = await fetchRunnerTalkCategory();

        if(_Category.response){

            switch(_Category.response.status){
                case 401:
                    localStorage.removeItem("sessionid");
                    navigate("/login");
                    break;
                case 409:
                    setError("카테고리를 불러오는 중 오류가 발생했습니다.")
                    break;
                default:
                    setError(_Category.response.status)
            }

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

    const deleteImage = (index) =>{
        setBase64s(Base64s.filter((_,i)=>i!==index));
    }

    useEffect(() =>{
        window.scrollTo({top:0})
        FetchRunnerTalkCategoryFunction();
        FetchDetail();
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
            <TopBar handlePost={UpdatePost} setError = {setError} setErrorOpen={setErrorOpen} setLoading = {setLoading}/>
           
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
                        Base64s&&
                        <Swiper
                            spaceBetween={5}
                            modules={[FreeMode]}
                            slidesPerView={'auto'}
                            freeMode={{enabled: true}}	// 추가
                            style={{paddingLeft:"20px",paddingRight:"20px"}}
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
                    }
                </Box>

            </Box>
            
            <Error error={error} open={errorOpen} handleClose={handleClose}/>
            
            <SetImage/>
        </Box>    
    )
}

export default Auth(RunnerTalk,null);
