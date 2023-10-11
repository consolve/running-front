import {Box,Typography,Paper} from '@mui/material';
import React, { useState,useCallback } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {useLocation} from "react-router-dom"
import { useInView } from "react-intersection-observer"
import {Skeleton} from '@mui/material';
import {API_URL} from '../../../../API/URL/index';
import { fetchSearchContest } from '../../../../API/api/Contest/contest_api';
import {useRecoilState} from 'recoil'
import {
    CompetitionList,
    CompetitionSearch_Error
} from '../../../../state/Competition/CompetitionSearch_State';

export default function Competition_Search_List(props){

    const convertToCustomDate = (date) => {
        const customDate = new Date(date); // 월은 0부터 시작하므로 2는 3월을 의미합니다.
        const year = customDate.getFullYear();
        const month = (customDate.getMonth() + 1).toString().padStart(2, '0'); // 1을 더하고 두 자리로 맞춥니다.
        const day = customDate.getDate().toString().padStart(2, '0'); // 두 자리로 맞춥니다.
        return `${year}.${month}.${day}`;
    };

    const querylocation = useLocation();

    const navigate = useNavigate();

    
    const [error,setError] = useRecoilState(CompetitionSearch_Error);
    const [list,setList] = useRecoilState(CompetitionList);
    const [ref, inView] = useInView();
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);    

    const getItems = useCallback(async () => {
        const query = querylocation.search
        const decodeUri = decodeURI(query);
        setLoading(true);

        let _SearchCompetition = "";
    
        if(decodeUri === ""){
            _SearchCompetition = await fetchSearchContest(decodeUri+"?page="+page);
        }
        else{
            _SearchCompetition = await fetchSearchContest(decodeUri+"&page="+page);
        }
        console.log(_SearchCompetition)

        if(_SearchCompetition.response){
            setError(_SearchCompetition.response.status)
            props.setOpen(true);
        }
        else{
            setList((prev)=>[...prev,..._SearchCompetition])
        }

        setLoading(false);
    }, [page])

    useEffect(() => {
        getItems();
    }, [getItems])

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage(prevState => prevState + 1)
        }
    }, [inView])

    const navigateToCompetitionDetail =(id) =>{
        navigate(`/competition/detail/${id}`);
    }

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',height:'100%',mt:'50px'}}>

            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column'}}>
                {list.map((item,index) =>{
                    return(
                    <React.Fragment key={index}>
                        {
                            list.length-1==index?
                            <Box ref = {ref} onClick ={()=>navigateToCompetitionDetail(item.id)} key = {item.id} sx={{display:'flex',alignItems:'center',backgroundColor:'#F6F6F6',borderRadius:2,height:'110px',mt:1,width:'100%'}}>
                                <Box sx={{width:'90px',height:'90px',backgroundColor:'#4F1D76',borderRadius:3,mx:1,backgroundImage:`url(${API_URL}${item.mainBanner.mainBanner})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'top center'}}/>
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
                                                    <Box key = {index} sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'40px',height:'15px',backgroundColor:'#4F1D76',borderRadius:3,mr:1}}>
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
                            :
                            <Box onClick ={()=>navigateToCompetitionDetail(item.id)} key = {item.id} sx={{display:'flex',alignItems:'center',backgroundColor:'#F6F6F6',borderRadius:2,height:'100px',mt:1,width:'100%'}}>
                                <Box sx={{width:'90px',height:'90px',backgroundColor:'#4F1D76',borderRadius:3,mx:1,backgroundImage:`url(${API_URL}${item.mainBanner.mainBanner})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'top center'}}/>
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
                                                    <Box key = {index} sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'40px',height:'15px',backgroundColor:'#4F1D76',borderRadius:3,mr:1}}>
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

                        }
                    </React.Fragment>
                    )  
                })}
            </Box>
            {
                loading?
                <Skeleton variant="rectangular" width={'100%'} height={"110px"} sx={{mt:1,borderRadius:2}}/>
                :
                ""
            }
        </Box>    
    )
}