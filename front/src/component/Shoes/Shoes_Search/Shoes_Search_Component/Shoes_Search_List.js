import {Box,Typography,Grid} from '@mui/material';
import React, { useState,useCallback } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useLocation} from "react-router-dom"
import { useInView } from "react-intersection-observer"
import {CircularProgress} from '@mui/material';
import {API_URL} from "../../../../API/URL/index"
import {useRecoilState} from 'recoil'
import {
    ShoesList,
    ShoesSearch_Error
} from '../../../../state/Shoes/ShoesSearch_State';

import { fetchSearchShoes } from '../../../../API/api/RunningShoes/shoes_api';


export default function Shoes_Search_List(props){


    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const navigate = useNavigate();
    const querylocation = useLocation();

    
    const [error,setError] = useRecoilState(ShoesSearch_Error);
    const [list,setList] = useRecoilState(ShoesList);
    const [ref, inView] = useInView();
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);  
    
    const getItems = useCallback(async () => {
        const query = querylocation.search
        const decodeUri = decodeURI(query);
        setLoading(true);
        console.log(decodeUri)

        let _ShoesList = "";
    
        if(decodeUri === ""){
            _ShoesList = await fetchSearchShoes("?page="+page);
        }
        else{
            _ShoesList = await fetchSearchShoes(decodeUri+"&page="+page);
        }
        console.log(_ShoesList)

        if(_ShoesList.response){
            setError(_ShoesList.response.status)
            props.setOpen(true);
        }
        else{
            setList((prev)=>[...prev,..._ShoesList])
        }

        setLoading(false);
    }, [page])

    const navigateToShoesDetail =(id) =>{
        navigate(`/shoes/detail/${id}`);
    }

    useEffect(() => {
        getItems();
    }, [getItems])

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage(prevState => prevState + 1)
        }
    }, [inView])


    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',flexDirection:'column',width:'100%',mb:8,mt:'50px'}}>
            <Box sx={{width:'100%',display:'flex',justifyContent:"center"}}>
                
                <Grid container spacing={0} columns={12}>
                        {
                            list.map((item,index)=>{
                                return(
                                    <React.Fragment key = {index}>
                                    {
                                        list.length-1===index?
                                        <Grid item xs={6} sm={6} key={item.id}>
                                            <Box ref = {ref}  onClick={()=>navigateToShoesDetail(item.id)} sx={{width:'100%'}}>
                                                <Box sx={{width:'90%',pb:'90%',backgroundColor:'#4F1D76',borderRadius:3,mx:'auto',backgroundImage:`url(${API_URL}${item.shoesImg})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                                <Box sx={{my:1}}>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px',mx:2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {item.brand}
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'16px',mx:2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {item.koreanName}
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px',mx:2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {formatNumberWithCommas(item.price)}{"원"}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        :
                                        <Grid item xs={6} sm={6} key={item.id}>
                                            <Box onClick={()=>navigateToShoesDetail(item.id)} sx={{width:'100%'}}>
                                                <Box sx={{width:'90%',pb:'90%',backgroundColor:'#4F1D76',borderRadius:3,mx:'auto',backgroundImage:`url(${API_URL}${item.shoesImg})`,backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                                                <Box sx={{my:1}}>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px',mx:2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {item.brand}
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'16px',mx:2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {item.koreanName}
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px',mx:2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {formatNumberWithCommas(item.price)}{"원"}
                                                    </Typography>
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