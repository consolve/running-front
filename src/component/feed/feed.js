import {Box, Typography, IconButton} from '@mui/material';
import { API_URL } from '../../API/URL';
import { useNavigate } from 'react-router-dom';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import React from "react";

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function Feed({data}){
    const navigate = useNavigate();

    const {item,shoesBookmark,onClickBookMart} = data;

    const navigateToShoesDetail =(id) =>{
        navigate(`/shoes/detail/${id}`)
    }

    return(
        <Box onClick={()=>navigateToShoesDetail(item.id)} sx={{width:'100%',pt:'10px'}}>
            <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:"100%"}}>
                <img src={`${API_URL}${!item.shoesImg.length?null:item.shoesImg[0].url}`} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',px:1,borderRadius:'8px'}}/>
                    {
                        shoesBookmark[item.id]?
                        <IconButton onClick={(e)=>onClickBookMart(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                            <BookmarkIcon/>
                        </IconButton>
                        :
                        <IconButton onClick={(e)=>onClickBookMart(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                            <BookmarkBorderIcon/>
                        </IconButton>
                    }
            </Box>
            <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                    mt:'5px',
                    width:'100%'
                }}>
                <Typography sx={{ 
                        fontFamily:'Pretendard Variable',
                        fontWeight:'700',
                        fontSize:'18px',
                        lineHeight:"21px",
                        mt:'5px'
                    }}>
                    {item.brand}
                </Typography>
                <Typography sx={{
                        fontFamily:'Pretendard Variable',
                        lineHeight:"19.09px",
                        fontWeight:"300",
                        fontSize:'16px',
                        whiteSpace:'nowrap',
                        overflow:'hidden',
                        textOverflow:'ellipsis',
                        mt:'2px'
                    }}>
                    {item.koreanName}
                </Typography>
                <Typography sx={{
                        fontFamily:'Pretendard Variable',
                        fontWeight:'700',
                        fontSize:'18px',
                        lineHeight:"21.48px",
                        mt:'6px'
                    }}>
                    {formatNumberWithCommas(item.price)}{"원"}
                </Typography>
            </Box>
        </Box>
    )
}