import { Box,Typography } from "@mui/material"


import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

export default function Tags({tags,select,handleToggle}){
    return(
        <Box sx={{width:"100%",mt:'15px',mb:2}}>
            {
                tags?
                <Box>
                    <Swiper
                        spaceBetween={8}
                        modules={[FreeMode]}
                        slidesPerView={'auto'}
                        freeMode={{enabled: true}}	// 추가
                        style={{paddingLeft:"20px",paddingRight:"20px",width:"auto"}}
                    >
                    
                        {
                        tags.map((item,index)=>{
                            return(
                                <SwiperSlide key ={index} className='swiper-width-auto'>
                                    <Box onClick = {() =>handleToggle(index)} backgroundColor = {select === index?'#4F1D7642':"#E8E8E8"} sx={{height:'22px',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'3px'}}>
                                        <Typography color = {select === index?"#4F1D76":"#000000"} sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px',mx:1,lineHeight:"19.09px",my:"1px"}}>
                                            {item.name}
                                        </Typography>
                                    </Box>
                                </SwiperSlide>
                            )
                        })
                        }

                    </Swiper>
                </Box>
                :
                ""

            }
        </Box>
    )
}