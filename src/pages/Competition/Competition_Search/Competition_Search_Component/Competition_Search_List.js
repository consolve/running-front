import {Box,CircularProgress,Paper} from '@mui/material';
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

import ContentSkeleton from '../../../../component/shoes/wide_Skeleton';
import Content from '../../../../component/shoes/wide_feed';

export default function Competition_Search_List(props){
    const querylocation = useLocation();
    const session = localStorage.getItem('sessionid');
    const navigate = useNavigate();

    const [error, setError] = useRecoilState(CompetitionSearch_Error);
    const [list, setList] = useRecoilState(CompetitionList);
    const [ref, inView] = useInView();
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);

    const getItems = async () => {
        const query = querylocation.search;
        const decodeUri = decodeURI(query);
        setLoading(true);

        let _SearchCompetition = "";

        if (decodeUri === "") {
            _SearchCompetition = await fetchSearchContest(decodeUri + "?page=" + page, session);
        } else {
            _SearchCompetition = await fetchSearchContest(decodeUri + "&page=" + page, session);
        }

        if (_SearchCompetition.response) {
            setError(_SearchCompetition.response.status);
            props.setOpen(true);
        } else {
            setList((prev) => [...prev, ..._SearchCompetition]);
        }

        setLoading(false);
    };  

    useEffect(() => {
        getItems();
    }, [page]);

    useEffect(() => {
        if (inView && !loading) {
            setPage((prevState) => prevState + 1);
        }
    }, [inView, loading]);

    const navigateToCompetitionDetail =(id) =>{
        navigate(`/competition/detail/${id}`);
    }


    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',height:'100%',mt:'50px'}}>

            <Box sx={{width:'100%'}}>
                {list.map((item,index) =>{
                    return(
                    <React.Fragment key={index}>
                        {
                            list.length-1===index?
                            <Content inputref={ref} item={item} navigateToCompetitionDetail={navigateToCompetitionDetail}/>
                            :
                            <Content item={item} navigateToCompetitionDetail={navigateToCompetitionDetail}/>

                        }
                    </React.Fragment>
                    )  
                })}
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