import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Drawer from './Crew_Drawer';
import {useRecoilState} from 'recoil';
import {
    CrewMain_Location
} from '../../../state/Crew/CrewMain_State';

export default function Crew_Main_Filter(props){

    const [open,setOpen] = useState(false);
    const [location,setLocation] = useRecoilState(CrewMain_Location);
    const locationName = {
        1:'수도권',
        2:'경상권',
        3:'충청권',
        4:'전라권',
        5:'제주권',
    }

    const buttonTheme = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        border:1,
        borderRadius:3,     
        borderColor:'#4F1D76',
        mr:1
    }

    const buttonTyphography ={
        fontFamily:'Pretendard Variable',
        fontWeight:'500',
        fontSize:'13px',
        lineHeight:"15.51px",
        pl:'13px',
        pr:'6px',
        py:'4px'
    }

    const openDrawer = () => {
        setOpen(true);
    }

    return(
        <Box sx={{backgroundColor:'#ffffff',display:'flex',justifyContent:'start',alignItems:'center',borderColor:'#E8E8E8'}}>
            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                <Box backgroundColor={location.length == 0?'rgba(79, 29, 118, 0.07)':'#4F1D76'} onClick ={openDrawer} sx={buttonTheme}>
                    <Typography color = {location.length == 0?'#4F1D76':'white'} sx={buttonTyphography}>
                        {location.length==0?'지역 >':`${locationName[location]} >`}
                    </Typography>
                </Box>
            </Box>
            <Drawer open = {open} setOpen ={setOpen}/>
        </Box>     
    )
}