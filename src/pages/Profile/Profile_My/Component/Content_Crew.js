import {Grid,Box,Typography,IconButton} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {API_URL} from '../../../../API/URL/index';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { runningCrewBookMark } from '../../../../API/api/RunningCrew/crew_api';

import { keyframes } from '@mui/system';

const extractSentenceAfterWord = (text) => {
    const sentences = text.split('.');
    for (const sentence of sentences) {
      if (sentence.includes('일')) {
        const index = sentence.indexOf('일') + 2; // '일' 다음 문자부터 추출
        return sentence.slice(index).trim();
      }
    }
    return null; // '일'이 포함된 문장을 찾지 못한 경우
}

const vibrate = keyframes`
    from {
        transform: rotate(1deg);
    }
    to {
        transform: rotate(-1deg);
    }
`;
  
export default function Content({item,isVisible}){
    const [bookmark,setBookmark] = useState(item.bookmarked);
    const navigate = useNavigate();
    
    const session = window.localStorage.getItem('sessionid');

    const FetchBookMark = async (id) =>{
        const _savedCrew = await runningCrewBookMark(id,session);

        if(_savedCrew.response){

            return false;
        }
        else{
            return true;
        }
    }

    const onClickBookMark = (id,event) =>{
        event.stopPropagation();
        if(FetchBookMark(id)){
            setBookmark(prev=>prev=!bookmark)
        }
    }

    const navigateToCrewDetail = (id) =>{
        navigate(`/crew/detail/${id}`)
    }


    return(
        <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
            <Box onClick={()=>navigateToCrewDetail(item.id)} sx={{width:'100%',mb:1,display:'flex',flexDirection:'column',alignItems:"start",justifyContent:'center'}}>
                <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:'100%',pb:'100%',overflow:"hidden",borderRadius:'8px'}}>
                    <img src={`${API_URL}${item.mainImg}`} style={{position:"absolute",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
                    {
                        bookmark?
                        <IconButton onClick={(e)=>onClickBookMark(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                            <BookmarkIcon sx={{color:"primary.main"}}/>
                        </IconButton>
                        :
                        <IconButton onClick={(e)=>onClickBookMark(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                            <BookmarkBorderIcon sx={{color:"#ffffff"}}/>
                        </IconButton>
                    }
                </Box>
                <Box sx={{mt:1,mb:0,ml:0.5}}>
                        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                            {
                                item.activityAreaTag.map((item,index)=>{
                                    return(
                                        <Box key={index} sx={{backgroundColor:'primary.main',borderRadius:'6px',mr:'3px'}}>
                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'9px',color:'#ffffff',my:'2px',mx:'6px',lineHeight:"normal"}}>
                                                {item.name}
                                            </Typography>
                                        </Box>
                                    )
                            })
                            }      
                        </Box>

                        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',width:'100%',mt:'4px'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:"normal",whiteSpace:'pre-line',overflow:'hidden',textOverflow:'ellipsis',WebkitLineClamp:1,display:'-webkit-box',WebkitBoxOrient:'vertical'}}>
                                {item.name}
                            </Typography>
                            <Box sx={{display:'flex',mt:"4px"}}>
                                <Typography sx={{fontFamily:'Pretendard Variable',lineHeight:"normal",fontWeight:'300',fontSize:'13px',color:'#606060',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                    정기런&nbsp;{'|'}&nbsp;{item.regularRun}
                                </Typography>
                                
                            </Box>

                            <Box sx={{display:'flex',mt:'2px'}}>
                                <Typography sx={{fontFamily:'Pretendard Variable',lineHeight:"normal",fontWeight:'300',fontSize:'13px',color:'#606060',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                    시간&nbsp;{'|'}&nbsp;{item.runningTime}
                                </Typography>
                            </Box>
                        </Box>
                </Box>
            </Box>
        </Grid>

    )
}