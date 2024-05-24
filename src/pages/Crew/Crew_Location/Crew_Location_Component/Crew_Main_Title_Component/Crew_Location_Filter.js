import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Drawer from './Crew_Location_Drawer';
import {useRecoilState} from 'recoil';
import {
    CrewLocation_Location
} from '../../../../../state/Crew/CrewLocation_State';

export default function Crew_Main_Filter(props){

    const [open,setOpen] = useState(false);
    const [location,setLocation] = useRecoilState(CrewLocation_Location);


    const locationName = {
        1:'수도권',
        2:'충청권',
        3:'강원권',
        4:'전라권',
        5:'경상권',
        6:'제주권',
    }

    const buttonTheme = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        border:1,
        borderRadius:3,     
        borderColor:'primary.main',
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
                <Box backgroundColor={location.length == 0?'rgba(79, 29, 118, 0.07)':'primary.main'} onClick ={openDrawer} sx={buttonTheme}>
                    <Typography color = {location.length == 0?'primary.main':'white'} sx={buttonTyphography}>
                        {location.length==0?'지역 >':`${locationName[location]} >`}
                    </Typography>
                </Box>
            </Box>
            <Drawer open = {open} setOpen ={setOpen}/>
        </Box>    
    )
}