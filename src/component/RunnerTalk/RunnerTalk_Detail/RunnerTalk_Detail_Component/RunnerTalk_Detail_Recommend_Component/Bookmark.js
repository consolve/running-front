import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {runningTalkBookMark} from "../../../../../API/api/RunningTalk/runningTalk_api"
import { useRecoilState } from 'recoil';
import { RunnerTalkDetail_isBookMarked} from '../../../../../state/RunnerTalk/RunnerTalk_Detail_State';
import {Box,Typography} from '@mui/material';
import { useState } from 'react';

export default function Like({point,id}){
    const [bookmarkPoint,setBookmarkPoint] = useState(point);
    const [isBookmarked,setidBookmarked] = useRecoilState(RunnerTalkDetail_isBookMarked);
    const sessionid = localStorage.getItem('sessionid');

    const CommentLikeFunction = async (id,session) => {
        const response = await runningTalkBookMark(id,session);

        if(response.data.message === "Bookmark saved"){
            setidBookmarked(prev=>prev = true)
            setBookmarkPoint(prev=>prev = prev+1)
        }
        else{
            setidBookmarked(prev=>prev = false)
            setBookmarkPoint(prev=>prev = prev-1)
        }
    }

    const bookMark = async (id) =>{
        const response = await runningTalkBookMark(id,sessionid);
        if(response.response){
            return false;
        }
        else{
            return true;
        }
    }

    const onClickBookMart = (id,event) =>{
        event.stopPropagation();
        if(bookMark(id)){
            {
                isBookmarked?
                setBookmarkPoint(prev=>prev = prev-1)
                :
                setBookmarkPoint(prev=>prev = prev+1)
            }
            setidBookmarked(prev=>prev = !prev)
        }
    }

    

    return(
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',ml:1}}>
            {isBookmarked?
                <BookmarkIcon onClick={(e)=>onClickBookMart(id,e)} sx={{width:'21px',height:'21px',cursor:'pointer'}}/>
                :
                <BookmarkBorderIcon onClick={(e)=>onClickBookMart(id,e)} sx={{width:'21px',height:'21px',cursor:'pointer'}}/>
            }
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px',lineHeight:"normal",ml:"3px"}}>
                {bookmarkPoint}
            </Typography>
            
        </Box>
    )
}