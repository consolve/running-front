import * as React from 'react';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { useEffect,useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { API_URL } from '../../../../API/URL/url';

import { Navigation } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

export default function Competition_Detail_Course(props) {


    const [current,setCurrent] = useState(0);


    const handleToggle = (index) =>{
        setCurrent((prev)=>prev=index);
    }

    useEffect(()=>{
        
    },[])

    return (
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',mt:2,mb:3}}>
            <Box sx={{width:'90%'}}>
                <Typography color = "#4F1D76" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px'}}>
                    코스
                </Typography>
            </Box>

            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'90%',mt:1}}>
                {
                    props.competition.courseTags.map((item,index)=>{
                        return(
                            <Box key = {index} onClick ={()=>handleToggle(index)} backgroundColor={current===index?'#4F1D76':''}  sx={{width:"auto",height:'23px',border:1,borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                <Typography color = {current===index?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',mx:1}}>
                                    {item.name}
                                </Typography>
                            </Box>   
                        )
                    })
                }
            </Box>

            {
                props.competition.courseTags[current]?
                <Box sx={{backgroundImage:`url(${API_URL}${props.competition.courseTags[current].map}})`,width:'90%',pb:'90%',borderRadius:3,mx:'auto',mt:1}}/>
                :
                <Box sx={{width:'90%',pb:'90%',borderRadius:3,mx:'auto',mt:1}}/>
            }
            
        </Box>
    );
}