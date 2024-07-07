import {Box,Typography,IconButton,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchBrandShoes,fetchBrandTag,runningShoesBookMark } from '../../../../API/api/RunningShoes/shoes_api';
import BookMarkHandle from '../../../../Util/bookmark';

import Content from "./Shoes_Main_Content/Shoes_Main_Content"
import ContentSkeleton from './Shoes_Main_Content/Shoes_Main_Content_Skeleton';
import Tags from "./Shoes_Main_Content/Shoes_Main_Tags"
import TagsSkeleton from './Shoes_Main_Content/Shoes_Main_Tags_Skeleton';
import More from "./Shoes_Main_Content/Shoes_Main_More"
import MoreSkeleton from './Shoes_Main_Content/Shoes_Main_More_Skeleton';
import Title from "./Shoes_Main_Content/Shoes_Main_Title"

import {useRecoilState} from 'recoil';
import {
    ShoesMain_BrandLoading,
    ShoesMain_Error,
    ShoesMain_AllLoading,
    ShoesMain_ShoesBookMark
} from '../../../../state/Shoes/ShoesMain_State';

import './style.css';

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

export default function Shoes_Brand(props){

    const navigate = useNavigate();

    const session = localStorage.getItem("sessionid");

    const [brand, setBrand] = useState(0);
    const [brandtags,setBrandTags] = useState([]);
    const [loading,setLoading] = useRecoilState(ShoesMain_BrandLoading);
    const [shoesBookmark,setShoesBookmark] = useRecoilState(ShoesMain_ShoesBookMark);
    const [brandloading,setBrandLoading] = useState(true);
    const [loadingall,setLoadingall] = useRecoilState(ShoesMain_AllLoading);

    const loadinglist = [1,2,3,4,5,6]

    const handleToggleBrand = (value) => {
        if(loading){
            return;
        }
        else{
            setBrand((prev)=>prev=value)   
        }
    };

    const navigateToShoesSearch =(value) =>{
        navigate(`/shoes/search?brand=${value}`);
    }

    const onClickBookMart = (id,event) =>{
        event.stopPropagation();
        if(BookMarkHandle("shoes",id,session,navigate)){
            setShoesBookmark((prev)=>({...prev,[id]:!shoesBookmark[id]}))
        }
    }

    const [shoes,setShoes] = useState([]);

    const FetchShoesBrand = async () =>{
        const _BrandTags = await fetchBrandTag();

        if(_BrandTags.response){
            props.setError(_BrandTags.response.status);
            props.setOpen(true);
        }
        else{
            return _BrandTags;
        }

        setBrandLoading(false);
    }


    const FetchShoesList = async (value) =>{
        const _BrandShoes = await fetchBrandShoes(value,session);

        if(_BrandShoes.response){
            props.setError(_BrandShoes.response.status);
            props.setOpen(true);
        }
        else{
            setShoes(_BrandShoes);
        }

        setLoading(false);   
    }

    async function FirstFetchList(){
        const _BrandTags = await FetchShoesBrand();
        const _BrandShoes = await fetchBrandShoes(_BrandTags[0].name,session);

        if(_BrandTags.response){
            props.setError(_BrandTags.response.status);
            props.setOpen(true);
        }
        else if(_BrandShoes.response){
            props.setError(_BrandShoes.response.status);
            props.setOpen(true);
        }
        else{
            setBrandTags(_BrandTags);
            setShoes(_BrandShoes);
        }

        setLoading(false); 
        setBrandLoading(false);
    }

    useEffect(() =>{
        setLoading(true);
        setBrandLoading(true)
        FirstFetchList();
    },[])
    
    useEffect(()=>{
        for(const item of shoes){
            setShoesBookmark((prev)=>({...prev,[item.id]:item.bookmarked}))
        }
    },[shoes])


    useEffect(() =>{
        setLoading(true)
        if(brandtags.length === 0){
            return;
        }
        else{
            FetchShoesList(brandtags[brand].name,session)
        }
    },[brand])

    return(
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>

            {/*상단제목*/}
            <Title content={"브랜드별 러닝화"}/>
            
            {
                brandloading?
                <TagsSkeleton/>
                :
                <Tags tags={brandtags} select={brand} handleToggle={handleToggleBrand}/>
            }

            {
                loading||loadingall?
                <ContentSkeleton/>
                :
                <Content shoes={shoes} shoesBookmark={shoesBookmark} onClickBookMart={onClickBookMart}/>
            }

            {/*더보기 버튼*/}
            {
                loading||loadingall?
                <MoreSkeleton/>
                :
                <More select={brand} tags={brandtags} navigateToShoesSearch={navigateToShoesSearch}/>
            }

        </Box>    
    )
}