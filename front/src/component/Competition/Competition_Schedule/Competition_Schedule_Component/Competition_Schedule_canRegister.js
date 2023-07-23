import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


export default function Competition_Schedule_Month(){

    const list = [
        {
            id:2,
            title:'2023 서울 마라톤대회',
            date:{
                year:'2023',
                month:'04',
                day:'02'
            },
            location:'서울 노원구',
            register:{
                start:'2023.04.05',
                end:'05.21'
            },
            distance: '10KM'
        },
        {
            id:3,
            title:'2023 서울 마라톤대회',
            date:{
                year:'2023',
                month:'04',
                day:'02'
            },
            location:'서울 노원구',
            register:{
                start:'2023.04.05',
                end:'05.21'
            },
            distance: '10KM'
        },
        {
            id:4,
            title:'2023 서울 마라톤대회',
            date:{
                year:'2023',
                month:'04',
                day:'02'
            },
            location:'서울 노원구',
            register:{
                start:'2023.04.05',
                end:'05.21'
            },
            distance: '10KM'
        }
    ]

    const navigate = useNavigate();

    const navigateToCompetitionDetail =() =>{
        navigate('/compe_detail');
    }

    const [competition_list,setCompetition_list] = useState([]);

    const FetchCompetitionList = async () => {
        setCompetition_list(list);
    }

    useEffect(() =>{
        FetchCompetitionList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%'}}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'start',width:'100%',mt:3}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'30px',ml:2}}>
                    접수 가능한 대회
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px',color:"#9D9D9D",ml:2}}>
                    지금 당장 접수 가능한 대회에요
                </Typography>
            </Box>

            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column',mt:1}}>
                {competition_list.map((item,index) =>(
                    <Box onClick ={navigateToCompetitionDetail} key = {item.id} sx={{display:'flex',alignItems:'center',backgroundColor:'#F6F6F6',borderRadius:2,height:'100px',mt:1,width:'100%'}}>
                        <Box sx={{width:'90px',height:'90px',backgroundColor:'#4F1D76',borderRadius:3,mx:2}}/>
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:`calc(100% - 100px)`,flexDirection:'column'  }}>
                            <Box sx={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                                    {item.title}
                                </Typography>
                                <NotificationsActiveIcon sx={{pr:2}}/>
                            </Box>
                            <Box sx={{width:'100%'}}>
                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060',mr:2}}>
                                        {item.date.year}.{item.date.month}.{item.date.day}
                                    </Typography>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                        {item.location}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{width:'100%'}}>
                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                        접수마감 :
                                    </Typography>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                        {item.register.start}
                                    </Typography>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                        ~
                                    </Typography>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060'}}>
                                        {item.register.end}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',pt:0.5}}>
                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'40px',height:'15px',backgroundColor:'#4F1D76',borderRadius:3,mr:1}}>
                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px',color:'#ffffff'}}>
                                            10KM
                                        </Typography>
                                    </Box>
                                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'40px',height:'15px',backgroundColor:'#4F1D76',borderRadius:3,mr:1}}>
                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px',color:'#ffffff'}}>
                                            10KM
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'12px',color:'#606060',width:'100px'}}>
                                    상세정보 {'>'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    
                ))}
            </Box>
            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column',mt:1}}>
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px',height:'40px',mt:1,width:'100%',border:1,color:'#E8E8E8'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',color:'#606060'}}>
                        더보기
                    </Typography>
                </Box>
            </Box>
        </Box>    
    )
}