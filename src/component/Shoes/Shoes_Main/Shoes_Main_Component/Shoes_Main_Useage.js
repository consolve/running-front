import {Box,Typography,IconButton,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { fetchPurposeShoes,fetchPurPoseTag,runningShoesBookMark } from '../../../../API/api/RunningShoes/shoes_api';
import Skeleton from '@mui/material/Skeleton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { API_URL } from '../../../../API/URL';
import {useRecoilState} from 'recoil';
import {
    ShoesMain_UseageLoading,
    ShoesMain_Error,
    ShoesMain_AllLoading,
    ShoesMain_ShoesBookMark
} from '../../../../state/Shoes/ShoesMain_State';

import Content from "./Shoes_Main_Content/Shoes_Main_Content"
import ContentSkeleton from './Shoes_Main_Content/Shoes_Main_Content_Skeleton';
import Tags from "./Shoes_Main_Content/Shoes_Main_Tags"
import TagsSkeleton from './Shoes_Main_Content/Shoes_Main_Tags_Skeleton';
import More from "./Shoes_Main_Content/Shoes_Main_More"
import MoreSkeleton from './Shoes_Main_Content/Shoes_Main_More_Skeleton';
import Title from "./Shoes_Main_Content/Shoes_Main_Title"


export default function Shoes_Useage(props){

    const session = localStorage.getItem("sessionid");


    const [purpose, setPurpose] = useState(0);
    const [purposetags,setPurposeTags] = useState([]);
    const [loading,setLoading] = useRecoilState(ShoesMain_UseageLoading);
    const [purposeLoading,setPurposeLoading] = useState(true);
    const [error,setError] = useRecoilState(ShoesMain_Error);
    const [shoesBookmark,setShoesBookmark] = useRecoilState(ShoesMain_ShoesBookMark);
    const [loadingall,setLoadingall] = useRecoilState(ShoesMain_AllLoading);

    const handleTogglePurpose = (value) => {
        if(loading){
            return;
        }
        else{
            setPurpose((prev)=>prev=value)   
        }
    };
    

    const navigate = useNavigate();

    
    const navigateToShoesSearch =(value) =>{
        navigate(`/shoes/search?keyword=${value}`);
    }

    const navigateToShoesDetail =(id) =>{
        navigate(`/shoes/detail/${id}`)
    }

    const [shoes,setShoes] = useState([]);

    const bookMark = async (id) =>{
        const response = await runningShoesBookMark(id,session);
        if(response.response){
            props.setError(response.response.status)
            props.setOpen(true);
            return false;
        }
        else{
            return true;
        }
    }

    const onClickBookMart = (id,event) =>{
        event.stopPropagation();
        if(bookMark(id)){
            setShoesBookmark((prev)=>({...prev,[id]:!shoesBookmark[id]}))
        }
    }

    const FetchShoesPurpose = async () =>{
        const _PurposeTags = await fetchPurPoseTag();
        console.log(_PurposeTags)

        if(_PurposeTags.response){
            props.setError(_PurposeTags.response.status);
            props.setOpen(true);
        }
        else{
            return _PurposeTags;
        }

        setPurposeLoading(false);
    }


    const FetchShoesList = async (value) =>{
        const _PurposeShoes = await fetchPurposeShoes(value,session);
        console.log(_PurposeShoes)

        if(_PurposeShoes.response){
            props.setError(_PurposeShoes.response.status);
            props.setOpen(true);
        }
        else{
            setShoes(_PurposeShoes);
        }

        setLoading(false);   
    }

    async function FirstFetchList(){
        const _PurposeTags = await FetchShoesPurpose();
        const _PurposeShoes = await fetchPurposeShoes(_PurposeTags[0].name,session);

        if(_PurposeTags.response){
            props.setError(_PurposeTags.response.status);
            props.setOpen(true);
        }
        else if(_PurposeShoes.response){
            props.setError(_PurposeShoes.response.status);
            props.setOpen(true);
        }
        else{
            setPurposeTags(_PurposeTags);
            setShoes(_PurposeShoes);
        }

        setLoading(false); 
        setPurposeLoading(false);
    }

    useEffect(() =>{
        setLoading(true);
        setPurposeLoading(true)
        FirstFetchList();
    },[])

    useEffect(()=>{
        for(const item of shoes){
            setShoesBookmark((prev)=>({...prev,[item.id]:item.bookmarked}))
        }
    },[shoes])

    useEffect(() =>{
        setLoading(true)
        if(purposetags.length === 0){
            return;
        }
        else{
            FetchShoesList(purposetags[purpose].name,session)
        }
    },[purpose])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>

            {/*상단제목*/}
            <Title content={"용도별 러닝화"}/>
            
            {
                purposeLoading?
                <TagsSkeleton/>
                :
                <Tags tags={purposetags} select={purpose} handleToggle={handleTogglePurpose}/>
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
                <More select={purpose} tags={purposetags} navigateToShoesSearch={navigateToShoesSearch}/>
            }


        </Box>    
    )
}