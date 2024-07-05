import {Box,Typography,IconButton,Card} from '@mui/material';
import { shoesList } from '../../../../../style/plate/ShoesList';
import {useNavigate} from "react-router-dom";
import Feed from "../../../../../component/shoes/feed"

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";

export default function ShoesContent({shoes,shoesBookmark,onClickBookMart}){
    const navigate = useNavigate();


    const navigateToShoesDetail =(id) =>{
        navigate(`/shoes/detail/${id}`)
    }


    return(
        <Box sx={{width:'100%'}}>
            {
                <Box>
                {
                    shoes?
                        <Swiper
                            spaceBetween={8}
                            modules={[FreeMode]}
                            slidesPerView={'auto'}
                            freeMode={{enabled: true}}	// 추가
                            style={{paddingLeft:"20px",paddingRight:"20px",width:"auto"}}
                            cssMode={true}
                        >
                            {
                                shoes.map((item,index)=>{
                                    return(
                                        <SwiperSlide key={index} className='shoes'>
                                            <Feed data={{
                                                item:item,
                                                shoesBookmark:shoesBookmark,
                                                onClickBookMart:onClickBookMart,
                                            }}/>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    :
                    <Box sx={{height:'250px',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                            존재하지 않습니다 :(
                        </Typography>
                    </Box>
                }
            </Box>
            }
        </Box>
    )
}