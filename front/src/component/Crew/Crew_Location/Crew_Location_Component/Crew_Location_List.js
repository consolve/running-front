import {Box,Typography,Grid} from '@mui/material';
import React, { useState,useCallback } from "react";
import { useRef,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer"
import {CircularProgress} from '@mui/material';
import {API_URL} from "../../../../API/URL/index"
import {useRecoilState} from 'recoil'
import {
    CrewLocation_List,
    CrewLocation_Loading,
    CrewLocation_Error,
    CrewLocation_Location
} from '../../../../state/Crew/CrewLocation_State';
import { fetchCrewLocation } from '../../../../API/api/RunningCrew/crew_api';

export default function Crew_Location_List(props){

    const navigate = useNavigate();
    const session = localStorage.getItem("sessionid");

    const locationMap = {
        1:"captial",
        2:'chungcheong',
        3:'gangwon',
        4:'jeolla',
        5:'gyeongsang',
    }

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
    
    const [error,setError] = useRecoilState(CrewLocation_Error);
    const [list,setList] = useRecoilState(CrewLocation_List);
    const [ref, inView] = useInView();
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(CrewLocation_Loading);  
    const [location,setLocation] = useRecoilState(CrewLocation_Location);

    const getItems = useCallback(async () => {
        
        setLoading(true);
        const _CrewList = await fetchCrewLocation(locationMap[location]+"?page="+page,session);

        if(_CrewList.response){
            setError(_CrewList.response.status)
            props.setOpen(true);
        }
        else{
            setList((prev)=>[...prev,..._CrewList])
        }

        setLoading(false);
    }, [page])

    useEffect(() => {
        getItems();
    }, [getItems])

    const navigateToCrewDetail =(id) =>{
        navigate(`/crew`);
    }

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage(prevState => prevState + 1)
        }
    }, [inView])


    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mb:8}}>
            <Box sx={{width:"100%"}}>
                
                <Grid container spacing={0} columns={16} >
                        {
                            list.map((item,index)=>{
                                return(
                                    <React.Fragment key = {index}>
                                    {
                                        list.length-1===index?
                                        <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
                                            <Box ref={ref} onClick={()=>navigateToCrewDetail(item.id)} sx={{width:'170px',mb:1}}>
                                                <Box sx={{width:'170px',height:'170px',backgroundColor:'#4F1D76',borderRadius:3,mx:'auto',backgroundImage:`url(${API_URL}${item.mainImg})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                                <Box sx={{mt:1,mb:0,ml:0.5}}>
                                                        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                            {
                                                                item.activityAreaTag.map((item,index)=>{
                                                                    return(
                                                                        <Box key={index} sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'40px',height:'15px',backgroundColor:'#4F1D76',borderRadius:3,mr:1}}>
                                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px',color:'#ffffff'}}>
                                                                                {item.name}
                                                                            </Typography>
                                                                        </Box>
                                                                    )
                                                            })
                                                            }      
                                                        </Box>

                                                        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',width:'100%'}}>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                                                                {item.name}
                                                            </Typography>
                                                            <Box sx={{display:'flex'}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    정기런
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    &nbsp;{'|'}&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    {item.regularRun}
                                                                </Typography>
                                                            </Box>

                                                            <Box sx={{display:'flex',mt:-0.5}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    시간
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    &nbsp;{'|'}&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px'}}>
                                                                    {extractSentenceAfterWord(item.regularRun)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        :
                                        <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
                                            <Box onClick={()=>navigateToCrewDetail(item.id)} sx={{width:'170px',mb:1}}>
                                                <Box sx={{width:'170px',height:'170px',backgroundColor:'#4F1D76',borderRadius:3,mx:'auto',backgroundImage:`url(${API_URL}${item.mainImg})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                                <Box sx={{mt:1,mb:0,ml:0.5}}>
                                                        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                            {
                                                                item.activityAreaTag.map((item,index)=>{
                                                                    return(
                                                                        <Box key ={index} sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'40px',height:'15px',backgroundColor:'#4F1D76',borderRadius:3,mr:1}}>
                                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px',color:'#ffffff'}}>
                                                                                {item.name}
                                                                            </Typography>
                                                                        </Box>
                                                                    )
                                                            })
                                                            }      
                                                        </Box>

                                                        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',width:'100%'}}>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                                                                {item.name}
                                                            </Typography>
                                                            <Box sx={{display:'flex'}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    정기런
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    &nbsp;{'|'}&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    {item.regularRun}
                                                                </Typography>
                                                            </Box>

                                                            <Box sx={{display:'flex',mt:-0.5}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    시간
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',color:'#606060'}}>
                                                                    &nbsp;{'|'}&nbsp;
                                                                </Typography>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px'}}>
                                                                    {extractSentenceAfterWord(item.regularRun)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    }
                                    </React.Fragment>
                                )
                            })
                        }
                </Grid>
                
            </Box>
            {
                loading?
                    <CircularProgress color="primary" />
                :
                ""
            }
        </Box>    
    )
}