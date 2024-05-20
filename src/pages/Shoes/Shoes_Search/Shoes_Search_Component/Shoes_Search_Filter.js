import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Drawer from './Shoes_Search_Drawer';
import {useRecoilState} from 'recoil';
import { 
    ShoesFilter_Brand,
    ShoesFilter_Feature,
    ShoesFilter_Useage,
    ShoesFilter_Price,
    ShoesFilter_Keyword
} from '../../../../state/Shoes/ShoesSearch_State';

export default function Shoes_Search_Filter(props){

    const [open,setOpen] = useState(false);

    const [brand, setBrand] = useRecoilState(ShoesFilter_Brand);
    const [feature, setFeature] = useRecoilState(ShoesFilter_Feature);
    const [useage, setUseage] = useRecoilState(ShoesFilter_Useage);
    const [price, setPrice] = useRecoilState(ShoesFilter_Price);


    const buttonTheme = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'25px',
        border:1,
        borderRadius:'8px',
        borderColor:'#D9D9D9',
        mr:1
    }

    const buttonTyphography ={
        fontFamily:'Pretendard Variable',
        fontWeight:'500',
        fontSize:'13px',
        px:'7px'
    }

    const openDrawer = () => {
        setOpen(true);
    }


    return(
        <Box sx={{position:"fixed",backgroundColor:'#ffffff',zIndex:1000,top:'62px',display:'flex',justifyContent:'start',alignItems:'center',height:'50px',borderColor:'#E8E8E8',width:'100%',minWidth:'360px',maxWidth:'450px'}}>
            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',px:"20px"}}>
                <Box backgroundColor={brand.length == 0?'':'#4F1D76'} onClick ={openDrawer} sx={buttonTheme}>
                    <Typography color = {brand.length == 0?'black':'white'} sx={buttonTyphography}>
                        브랜드 {brand.length == 0?'':brand.length}{'>'}
                    </Typography>
                </Box>
                <Box backgroundColor={feature.length == 0?'':'#4F1D76'} onClick ={openDrawer} sx={buttonTheme}>
                    <Typography color = {feature.length == 0?'black':'white'} sx={buttonTyphography}>
                        특징별 {feature.length == 0?'':feature.length }{'>'}
                    </Typography>
                </Box>
                <Box backgroundColor={useage.length == 0?'':'#4F1D76'} onClick ={openDrawer} sx={buttonTheme}>
                    <Typography color = {useage.length == 0?'black':'white'} sx={buttonTyphography}>
                        용도별 {useage.length == 0?'':useage.length}{'>'}
                    </Typography>
                </Box>
                <Box backgroundColor={JSON.stringify(price) === JSON.stringify([0,100])?'':'#4F1D76'} onClick ={openDrawer} sx={buttonTheme}>
                    <Typography color = {JSON.stringify(price) === JSON.stringify([0,100])?'black':'white'} sx={buttonTyphography}>
                        가격대 {'>'}
                    </Typography>
                </Box>
            </Box>
            <Drawer open = {open} setOpen ={setOpen}/>
        </Box>    
    )
}