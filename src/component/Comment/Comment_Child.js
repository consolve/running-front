import {Box,Typography,Avatar} from '@mui/material';
import React, { useState } from "react";
import { API_URL } from '../../API/URL';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import {useNavigate} from "react-router-dom"

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

export default function ChildComment({item,LikeFunction}){
    const navigate = useNavigate();

    const [likePoint,setlikePoint] = useState(item.likePoint);
    const sessionid = localStorage.getItem('sessionid');

    const ChildCommentLikeFunction = async (id,session) => {
        if(!sessionid){
            navigate("/login/main")
        }

        const response = await LikeFunction(id,session);

        if(response === "Request success"){
            setlikePoint(prev=>prev = prev+1)
        }
        else{
            setlikePoint(prev=>prev = prev-1)
        }
    
    }


    return(
        <Box sx={{display:'flex',alignItems:'start',ml:'40px',my:1.5}}>
            <Box sx={{height:'100%',mt:0.5}}>
                <Avatar src={`${API_URL}${item.user_profile}`} sx={{width:'20px',height:'20px',mr:'12px',mb:4.5}}/>
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
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#000000',whiteSpace:'normal',wordBreak:'break-all'}}>
                        {item.comment}
                    </Typography>
                </Box>
                <Box sx={{display:"flex",mt:1}}>
                    <Box onClick={()=>ChildCommentLikeFunction(item.id,sessionid)} sx={{display:'flex',alignItems:'center',height:'14px'}}> 
                        <ThumbUpOffAltOutlinedIcon sx={{width:'16px',height:'16px',mr:0.3}}/>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',mr:1,height:'100%'}}>
                            {likePoint}
                        </Typography>
                    </Box>
                </Box>
                
            </Box>
        </Box> 
    )
}