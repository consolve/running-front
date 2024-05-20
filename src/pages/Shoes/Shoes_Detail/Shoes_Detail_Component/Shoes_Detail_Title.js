import {Box,Typography,IconButton,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { useParams } from "react-router-dom";
import {runningShoesBookMark} from "../../../../API/api/RunningShoes/shoes_api"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookMarkHandle from '../../../../Util/bookmark';
import {useNavigate} from "react-router-dom";

export default function Shoes_Detail_Title(props){
    const { id } = useParams();
    const session = localStorage.getItem('sessionid');
    const navigate = useNavigate();

    const [bookmark,setBookmark] = useState(false);

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const onClickBookMart = (id) =>{
        if(BookMarkHandle("shoes",id,session,navigate)){
            setBookmark(prev=>prev=!bookmark);
        }
    }

    useEffect(()=>{
        setBookmark(prev=>prev=props.shoes.bookmarked);
    },[])


    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',backgroundColor:'#ffffff',borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>

            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'start',width:"calc(100% - 40px)",mx:"auto",pt:2,pb:1}}>
                <Box sx={{display:"flex",flexDirection:'column'}}>
                    <Typography color = "#000000" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px',lineHeight:'28.64px'}}>
                        {props.shoes.brand}
                    </Typography>
                    <Typography color = "#000000" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px',lineHeight:"21.48px"}}>
                        {props.shoes.name}
                    </Typography>
                </Box>
                {
                    bookmark?
                    <IconButton color="primary" onClick={()=>onClickBookMart(props.shoes.id)} sx={{p:0}}>
                        <BookmarkIcon sx={{fontSize:35}}/>
                    </IconButton>
                    :
                    <IconButton onClick={()=>onClickBookMart(props.shoes.id)} sx={{p:0}}>
                        <BookmarkBorderIcon sx={{fontSize:35}}/>
                    </IconButton>
                }
            </Box>

            <Box sx={{width:'100%'}}>
                <Box sx={{px:'20px'}}>

                    <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                        <Typography color = "#9D9D9D" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',lineHeight:'16.71px'}}>
                            출시색상
                        </Typography>
                        <Box sx={{display:'flex'}}>
                            {
                                props.shoes.launchColor.map((item,index)=>{
                                    return(
                                        <Box key ={index} backgroundColor={item.content} sx={{borderRadius:'50%',width:'13px',height:'13px',mr:'6px',border:1}}/>
                                    )
                                })
                            }
                        </Box>
                    </Box>

                    <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',mt:'9px'}}>
                        <Typography color = "#9D9D9D" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',lineHeight:'16.71px'}}>
                            발매가
                        </Typography>
                        <Box sx={{display:'flex'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'18px',lineHeight:'16.71px'}}>
                                {formatNumberWithCommas(props.shoes.price)}원
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>    
    )
}