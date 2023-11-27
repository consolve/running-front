import {Box,Typography} from "@mui/material";
import React, { useState,useRef,useEffect } from "react";
import {API_URL} from '../../API/URL/index';
import Avatar from '@mui/material/Avatar';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import styled from "styled-components"


function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}



export default function Comment({item,toggleChildCommentDrawer,LikeFunction}){
    const [likePoint,setlikePoint] = useState(item.likePoint);
    const sessionid = localStorage.getItem('sessionid');
    const contentRef = useRef(null);
    const [isShowReadMore, setIsShowReadMore] = useState(false);

    const onClick = (e) => {
        contentRef.current.classList.add("show");
        setIsShowReadMore(false);
    };

    useEffect(()=>{
        if(item.comment.length > 200){
            setIsShowReadMore(true);
        }
    },[])

    const CommentLikeFunction = async (id,session) => {
        const response = await LikeFunction(id,session);

        if(response === "Request success"){
            setlikePoint(prev=>prev = prev+1)
        }
        else{
            setlikePoint(prev=>prev = prev-1)
        }
    
    }


    return(
        <Box sx={{display:'flex',alignItems:'start',px:2,py:1.5}}>
            <Box sx={{height:'100%',display:'block',mt:0.5}}>
                <Avatar src={`${API_URL}${item.user_profile}`} sx={{width:'20px',height:'20px',mr:1}}/>
            </Box>
            <Box sx={{flex:1}}>
                <Box sx={{display:'flex'}}>
                    <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px'}}>
                        {item.user}{" -"}
                    </Typography>
                    <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px',ml:0.5}}>
                        {timeForToday(item.created)}
                    </Typography>
                </Box>
                <Box sx={{width:"100%",mb:0.6}}>
                    <Ellipsis ref={contentRef}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#000000',whiteSpace:'normal',wordBreak:'break-all'}}>
                            {item.comment}
                        </Typography>
                    </Ellipsis>
                    <Box sx={{width:"90%",display:'flex',justifyContent:"start",alignItems:"center"}}>
                        {isShowReadMore && <Typography onClick={onClick} sx={{maxHeight:'17.9px',lineHeight:"25px",fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:'#A6A6A6'}}>...자세히 보기</Typography>}
                    </Box>
                </Box>
                <Box sx={{display:"flex",mt:1.5}}>
                    <Box onClick={()=>CommentLikeFunction(item.id,sessionid)} sx={{display:'flex',alignItems:'center',height:'14px'}}> 
                        <ThumbUpOffAltOutlinedIcon sx={{width:'16px',height:'16px',mr:0.3}}/>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',mr:1,height:'100%'}}>
                            {likePoint}
                        </Typography>
                    </Box>
                    <Box onClick={()=>toggleChildCommentDrawer(true,item.id)} sx={{display:'flex',alignItems:'center',height:'14px'}}>
                        <ModeCommentOutlinedIcon sx={{width:'16px',height:'16px',mr:0.3}}/>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',height:'100%'}}>
                            {item.commentPoint}
                        </Typography>
                    </Box>
                </Box>
                
            </Box>
        </Box> 
    )
}

const Ellipsis = styled.div`
  position: relative;
  display: -webkit-box;
  max-height: 80px;
  overflow: hidden;
  &.show {
    display: block;
    max-height: none;
    overflow: auto;
    -webkit-line-clamp: unset;
  }
`;