import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import { fetchMonthContest } from '../../../../API/api/Contest/contest_api';
import {useRecoilState} from 'recoil'
import { CompetitionSchedule_MonthLoading,
    CompetitionSchedule_AllLoading
} from '../../../../state/Competition/CompetitionSchedule_State';
import Content from "../../../../component/Competition/wide_feed"
import Title from "../../../../component/Competition/Competition_Title"
import More from "../../../../component/Competition/Competition_More"
import ContentSkeleton from '../../../../component/shoes/wide_Skeleton';

export default function Competition_Schedule_Month(props){

    const navigate = useNavigate();
    const sessionid = localStorage.getItem('sessionid');

    const [loading1,setLoading1] = useRecoilState(CompetitionSchedule_MonthLoading);
    const [loadingall,setLoadingall] = useRecoilState(CompetitionSchedule_AllLoading);
    const [month,setMonth] = useState([]);

    const FetchList = async () => {
        const _MonthCompetitions = await fetchMonthContest(3,sessionid);
    
        if(_MonthCompetitions.response){
            props.setError(_MonthCompetitions.response.status)
            props.setOpen(true)
        }
        else{
            setMonth(_MonthCompetitions);
        }
        
        setLoading1(false);
    }

    const ThisMonth = () => {
        const date = new Date();
        const month = date.getMonth()+1;
        return month;
    }

    const navigateToCompetitionDetail = (id) =>{
        navigate(`/competition/detail/${id}`);
    }

    const navigateToMoreContest = () =>{
        navigate(`/schedule/search?month=${ThisMonth()}`);
    }

    useEffect(() =>{
        FetchList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mt:'50px'}}>

            <Title title={"이번 달 대회일정"} content ={`${ThisMonth()}월에 열리는 대회에요`}/>
                {loadingall
                    ?
                    <Box sx={{width:"100%"}}>
                        <ContentSkeleton/>
                        <ContentSkeleton/>
                        <ContentSkeleton/>
                    </Box>
                    :
                    <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column',mt:1}}>
                        {month?
                        <Box sx={{width:"100%"}}>
                            {month.map((item,index) =>(
                               <Content key={index} item={item} navigateToCompetitionDetail={navigateToCompetitionDetail}/>
                            ))}
                        </Box>
                        :
                        <Box>
                            error
                        </Box>
                        }
                    </Box>
                }

            <More navigateToMoreContest={navigateToMoreContest}/>

        </Box>    
    )
}