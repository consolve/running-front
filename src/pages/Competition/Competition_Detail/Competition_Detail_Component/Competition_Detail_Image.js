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

export default function Competition_Detail_Image(props) {

    const [current,setCurrent] = useState(0);
    const [OfficialImg,setOfficialImg] = useState([]);


    const handleToggle = (index) =>{
        setCurrent((prev)=>prev=index);
    }

    useEffect(()=>{

        setOfficialImg(props.competition.courseImgs);
    },[])

    return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'column',width:'100%',mt:'19px'}}>
            <Box sx={{width:'100%'}}>
                <Typography color = "primary.main" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:'21.48px',px:"20px"}}>
                    대회 공식 이미지
                </Typography>
            </Box>

            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'90%',mt:1}}>
                <Box sx={{px:"20px",display:"flex"}}>
                {
                    props.competition.courseImgs.map((item,index)=>{
                        return(
                            <Box key = {index} onClick ={()=>handleToggle(index)} backgroundColor={current===index?'primary.main':''}  sx={{width:"21px",height:'21px',border:1,borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                <Typography color = {current===index?'white':"#606060"} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px'}}>
                                    {index+1}
                                </Typography>
                            </Box>   
                        )
                    })
                }
                </Box>
            </Box>

            {
                props.competition.courseImgs[current]?
                <Box sx={{backgroundImage:`url(${API_URL}${props.competition.courseImgs[current].img})`,width:'90%',pb:'90%',borderRadius:'8px',mx:'auto',mt:1,backgroundPosition: 'contain',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}/>
                :
                <Box sx={{width:'90%',pb:'90%',borderRadius:3,mx:'auto',mt:1}}/>
            }
            
        </Box>
    );
}