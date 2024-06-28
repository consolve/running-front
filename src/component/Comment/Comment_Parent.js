import {Box,Avatar,Typography} from '@mui/material';
import React, { useState,useCallback } from "react";
import { API_URL } from '../../API/URL';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import {useNavigate} from "react-router-dom";
import Like from "./component/Like"

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

export default function Parent({setHeight,mainComment,LikeFunction}){

    const navigate = useNavigate();
    
    const [likePoint,setlikePoint] = useState(mainComment.likePoint);
    const sessionid = localStorage.getItem('sessionid');

    const useGettingHeight = () => {
      
        const ref = useCallback((node) => {     
          if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
          }
        }, []);
      
        return [ ref];
      };
      
      // ...
      
    const [ ref] = useGettingHeight();

    return(
        <Box ref = {ref} sx={{display:'flex',alignItems:'start',px:2,py:1.5,backgroundColor:"#D9D9D9"}}>
            <Box sx={{height:'100%',mt:0.5}}>
                <Avatar src={`${API_URL}${mainComment.user_profile}`} sx={{width:'20px',height:'20px',mr:1}}/>
            </Box>
            <Box sx={{flex:1}}>
                <Box sx={{display:'flex'}}>
                    <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px',lineHeight:"14px"}}>
                        {mainComment.user_nickname}{" -"}
                    </Typography>
                    <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px',ml:0.5,lineHeight:"14px"}}>
                        {timeForToday(mainComment.created)}
                    </Typography>
                </Box>
                <Box sx={{width:"100%",my:'8px'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#000000',lineHeight:"16px",whiteSpace:'normal',wordBreak:'break-all'}}>
                        {mainComment.comment}
                    </Typography>
                </Box>
                <Box sx={{display:"flex"}}>
                    <Like handleLike={LikeFunction} item={mainComment}/>
                    <Box sx={{display:'flex',alignItems:'center',height:'14px',ml:'11px'}}>
                        <ModeCommentOutlinedIcon sx={{width:'16px',height:'16px',mr:0.3}}/>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',height:'100%'}}>
                            {mainComment.commentPoint}
                        </Typography>
                    </Box>
                </Box>
                
            </Box>
        </Box>
    )
}