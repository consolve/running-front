import {Box,Typography,Grid,IconButton} from '@mui/material';
import React from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import BookMarkHandle from '../../../../Util/bookmark';

import All from "./Shoes_Main_Content/Shoes_Main_All"
import AllSkeleton from './Shoes_Main_Content/Shoes_Main_All_Skeleton';

import {useRecoilState} from 'recoil'
import {
    ShoesMain_AllShoesLoading,
    ShoesMain_AllLoading,
    ShoesMain_ShoesBookMark
} from '../../../../state/Shoes/ShoesMain_State';
import {
    ShoesList,
    ShoesSearch_Error
} from '../../../../state/Shoes/ShoesSearch_State';

import { fetchSearchShoes,runningShoesBookMark } from '../../../../API/api/RunningShoes/shoes_api';


export default function Shoes_Main_All(props){
    const session = localStorage.getItem("sessionid");

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const navigate = useNavigate();
    const loadinglist = [1,2,3,4,5,6]

    const [loading,setLoading] = useRecoilState(ShoesMain_AllShoesLoading);
    const [loadingall,setLoadingall] = useRecoilState(ShoesMain_AllLoading);
    const [shoesBookmark,setShoesBookmark] = useRecoilState(ShoesMain_ShoesBookMark);
    const [error,setError] = useRecoilState(ShoesSearch_Error);
    const [list,setList] = useRecoilState(ShoesList);


    const onClickBookMart = (id,event) =>{
        event.stopPropagation();
        if(BookMarkHandle("shoes",id,session,navigate)){
            setShoesBookmark((prev)=>({...prev,[id]:!shoesBookmark[id]}))
        }
    }

    
    const getItems = async () =>{
        setLoading(true);

        const _ShoesList = await fetchSearchShoes("?page="+1,session);

        if(_ShoesList.response){
            setError(_ShoesList.response.status)
            props.setOpen(true);
        }
        else{
            setList(_ShoesList)
        }
        setLoading(false);
    }

    const navigateToShoesDetail =(id) =>{
        navigate(`/shoes/detail/${id}`);
    }

    const navigateToShoesSearch =() =>{
        navigate(`/shoes/search`);
    }

    useEffect(() => {
        getItems();
    }, [])

    useEffect(()=>{
        for(const item of list){
            setShoesBookmark((prev)=>({...prev,[item.id]:item.bookmarked}))
        }
    },[list])

    useEffect(() => {
        return () => {
          setList([]);
        };
      }, []);
    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mb:'70px'}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{display:'flex',alignItems:'start',flexDirection:'column',justifyContent:"center",px:"20px"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px',lineHeight:'28.64px'}}>
                        모든 러닝화
                    </Typography>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:"#9D9D9D",lineHeight:'16.71px',mt:'3px'}}>
                         러닝라이프에 등록된 모든 러닝화에요
                    </Typography>
                </Box>
            </Box>

            {
                loading||loadingall?
                <AllSkeleton/>
                :
                <All list={list} shoesBookmark={shoesBookmark} onClickBookMart={onClickBookMart}/>
            }

            {/*더보기 버튼*/}
            {
                loading||loadingall?
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',flexDirection:'column'}}>
                    <Box sx={{width:"100%"}}>
                        <Skeleton variant="rectangular" sx={{borderRadius:'10px',height:'40px',mx:"20px"}}/>
                    </Box>
                </Box>
                :
                <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                    <Box onClick={navigateToShoesSearch}  sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column',mt:1,px:"20px"}}>
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px',height:'40px',width:'100%',border:1,color:'#E8E8E8'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px',color:'#606060'}}>
                                더보기
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>    
    )
}