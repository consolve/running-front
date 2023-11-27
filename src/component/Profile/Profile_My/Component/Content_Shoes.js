import {Grid,Box,Typography,IconButton} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {API_URL} from '../../../../API/URL/index';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { runningShoesBookMark } from '../../../../API/api/RunningShoes/shoes_api'; 


function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function Content({item}){
    const [bookmark,setBookmark] = useState(item.bookmarked);
    const navigate = useNavigate();
    
    const session = window.localStorage.getItem('sessionid');

    const FetchBookMark = async (id) =>{
        const _savedCrew = await runningShoesBookMark(id,session);

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

    const navigateToShoesDetail = (id) =>{
        navigate(`/shoes/detail/${id}`)
    }

    return(
        <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
        <Box onClick={()=>navigateToShoesDetail(item.id)} sx={{width:'100%',mb:1,display:'flex',flexDirection:'column',alignItems:"start",justifyContent:'center'}}>
            <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:'100%',pb:'100%',overflow:"hidden",borderRadius:'8px'}}>
                <img src={`${API_URL}${!item.shoesImg.length?null:item.shoesImg[0].url}`}  style={{position:"absolute",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
                {
                    item.bookmarked?
                    <IconButton onClick={(e)=>onClickBookMark(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:1}}>
                        <BookmarkIcon/>
                    </IconButton>
                    :
                    <IconButton onClick={(e)=>onClickBookMark(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:1}}>
                        <BookmarkBorderIcon/>
                    </IconButton>
                }
            </Box>
            
            <Box sx={{my:1}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'pre-line',overflow:'hidden',textOverflow:'ellipsis',WebkitLineClamp:1,display:'-webkit-box',WebkitBoxOrient:'vertical'}}>
                    {item.brand}
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'pre-line',overflow:'hidden',textOverflow:'ellipsis',WebkitLineClamp:1,display:'-webkit-box',WebkitBoxOrient:'vertical'}}>
                    {item.koreanName}
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'pre-line',overflow:'hidden',textOverflow:'ellipsis',WebkitLineClamp:1,display:'-webkit-box',WebkitBoxOrient:'vertical'}}>
                    {formatNumberWithCommas(item.price)}{"원"}
                </Typography>
            </Box>
        </Box>
    </Grid>

    )
}