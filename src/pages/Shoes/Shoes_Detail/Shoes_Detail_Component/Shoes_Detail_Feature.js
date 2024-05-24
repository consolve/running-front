import * as React from 'react';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { useEffect,useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

export default function Shoes_Detail_Feature(props) {

    const FeatureList1 = [["발볼 크기","footFeet"],["힐 크기","shoesHeel"],["전체 크기","shoesTotalSize"],["무게","shoesWeight"]];


    useEffect(()=>{
        
    },[])

    return (
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',mt:2}}>
            <Box sx={{width:'100%'}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:"21.48px",px:'20px'}}>
                    이런 특징을 가지고 있어요
                </Typography>
            </Box>


            <Box sx={{width:'100%',mt:1}}>

               {/*박스*/}
                <Box sx={{px:"20px"}}>
                    {
                        FeatureList1.map((item,index)=>{
                            return(
                                <Box key ={index} sx={{width:'100%',height:'50px',border:1,borderColor:'#E8E8E8',borderRadius:'5px',my:1}}>
                                    <Box sx={{px:1,margin:'auto',alignItems:"start",display:'flex',flexDirection:'column',justifyContent:"center",height:'100%'}}>
                                        <Typography color="#9D9D9D" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'10px'}}>
                                            {item[0]}
                                        </Typography>

                                        <Box sx={{display:'flex',alignItems:"center",justifyContent:"center"}}>
                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px'}}>
                                                {props.shoes[item[1]]}{"mm"}
                                            </Typography>
                                            <Box sx={{display:'flex'}}>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px',mr:0.5}}>
                                                    로 다른 신발보다
                                                </Typography>
                                                {
                                                    props.shoes[item[1]]>100
                                                    ?
                                                    <Typography color = "primary.main" sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px'}}>
                                                        커요           
                                                    </Typography>
                                                    :
                                                    <Typography color = "primary.main" sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px'}}>
                                                        작아요        
                                                    </Typography>
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>


                {/*그 외*/}
                <Box sx={{display:'flex',flexDirection:'column',alignItems:"start",justifyContent:'center',mt:'15px',px:"20px"}}>
                    <Box sx={{display:"flex",alignItems:"center",alignItems:"center",justifyContent:'space-between',width:'100%'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'12px',lineHeight:'14.32px'}}>
                            {"그 외"}
                        </Typography>
                        <Box sx={{display:'flex',alignItems:"center"}}>
                            <Typography color = "primary.main" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'12px',lineHeight:'14.32px'}}>
                                {
                                    props.shoes.etcTag.map(item=>item.content).join(", ")
                                }
                            </Typography>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'12px'}}>
                            {"가 있어요"}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}