import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';

export default function Shoes_Detail_Title(props){

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

    useEffect(() =>{
        console.log(props.shoes)
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',backgroundColor:'#ffffff',borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>

            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',width:'90%',pt:3,pb:1}}>
                <Typography color = "#000000" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px'}}>
                    {`\"${props.shoes.oneLineIntroduce}\"`}
                </Typography>
            </Box>

            <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',flexDirection:'column',width:'90%',pt:2,pb:1}}>
                <Typography color = "#000000" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                    {props.shoes.brand}
                </Typography>
                <Typography color = "#000000" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px'}}>
                    {props.shoes.name}
                </Typography>
                <Typography color = "#9D9D9D" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px'}}>
                    {props.shoes.koreanName}
                </Typography>
            </Box>

            <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',flexDirection:'column',width:'90%',py:2}}>
                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                    <Typography color = "#9D9D9D" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px'}}>
                        출시색상
                    </Typography>
                    <Box sx={{display:'flex'}}>
                        {
                            props.shoes.launchColor.map((item,index)=>{
                                console.log(item.content)
                                return(
                                    <Box key ={index} backgroundColor={item.content} sx={{borderRadius:'50%',width:'15px',height:'15px',mr:1,border:1}}/>
                                )
                            })
                        }
                    </Box>
                </Box>

                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',mt:0.5}}>
                    <Typography color = "#9D9D9D" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px'}}>
                        발매가
                    </Typography>
                    <Box sx={{display:'flex'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'18px'}}>
                            {formatNumberWithCommas(props.shoes.price)}원
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>    
    )
}