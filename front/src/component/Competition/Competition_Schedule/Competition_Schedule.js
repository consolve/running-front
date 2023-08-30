import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import TopBar from "./Competition_Schedule_Component/Competition_TopBar";
import Month from "./Competition_Schedule_Component/Competition_Schedule_Month"
import Register from "./Competition_Schedule_Component/Competition_Schedule_canRegister"
import Calendar from "./Competition_Schedule_Component/Competition_Schedule_Calendar"
import Filter from "./Competition_Schedule_Component/Competition_Schedule_Filter"
import {fetchAcceptableContest} from "../../../API/api/Contest/contest_api"
import {fetchMonthContest} from "../../../API/api/Contest/contest_api"
import { fetchCalendarContest } from '../../../API/api/Contest/contest_api';
import {Modal} from '@mui/material';
import {useRecoilState} from 'recoil'
import { CompetitionSchedule_MonthLoading,
    CompetitionSchedule_AccceptableLoading,
    CompetitionSchedule_CalendarLoading,
    CompetitionSchedule_AllLoading,
    CompetitionSchedule_Error,
} from '../../../state/Competition/CompetitionSchedule_State';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Competition_Schedule(){

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
        setLoading1(true);
        setLoading2(true);
        setLoading3(true)
        setLoadingall(true);
    },[])

    useEffect(()=>{
        LoadingCompilation();
    },[loading1,loading2,loading3])

    return(
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar/>
            <Filter/>
            <Box sx={{width:'95%',mt:'60px'}}>
                <Month setError={setError} setOpen={setOpen}/>
                <Register setError={setError} setOpen={setOpen}/>
                <Calendar setError={setError} setOpen={setOpen}/>
            </Box>

            <Box>   
                <Modal
                    open={open}
                    onClose={handleClose}
                    disableScrollLock
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    </Box>
                </Modal>
            </Box>
        </Box>    
    )
}