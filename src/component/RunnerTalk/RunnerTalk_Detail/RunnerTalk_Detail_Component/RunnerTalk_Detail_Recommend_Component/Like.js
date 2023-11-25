import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {runningTalkLike} from "../../../../../API/api/RunningTalk/runningTalk_api"
import { useRecoilState } from 'recoil';
import { RunnerTalkDetail_isLiked } from '../../../../../state/RunnerTalk/RunnerTalk_Detail_State';
import {Box,Typography} from '@mui/material';
import { useState } from 'react';

export default function Like({point,id}){
    const [likePoint,setlikePoint] = useState(point);
    const [isliked,setisliked] = useRecoilState(RunnerTalkDetail_isLiked);
    const sessionid = localStorage.getItem('sessionid');

    const CommentLikeFunction = async (id,session) => {
        const response = await runningTalkLike(id,session);
        console.log(response)

        if(response.data.message === "Request success"){
            setisliked(prev=>prev = true)
            setlikePoint(prev=>prev = prev+1)
        }
        else{
            setisliked(prev=>prev = false)
            setlikePoint(prev=>prev = prev-1)
        }
    }

    return(
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            {isliked === true ?
                <ThumbUpAltIcon onClick={()=>CommentLikeFunction(id,sessionid)} sx={{width:'21px',height:'21px',cursor:'pointer'}}/>
                :
                <ThumbUpOffAltOutlinedIcon onClick={()=>CommentLikeFunction(id,sessionid)} sx={{width:'21px',height:'21px',cursor:'pointer'}}/>
            }
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px',lineHeight:"normal",ml:"3px"}}>
                {likePoint}
            </Typography>
            
        </Box>
    )
}