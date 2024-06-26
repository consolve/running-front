import {Box,Typography,Button,Divider} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import { useNavigate } from "react-router-dom";
import TopBar from "./Competition_Schedule_Component/Competition_TopBar";
import Month from "./Competition_Schedule_Component/Competition_Schedule_Month"
import Register from "./Competition_Schedule_Component/Competition_Schedule_canRegister"
import Calendar from "./Competition_Schedule_Component/Competition_Schedule_Calendar"
import Filter from "./Competition_Schedule_Component/Competition_Schedule_Filter"
import Dial from "./Competition_Schedule_Component/Competition_Schedule_Dial"
import {Modal} from '@mui/material';
import {useRecoilState} from 'recoil'
import { CompetitionSchedule_MonthLoading,
    CompetitionSchedule_AccceptableLoading,
    CompetitionSchedule_CalendarLoading,
    CompetitionSchedule_AllLoading,
    CompetitionSchedule_Error,
} from '../../../state/Competition/CompetitionSchedule_State';
import Error from '../../../component/Error/ErrorModal';

function Competition_Schedule(){

    const navigate = useNavigate();

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };
    const [loading1,setLoading1] = useRecoilState(CompetitionSchedule_MonthLoading);
    const [loading2,setLoading2] = useRecoilState(CompetitionSchedule_AccceptableLoading);
    const [loading3,setLoading3] = useRecoilState(CompetitionSchedule_CalendarLoading);
    const [error,setError] = useRecoilState(CompetitionSchedule_Error);
    const [loadingall,setLoadingall] = useRecoilState(CompetitionSchedule_AllLoading);

    const LoadingCompilation = () => {
        if(!loading1&&!loading2&&!loading3){
            setLoadingall(false);
        }
    }

    useEffect(() =>{
        window.scrollTo({top:0})
        setLoading1(true);
        setLoading2(true);
        setLoading3(true)
        setLoadingall(true);
    },[])

    useEffect(()=>{
        LoadingCompilation();
    },[loading1,loading2,loading3])

    return(
        <Box sx={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar/>
            <Filter/>
            <Box sx={{width:'100%',mt:'60px'}}>
                <Month setError={setError} setOpen={setOpen}/>
                <Divider sx={{mt:3,mb:'20px',border:2,color:"#F6F6F6",mx:"20px"}}/>
                <Register setError={setError} setOpen={setOpen}/>
                <Divider sx={{mt:3,mb:'20px',border:2,color:"#F6F6F6",mx:"20px"}}/>
                <Calendar setError={setError} setOpen={setOpen}/>
            </Box>
            
            <Dial/>

            <Error error={error} open={open} handleClose={handleClose}/>
        </Box>    
    )
}

export default Auth(Competition_Schedule,null);