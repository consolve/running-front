import {Box,Typography,IconButton,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { fetchFeatureShoes,fetchFeatureTag,runningShoesBookMark } from '../../../../API/api/RunningShoes/shoes_api';
import BookMarkHandle from '../../../Util/bookmark';

import Content from "./Shoes_Main_Content/Shoes_Main_Content"
import ContentSkeleton from './Shoes_Main_Content/Shoes_Main_Content_Skeleton';
import Tags from "./Shoes_Main_Content/Shoes_Main_Tags"
import TagsSkeleton from './Shoes_Main_Content/Shoes_Main_Tags_Skeleton';
import More from "./Shoes_Main_Content/Shoes_Main_More"
import MoreSkeleton from './Shoes_Main_Content/Shoes_Main_More_Skeleton';
import Title from "./Shoes_Main_Content/Shoes_Main_Title"

import {useRecoilState} from 'recoil';
import {
    ShoesMain_FeatureLoading,
    ShoesMain_Error,
    ShoesMain_AllLoading,
    ShoesMain_ShoesBookMark
} from '../../../../state/Shoes/ShoesMain_State';

export default function Shoes_feature(props){

    const session = localStorage.getItem('sessionid');

    const [feature, setFeature] = useState(0);
    const [featuretags,setFeatureTags] = useState([]);
    const [shoes,setShoes] = useState([]);
    const [shoesBookmark,setShoesBookmark] = useRecoilState(ShoesMain_ShoesBookMark);
    const [loading,setLoading] = useRecoilState(ShoesMain_FeatureLoading);
    const [featureloading,setFeatureLoading] = useState(true);
    const [error,setError] = useRecoilState(ShoesMain_Error);
    const [loadingall,setLoadingall] = useRecoilState(ShoesMain_AllLoading);

    const handleToggleFeature = (value) => {
        if(loading){
            return;
        }
        else{
            setFeature((prev)=>prev=value)   
        }
    };
    

    const navigate = useNavigate();

    const navigateToShoesSearch =(value) =>{
        navigate(`/shoes/search?keyword=${value}`);
    }

    const onClickBookMart = (id,event) =>{
        event.stopPropagation();
        if(BookMarkHandle("shoes",id,session,navigate)){
            setShoesBookmark((prev)=>({...prev,[id]:!shoesBookmark[id]}))
        }
    }

    const FetchShoesFeature = async () =>{
        const _FeatureTags = await fetchFeatureTag();

        if(_FeatureTags.response){
            props.setError(_FeatureTags.response.status);
            props.setOpen(true);
        }
        else{
            return _FeatureTags;
        }

        setFeatureLoading(false);
    }


    const FetchShoesList = async (value) =>{
        const _featureShoes = await fetchFeatureShoes(value,session);

        if(_featureShoes.response){
            props.setError(_featureShoes.response.status);
            props.setOpen(true);
        }
        else{
            setShoes((prev)=>prev=_featureShoes);
        }

        setLoading(false);   
    }

    async function FirstFetchList(){
        const _FeatureTags = await FetchShoesFeature();
        const _featureShoes = await fetchFeatureShoes(_FeatureTags[0].name,session);

        if(_FeatureTags.response){
            props.setError(_FeatureTags.response.status);
            props.setOpen(true);
        }
        else if(_featureShoes.response){
            props.setError(_featureShoes.response.status);
            props.setOpen(true);
        }
        else{
            setFeatureTags(_FeatureTags);
            setShoes(_featureShoes);
        }

        setLoading(false); 
        setFeatureLoading(false);
    }

    useEffect(() =>{
        setLoading(true);
        setFeatureLoading(true)
        FirstFetchList();
    },[])

    useEffect(()=>{
        for(const item of shoes){
            setShoesBookmark((prev)=>({...prev,[item.id]:item.bookmarked}))
        }
    },[shoes])


    useEffect(() =>{
        setLoading(true)
        if(featuretags.length === 0){
            return;
        }
        else{
            FetchShoesList(featuretags[feature].name,session)
        }
    },[feature])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>


            {/*상단제목*/}
            <Title content={"특징별 러닝화"}/>
            
            {
                featureloading?
                <TagsSkeleton/>
                :
                <Tags tags={featuretags} select={feature} handleToggle={handleToggleFeature}/>
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
                <More select={feature} tags={featuretags} navigateToShoesSearch={navigateToShoesSearch}/>
            }

        </Box>    
    )
}