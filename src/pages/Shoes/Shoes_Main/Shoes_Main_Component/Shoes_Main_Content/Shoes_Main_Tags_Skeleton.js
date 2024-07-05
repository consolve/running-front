import { Box,Skeleton } from "@mui/material"

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

const loadinglist = [1,2,3,4,5,6,7,8,9,10];

export default function TagsSkeleton(){
    return(
        <Box sx={{mt:'16px',mb:2,width:"100%"}}>
                    <Box sx={{px:"20px"}}>
                    {/*필터*/}
                        <Swiper
                            spaceBetween={1}
                            modules={[FreeMode]}
                            slidesPerView={'auto'}
                            freeMode={{enabled: true}}	// 추가
                            cssMode={true}
                        >
                            {
                                loadinglist.map((item,index)=>{
                                    return(
                                        <SwiperSlide key = {item} className="tag-loading">
                                            <Box sx={{width:'100%',height:'22px',display:"flex",alignItems:"center"}}>
                                                <Skeleton variant="rectangular" width={'50px'} height={"22px"} sx={{borderRadius:3}}/>
                                            </Box>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </Box>
                </Box>
    )
}