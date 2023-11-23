import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import {API_URL} from '../../../../API/URL/url';
import {fetchAcceptableContest} from '../../../../API/api/Contest/contest_api';
import {useRecoilState} from 'recoil'
import { CompetitionSchedule_AccceptableLoading,
        CompetitionSchedule_AllLoading
} from '../../../../state/Competition/CompetitionSchedule_State';

import Title from "../../Competition_Content_Component/Competition_Title"
import More from "../../Competition_Content_Component/Competition_More"
import Content from "../../Competition_Content_Component/Competition_Content"
import ContentSkeleton from '../../Competition_Content_Component/Competition_Content_Skeleton';

export default function Competition_Schedule_canRegister(props){

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

    const navigateToCompetitionDetail =(id) =>{
        navigate(`/competition/detail/${id}`);
    }

    const navigateToMoreContest = () =>{
        navigate(`/schedule/search?month=13`)
    }

    useEffect(() =>{
        FetchList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%'}}>
            
            <Title title={"접수 가능한 대회"} content = {"지금 당장 접수 가능한 대회에요"}/>

            {loadingall
                    ?
                    <Box sx={{width:"100%"}}>
                        <ContentSkeleton/>
                    </Box>
                    :
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',flexDirection:'column',mt:1}}>
                        {acceptable?
                        <Box sx={{width:"100%"}}>
                            {acceptable.map((item,index) =>(
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