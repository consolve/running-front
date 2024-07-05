import {Box,Typography,Button,Divider} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from "../../../hoc/auth"
import TopBar from "./Shoes_Main_Component/Shoes_Main_TopBar";
import ShoesBrand from "./Shoes_Main_Component/Shoes_Main_Brand";
import ShoesFeature from "./Shoes_Main_Component/Shoes_Main_Feature"
import ShoesUseage from "./Shoes_Main_Component/Shoes_Main_Useage"
import Filter from "./Shoes_Main_Component/Shoes_Main_Filter"
import Dial from "./Shoes_Main_Component/Shoes_Main_Dial"
import ShoesAll from "./Shoes_Main_Component/Shoes_Main_All"
import {useRecoilState} from 'recoil'   
import {
    ShoesMain_UseageLoading,
    ShoesMain_BrandLoading,
    ShoesMain_FeatureLoading,
    ShoesMain_Error,
    ShoesMain_AllLoading,
} from '../../../state/Shoes/ShoesMain_State';
import Error from "../../../component/Error/ErrorModal"

function Shoes_Main(){
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        navigate("/");
    }


    const [loading1,setLoading1] = useRecoilState(ShoesMain_BrandLoading);
    const [loading2,setLoading2] = useRecoilState(ShoesMain_FeatureLoading);
    const [loading3,setLoading3] = useRecoilState(ShoesMain_UseageLoading);
    const [error,setError] = useRecoilState(ShoesMain_Error);
    const [loadingall,setLoadingall] = useRecoilState(ShoesMain_AllLoading);

    const LoadingCompilation = () => {
        if(!loading1&&!loading2&&!loading3){
            setLoadingall(false);
        }
    }

    useEffect(() =>{  
        setLoading1(true);
        setLoading2(true);
        setLoading3(true);
        setLoadingall(true);
    },[])

    useEffect(()=>{
        LoadingCompilation();
    },[loading1,loading2,loading3])

    return(
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar/>
            <Box sx={{width:'100%',mt:'60px'}}>
                <Filter setOpen = {handleOpen} setClose = {handleClose} setError = {setError}/>

                <ShoesBrand setOpen = {handleOpen} setClose = {handleClose} setError = {setError}/>
                <Divider sx={{border:2,color:"#F6F6F6",mx:"20px",my:"20px"}}/>
                <ShoesFeature setOpen = {handleOpen} setClose = {handleClose} setError = {setError}/>
                <Divider sx={{border:2,color:"#F6F6F6",mx:"20px",my:"20px"}}/>
                <ShoesUseage setOpen = {handleOpen} setClose = {handleClose} setError = {setError}/>
                <Divider sx={{border:2,color:"#F6F6F6",mx:"20px",my:"20px"}}/>
                <ShoesAll setOpen = {handleOpen}/>
            </Box>

            <Dial/>
        
            <Error error={error} open={open} handleClose={handleClose}/>
        </Box>    
    )
}

export default Auth(Shoes_Main,null);