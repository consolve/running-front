import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from '../../../hoc/auth'
import { useNavigate } from "react-router-dom";
import TopBar from "./Competition_Search_Component/Competition_TopBar";
import Filter from "./Competition_Search_Component/Competition_Search_Filter"
import List from "./Competition_Search_Component/Competition_Search_List"
import {useLocation} from "react-router-dom"
import { fetchSearchContest } from '../../../API/api/Contest/contest_api';
import {Skeleton} from '@mui/material';
import {useRecoilState} from 'recoil'
import {
    CompetitionFilter_Course,
    CompetitionFilter_Location,
    CompetitionFilter_Month,
    CompetitionFilter_Keywords,
    CompetitionList,
    CompetitionSearch_Error
} from '../../../state/Competition/CompetitionSearch_State';
import Error from '../../../component/Error/ErrorModal';

import ContentSkeleton from '../../../component/feed/wide_Skeleton';


function Competition_Search(){
    const loadinglist = [1,2,3,4,5,6,7,8];
    const querylocation = useLocation();
    const filterContent ={
        month:[],
        course:[],
        location:[],
        keyword:"",
    };

    const navigate = useNavigate();

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [loading,setLoading] = useState(true);
    const [error,setError] = useRecoilState(CompetitionSearch_Error);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };

    const [list,setList] = useRecoilState(CompetitionList);
    const [month, setMonth] = useRecoilState(CompetitionFilter_Month);
    const [course, setCourse] = useRecoilState(CompetitionFilter_Course);
    const [location, setLocation] = useRecoilState(CompetitionFilter_Location);
    const [keyword, setKeyword] = useRecoilState(CompetitionFilter_Keywords);

    const getQuery = () =>{
        const query = querylocation.search
        const decodeUri = decodeURI(query);
        
        const searchParams = new URLSearchParams(decodeUri);
        
        for(let pair of searchParams.entries()){
            if(pair[0] == 'keyword'){
                filterContent[pair[0]] = pair[1];
                continue;
            }
            else{
                let content = Array.from(pair[1].split(' '))
                content = content.map(Number);
                filterContent[pair[0]] = content;
            }
        }

        setMonth((prev)=> prev = filterContent.month);
        setCourse((prev)=> prev = filterContent.course);
        setLocation((prev)=> prev = filterContent.location);
        setKeyword((prev)=> prev = filterContent.keyword);
    }

    const FetchCompetitionList = async (value) => {
        const _SearchCompetition = await fetchSearchContest(value);

        if(_SearchCompetition.response){
            setOpen(true)
        }
        else{
            setList(prev=>prev=_SearchCompetition)
        }

        setLoading(false);
    }

    useEffect(()=>{
        setLoading(true);
        getQuery();
    },[])

    useEffect(()=>{
        setLoading(true);
        FetchCompetitionList(decodeURI(querylocation.search));
    },[decodeURI(querylocation.search)]) 

    useEffect(() => {
        // 컴포넌트가 마운트되었을 때 실행될 함수
    
        return () => {
          // 컴포넌트가 언마운트되기 전에 실행될 함수 (클린업 함수)
            setMonth([]);
            setCourse([]);
            setLocation([]);
            setKeyword("");
            setList("");
          // ...
        };
      }, []);

    return(
        <Box sx={{position:"relative",display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar />   
            <Filter/>
            <Box sx={{position:'relative',width:'100%',my:'60px'}}>
                {
                    loading?
                    <Box sx={{width:"100%",mt:'50px'}}>
                        {loadinglist.map((item,index) =>(
                            <ContentSkeleton key={index}/>
                        ))
                        }
                    </Box>
                    :
                    <Box sx={{width:"100%"}}>
                        {
                            list.length!=0?
                            <List setOpen = {setOpen} />
                            :
                            <Box sx={{height:'calc(100vh - 60px)',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                                    존재하지 않습니다 :(
                                </Typography>
                            </Box>
                        }
                    </Box>
                }
            </Box>

            <Error error={error} open={open} handleClose={handleClose}/>
        </Box>    
    )
}

export default Auth(Competition_Search,null)