import {Box,Typography,Skeleton,IconButton} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Drawer from './Shoes_Main_Drawer';
import { Swiper, SwiperSlide } from "swiper/react";
import { API_URL } from '../../../../API/URL';
import { fetchSearchShoes } from '../../../../API/api/RunningShoes/shoes_api';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useRecoilState } from 'recoil';
import {ShoesMain_ShoesBookMark} from "../../../../state/Shoes/ShoesMain_State"
import { runningShoesBookMark, fetchUserName } from '../../../../API/api/RunningShoes/shoes_api';
import BookMarkHandle from '../../../../Util/bookmark';

import Content from './Shoes_Main_Content/Shoes_Main_Content';
import ContentSkeleton from './Shoes_Main_Content/Shoes_Main_Content_Skeleton';

//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import { set } from 'react-hook-form';



export default function Shoes_Search_Filter(props){

    const loadingList = [1,2,3,4,5,6]

    const session = localStorage.getItem('sessionid');

    const navigate = useNavigate();

    const [open,setOpen] = useState(false);

    const [query,setQuery] = useState("");
    const [loading,setLoading] = useState(true);
    const [list,setList] = useState([]);
    const [shoesBookmark,setShoesBookmark] = useRecoilState(ShoesMain_ShoesBookMark);
    const [userName,setUserName] = useState("");

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const FetchList = async () => {
        const response = await fetchSearchShoes("?"+query,session);
    
        if(response.response){
            props.setError(response.response.status)
            props.setOpen(true)
        }
        else{
            setList(response);
        }
        
        setLoading(false);
    }

    const onClickBookMart = (id,event) =>{
        event.stopPropagation();
        if(BookMarkHandle("shoes",id,session,navigate)){
            setShoesBookmark((prev)=>({...prev,[id]:!shoesBookmark[id]}))
        }
    }

    const FetchUserName = async () => {
        const _UserName = await fetchUserName(session);

        if(_UserName.response){
            props.setError(_UserName.response.status)
            props.setOpen(true)
        }
        else{
            setUserName(prev=>prev=_UserName)
        }
    }

    const navigateToShoesDetail =(id) =>{
        navigate(`/shoes/detail/${id}`)
    }

    const openDrawer = () => {
        setOpen(true);
    }

    useEffect(()=>{
        setLoading(true)
        FetchList();
    },[query])

    useEffect(()=>{
        FetchUserName();
    },[])


    useEffect(()=>{
        for(const item of list){
            setShoesBookmark((prev)=>({...prev,[item.id]:item.bookmarked}))
        }
    },[list])

    return(
        <Box sx={{backgroundColor:'#ffffff',display:'flex',justifyContent:'center',alignItems:'center',borderColor:'#E8E8E8',width:'100%',my:3}}>
            {
                query?
                <Box sx={{width:"100%"}}>
                    {/*상단제목*/}
                    <Box sx={{width:'100%'}}>
                        <Box sx={{px:"20px",display:'flex',alignItems:'start',justifyContent:'center',flexDirection:'column'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px'}}>
                                {`${userName} `} 러너님을 위한 러닝화
                            </Typography>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',color:'#9D9D9D',mb:1,mt:0.5}}>
                                러너님을 위한 러닝화에요
                            </Typography>
                        </Box>
                    </Box>

                    {
                        loading?
                        <ContentSkeleton/>
                        :
                        <Content shoes={list} onClickBookMart={onClickBookMart} shoesBookmark={shoesBookmark} navigateToShoesDetail={navigateToShoesDetail}/>
                    }
                </Box>
                :
                <Box onClick={openDrawer} sx={{width:"100%",mx:"20px",height:"100px",borderRadius:'8px',backgroundColor:'#F6F6F6',display:"flex",justifyContent:'center',alignItems:"center"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'24px'}}>
                        나를 위한 러닝화 찾기
                    </Typography>
                </Box>
            }
            <Drawer open = {open} setOpen ={setOpen} setQuery={setQuery}/>
        </Box>    
    )
}