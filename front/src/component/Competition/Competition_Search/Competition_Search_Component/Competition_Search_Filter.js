import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Drawer from './Competition_Search_Drawer';
import {useRecoilState} from 'recoil'
import {
    CompetitionFilter_Course,
    CompetitionFilter_Location,
    CompetitionFilter_Month,
    CompetitionFilter_Keywords,
} from '../../../../state/Competition/CompetitionSearch_State';

export default function Competition_Schedule_Filter(props){

    const [open,setOpen] = useState(false);

    const [month, setMonth] = useRecoilState(CompetitionFilter_Month);
    const [course, setCourse] = useRecoilState(CompetitionFilter_Course);
    const [location, setLocation] = useRecoilState(CompetitionFilter_Location);

    const buttonTheme = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'60px',
        height:'25px',
        border:1,
        borderRadius:3,
        borderColor:'#D9D9D9',
        mr:1
    }

    const buttonTyphography ={
        fontFamily:'Pretendard Variable',
        fontWeight:'300',
        fontSize:'13px'
    }

    const openDrawer = () => {
        setOpen(true);
    }

    return(
        <Box sx={{position:"fixed",backgroundColor:'#ffffff',zIndex:1000,top:'60px',display:'flex',justifyContent:'start',alignItems:'center',height:'30px',borderColor:'#E8E8E8',width:'90%',height:'50px',minWidth:'360px',maxWidth:'420px'}}>
            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',ml:1}}>
                <Box backgroundColor={month.length == 0?'':'#4F1D76'} onClick ={openDrawer} sx={buttonTheme}>
                    <Typography color = {month.length == 0?'black':'white'} sx={buttonTyphography}>
                        날짜별 {month.length == 0?'':month.length}{'>'}
                    </Typography>
                </Box>
                <Box backgroundColor={course.length == 0?'':'#4F1D76'} onClick ={openDrawer} sx={buttonTheme}>
                    <Typography color = {course.length == 0?'black':'white'} sx={buttonTyphography}>
                        코스별 {course.length == 0?'':course.length }{'>'}
                    </Typography>
                </Box>
                <Box backgroundColor={location.length == 0?'':'#4F1D76'} onClick ={openDrawer} sx={buttonTheme}>
                    <Typography color = {location.length == 0?'black':'white'} sx={buttonTyphography}>
                        지역별 {location.length == 0?'':location.length}{'>'}
                    </Typography>
                </Box>
            </Box>
            <Drawer open = {open} setOpen ={setOpen}/>
        </Box>    
    )
}