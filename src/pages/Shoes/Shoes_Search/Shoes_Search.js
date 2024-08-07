import {Box,Typography,Grid,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import { useNavigate } from "react-router-dom";
import TopBar from "./Shoes_Search_Component/Shoes_Search_TopBar";
import Filter from "./Shoes_Search_Component/Shoes_Search_Filter"
import List from "./Shoes_Search_Component/Shoes_Search_List"
import {useLocation} from "react-router-dom"
import {useRecoilState} from 'recoil'
import {Skeleton} from '@mui/material';
import {
    ShoesFilter_Brand,
    ShoesFilter_Feature,
    ShoesFilter_Useage,
    ShoesFilter_Keyword,
    ShoesFilter_Price,
    ShoesList,
    ShoesSearch_Error
} from '../../../state/Shoes/ShoesSearch_State';
import { fetchSearchShoes } from '../../../API/api/RunningShoes/shoes_api';
import Error from "../../../component/Error/ErrorModal"

function Shoes_Search(){
    const loadinglist = [1,2,3,4,5,6,7,8];
    const querylocation = useLocation();
    const session = localStorage.getItem("sessionid");

    const filterContent ={
        brand:[],
        feature:[],
        useage:[],
        money:[],
        keyword:"",
        min:0,
        max:100
    };

    const navigate = useNavigate();

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [loading,setLoading] = useState(true);
    const [error,setError] = useRecoilState(ShoesSearch_Error);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };

    const [list,setList] = useRecoilState(ShoesList);
    const [brand, setBrand] = useRecoilState(ShoesFilter_Brand);
    const [feature, setFeature] = useRecoilState(ShoesFilter_Feature);
    const [useage, setUseage] = useRecoilState(ShoesFilter_Useage);
    const [keyword, setKeyword] = useRecoilState(ShoesFilter_Keyword);
    const [price, setPrice] = useRecoilState(ShoesFilter_Price);

    const setSearchState = (name,value) =>{
        const state = ['brand','feature','useage','keyword','price'];
        const setFunction = [setBrand,setFeature,setUseage,setKeyword,setPrice];

        const index = state.indexOf(name);

        setFunction[index](value);

        filterContent[name] = value;
    }

    const getQuery = () =>{
        const query = querylocation.search
        const decodeUri = decodeURI(query);
        
        const searchParams = new URLSearchParams(decodeUri);

        for(let pair of searchParams.entries()){
            if(pair[0] == 'keyword'){
                filterContent[pair[0]] = pair[1];
            }
            else{
                let content = Array.from(pair[1].split(' '))
                content = content.map(Number); 
                filterContent[pair[0]] = content;
            }
        }

        filterContent.price = [filterContent.min,filterContent.max];

        setBrand((prev)=> prev = filterContent.brand);
        setFeature((prev)=> prev = filterContent.feature);
        setUseage((prev)=> prev = filterContent.useage);
        setKeyword((prev)=> prev = filterContent.keyword);
        setPrice((prev)=> prev = filterContent.price.map(item => item>=0&&item<=100?item:item/2000));
    }

    const FetchShoesList = async (value) => {
        const _SearchShoes = await fetchSearchShoes(value,session);
        
        if(_SearchShoes.response){
            setError(_SearchShoes.response.status)
            setOpen(true)
        }
        else{
            setList(prev=>prev=_SearchShoes)
        }

        setLoading(false);
    }

    useEffect(()=>{
        setLoading(true);
        getQuery();
    },[])


    useEffect(()=>{
        setLoading(true);
        FetchShoesList(decodeURI(querylocation.search));
    },[decodeURI(querylocation.search)]) 

    useEffect(()=>{
        return () => {
            // 컴포넌트가 언마운트되기 전에 실행될 함수 (클린업 함수)
            setBrand([]);
            setFeature([]);
            setUseage([]);
            setPrice([5,100]);
            setKeyword("");
            setList([]);
            // ...
          };
    },[])


    return(
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar filterContent = {{
                brand:brand,
                feature:feature,
                useage:useage,
                keyword:keyword,
                money:price
            }}
            setSearchState = {setSearchState}/>
            <Filter />
            <Box sx={{width:'100%',mt:'63px'}}>
                {
                    loading?
                    <Box sx={{width:"100%",mt:'50px',display:"flex",justifyContent:"center"}}>
                    {
                        loadinglist.length!=0?
                        <Box sx={{width:"100%",px:'20px'}}>
                            <Grid container spacing={1} columns={16} >
                                    {
                                        loadinglist.map((item,index)=>{
                                            return(
                                                <React.Fragment key = {index}>
                                                {
                                                    <Grid item xs={8} sx={{display:'flex',justifyContent:'center'}}>
                                                        <Skeleton variant="rectangular" width={'100%'} height={"240px"} sx={{mt:1,borderRadius:2}}/>  
                                                    </Grid>
                                                }
                                                </React.Fragment>
                                            )
                                        })
                                    }
                            </Grid>
                        </Box>
                        :
                        ""
                    }
                    </Box>   
                    :
                    <Box sx={{width:"100%",mt:"50px"}}>
                        {
                            list.length!=0?
                            <List setOpen = {setOpen}/>
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


export default Auth(Shoes_Search,null);