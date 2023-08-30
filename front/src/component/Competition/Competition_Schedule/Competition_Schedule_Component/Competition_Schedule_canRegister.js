import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Skeleton from '@mui/material/Skeleton';
import {API_URL} from '../../../../API/URL/url';
import {fetchAcceptableContest} from '../../../../API/api/Contest/contest_api';
import {useRecoilState} from 'recoil'
import { CompetitionSchedule_AccceptableLoading,
        CompetitionSchedule_AllLoading
} from '../../../../state/Competition/CompetitionSchedule_State';

export default function Competition_Schedule_Month(props){

    const navigate = useNavigate();
    const [loading2,setLoading2] = useRecoilState(CompetitionSchedule_AccceptableLoading);
    const [loadingall,setLoadingall] = useRecoilState(CompetitionSchedule_AllLoading);
    const [acceptable,setacceptable] = useState([]);

    const FetchList = async () => {
        const _AcceptableCompetitions = await fetchAcceptableContest(6);
    
        if(_AcceptableCompetitions.response){
            props.setError(_AcceptableCompetitions.response.status)
            props.setOpen(true)
        }
        else{
           setacceptable(_AcceptableCompetitions);
        }
        
        setLoading2(false);
    }


    const convertToCustomDate = (date) => {
        const customDate = new Date(date); // 월은 0부터 시작하므로 2는 3월을 의미합니다.
        const year = customDate.getFullYear();
        const month = (customDate.getMonth() + 1).toString().padStart(2, '0'); // 1을 더하고 두 자리로 맞춥니다.
        const day = customDate.getDate().toString().padStart(2, '0'); // 두 자리로 맞춥니다.
        return `${year}.${month}.${day}`;
    };


    const navigateToCompetitionDetail =(id) =>{
        navigate(`/competition/detail/${id}`);
    }

    useEffect(() =>{
        FetchList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%'}}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'start',width:'100%',mt:3}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'30px',ml:1}}>
                    접수 가능한 대회
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px',color:"#9D9D9D",ml:1}}>
                    지금 당장 접수 가능한 대회에요
                </Typography>
            </Box>

            {loadingall
                    ?
                    <Box sx={{width:"100%",height:'324px'}}>
                        <Skeleton variant="rectangular" width={'100%'} height={"100px"} sx={{mt:1,borderRadius:2}}/>
                        <Skeleton variant="rectangular" width={'100%'} height={"100px"} sx={{mt:1,borderRadius:2}}/>
                        <Skeleton variant="rectangular" width={'100%'} height={"100px"} sx={{mt:1,borderRadius:2}}/>
                    </Box>
                    :
                    <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column',mt:1,height:'324px'}}>
                        {acceptable?
                        <Box sx={{width:"100%"}}>
                            {acceptable.map((item,index) =>(
                                <Box key ={index} onClick ={()=>navigateToCompetitionDetail(item.id)} sx={{display:'flex',alignItems:'center',backgroundColor:'#F6F6F6',borderRadius:2,height:'100px',mt:1,width:'100%'}}>
                                    <Box sx={{width:'90px',height:'90px',backgroundColor:'#4F1D76',borderRadius:3,mx:2,backgroundImage:`url(${API_URL}${item.mainBanner.mainBanner})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'top center'}}/>
                                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:`calc(100% - 100px)`,flexDirection:'column'  }}>
                                        <Box sx={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                                                {item.name}
                                            </Typography>
                                            <NotificationsActiveIcon sx={{pr:2}}/>
                                        </Box>
                                        <Box sx={{width:'100%'}}>
                                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060',mr:2}}>
                                                    {convertToCustomDate(item.competitionTime)}
                                                </Typography>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                    {item.place}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{width:'100%'}}>
                                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                    접수마감 :
                                                </Typography>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                    {convertToCustomDate(item.receptionStartTime)}
                                                </Typography>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                    ~
                                                </Typography>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                                    {convertToCustomDate(item.receptionEndTime)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',pt:0.5}}>
                                            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                {
                                                    item.courseTags.map((item,index)=>{
                                                        return(
                                                            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'40px',height:'15px',backgroundColor:'#4F1D76',borderRadius:3,mr:1}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px',color:'#ffffff'}}>
                                                                    {item.name}
                                                                </Typography>
                                                            </Box>
                                                        )
                                                })
                                                }      
                                            </Box>
                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060',width:'100px'}}>
                                                상세정보 {'>'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                            :
                        <Box>
                            error
                        </Box>
                        }
                    </Box>
                }
            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column',mt:1}}>
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px',height:'40px',mt:1,width:'100%',border:1,color:'#E8E8E8'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#606060'}}>
                        더보기
                    </Typography>
                </Box>
            </Box>

        </Box>    
    )
}