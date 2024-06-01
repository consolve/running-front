import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useRecoilState } from 'recoil';
import {Box,Typography,IconButton} from '@mui/material';
import { useState } from 'react';
import { set } from 'react-hook-form';

export default function Like({handleLike,item}){
    const [likePoint,setlikePoint] = useState(item.likePoint);
    const [isliked,setisliked] = useState(item.is_liked);
    const sessionid = localStorage.getItem('sessionid');


    const CommentLikeFunction = async (id,session) => {
        const response = await handleLike(id,session);

        if(response.message === "Request success"){
            setlikePoint(prev=>prev = response.like_point)
            setisliked(prev=>prev = !isliked)
        }
        else{
            setlikePoint(prev=>prev = response.like_point)
            setisliked(prev=>prev = !isliked)
        }
    
    }


    return(
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',height:"14px"}}>
            {isliked === true ?
                <IconButton onClick={()=>CommentLikeFunction(item.id,sessionid)} sx={{p:0}}>
                    <ThumbUpAltIcon sx={{width:'16px',height:'16px',mr:0.3,cursor:'pointer'}}/>
                </IconButton>
                :
                <IconButton onClick={()=>CommentLikeFunction(item.id,sessionid)} sx={{p:0}}>
                    <ThumbUpOffAltOutlinedIcon sx={{width:'16px',height:'16px',mr:0.3,cursor:'pointer'}}/>
                </IconButton>
            }
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',lineHeight:"1.5",ml:"3px"}}>
                {likePoint}
            </Typography>
            
        </Box>
    )
}