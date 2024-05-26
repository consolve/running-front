import {Box,Typography,Modal,CircularProgress} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import Title from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_Title"
import TopBar from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_TopBar"
import { useNavigate } from "react-router-dom";
import User from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_User"
import Navbar from './RunnerTalk_Detail_Component/RunnerTalk_Detail_Navbar';
import DetailContent from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_Content"
import Image from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_Image"
import DetailTitle from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_Detail_Title"
import Comment from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_Comment"
import { useParams } from "react-router-dom";
import {fetchRunnerTalkCPostDetail,UpdateRunningTalkView,fetchRunnerTalkCategory,checkWriter} from "../../../API/api/RunningTalk/runningTalk_api"
import axios from 'axios';
import { useRecoilState } from 'recoil';
import {RunnerTalkDetail_Comment, RunnerTalkDetail_Comment_Order} from "../../../state/RunnerTalk/RunnerTalk_Comment_State"
import { RunnerTalkDetail_isLiked,RunnerTalkDetail_isBookMarked } from '../../../state/RunnerTalk/RunnerTalk_Detail_State';
import Recommend from "./RunnerTalk_Detail_Component/RunnerTalk_Detail_Recommend"

import Error from "../../../component/Error/ErrorModal";

function RunnerTalk_Detail(){

    const { id } = useParams();
    const session = localStorage.getItem('sessionid');

    const navigate = useNavigate();

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [isWriter,setIsWriter] = useState(false);
    const [loading,setLoading] = useState(true);
    const [categoryLoading,setCategoryLoading] = useState(true);
    const [error,setError] = useState("");
    const [open, setOpen] = React.useState(false);
    const [detail,setDetail] = useState({});
    const [category, setCategory] = useState([]);
    const [comment,setComment] = useRecoilState(RunnerTalkDetail_Comment);
    const [commentOrder,setCommentOrder] = useRecoilState(RunnerTalkDetail_Comment_Order);
    const [isBookmark,setIsBookmark] = useRecoilState(RunnerTalkDetail_isBookMarked);
    const [isLike,setIsLike] = useRecoilState(RunnerTalkDetail_isLiked);


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };

    const CheckWriter = async () => {
        const response = await checkWriter(session,id);

        if(response.response){
            setError(response.response?response.response.status:"")
            setOpen(true);
        }
        else{
            setIsWriter(response);
        }
    }
            

    const FetchRunnerTalkCategory = async () => {
        const _Category = await fetchRunnerTalkCategory();

        if(_Category.response){
            return;
        }
        else{
            setCategory(prev=>prev=_Category)
        }
        setCategoryLoading(false);
    }

    const FetchDetail = async () => {
        const [_RunnerTalkDetail,_RunnerTalkisBookMarked,_RunnerTalkisLiked] = await fetchRunnerTalkCPostDetail(id,session);


        if(_RunnerTalkDetail.response){
            setError(_RunnerTalkDetail.response?_RunnerTalkDetail.response.status:"")
            setOpen(true);
        }
        else{
            setDetail(_RunnerTalkDetail);
            setIsBookmark(_RunnerTalkisBookMarked.bookmarked);
            setIsLike(_RunnerTalkisLiked.liked);
            setComment(prev=>prev=_RunnerTalkDetail.comments);
        }

        setLoading(false);
    }
    
    useEffect(()=>{
        window.scrollTo({top:0})
        setLoading(true);
        setCategoryLoading(true);
        FetchDetail();
        FetchRunnerTalkCategory();
        CheckWriter();

        UpdateRunningTalkView(session,id);
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%'}}>
            <TopBar detail={detail}/>
            <Box sx={{width:'100%',mb:'54px',mt:'61px'}}>
                {
                    loading||categoryLoading?
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',flexDirection:'column',height:"500px"}}>
                        <CircularProgress color="primary" />
                    </Box>
                    :
                    <Box sx={{width:"100%"}}>
                    {
                        detail!=0?
                        <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                            {
                                detail!=0?
                                <Box sx={{width:"100%"}}>
                                    <Title isWriter={isWriter} detail = {detail} category={category} setOpen={setOpen} setError={setError}/>
                                    <User detail = {detail}/>
                                    <Box sx={{width:"100%"}}>
                                        <DetailTitle detail = {detail}/>
                                        <DetailContent detail = {detail}/>
                                        {
                                            detail.images.length!==0?
                                            <Image detail={detail}/>
                                            :
                                            ""
                                        }
                                    </Box>

                                    <Recommend detail={detail}/>
                                        
                                    <Comment detail={detail} setError = {setError} setOpen={setOpen}/>
                                </Box>
                                :
                                <Box sx={{width:'100%',height:"500px",display:'flex',justifyContent:"center",alignItems:"center"}}>
                                    error
                                </Box>
                            }
                        </Box>   
                        :
                        <Box sx={{width:'100%',height:'300px',backgroundColor:'#4F1D76'}}>
                        </Box>
                    }
                    </Box>
                }
            </Box>

            <Error error={error} open={open} handleClose={handleClose}/>

            <Navbar detail ={detail} setError = {setError} setOpen={setOpen}/>
        </Box>    
    )
}

export default Auth(RunnerTalk_Detail,null);