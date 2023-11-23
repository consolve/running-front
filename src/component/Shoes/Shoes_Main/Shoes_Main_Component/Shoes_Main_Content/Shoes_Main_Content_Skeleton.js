import {Box,Skeleton} from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";


const loadinglist = [1,2,3,4,5,6];

export default function ContentSkeleton(){
    return(
        <Box sx={{width:"100%"}}>
                    <Box>
                        <Swiper
                            spaceBetween={8}
                            modules={[FreeMode]}
                            slidesPerView={'auto'}
                            freeMode={{enabled: true}}	// 추가
                            style={{paddingLeft:"20px",paddingRight:"20px"}}
                        >
                            {
                                loadinglist.map((item,index)=>{
                                    return(
                                        <SwiperSlide key = {item} className='shoes'>
                                            <Box sx={{width:'100%'}}>
                                                <Skeleton variant="rectangular" width={'100%'} height={"250px"} sx={{borderRadius:3}}/>
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