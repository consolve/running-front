import {Box,Typography,IconButton,Card} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { API_URL } from '../../../../../API/URL';
import { shoesList } from '../../../../../style/plate/ShoesList';
import {useNavigate} from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';
import "swiper/css/grid";


function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

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
                        >
                            {
                                shoes.map((item,index)=>{
                                    return(
                                        <SwiperSlide key={index} className='shoes'>
                                            <Box onClick={()=>navigateToShoesDetail(item.id)} sx={{width:'100%',height:'250px'}}>
                                                <Box sx={{position:'relative',backgroundColor:'#f4f4f4',borderRadius:'8px'}}>
                                                    <img src={`${API_URL}${!item.shoesImg.length?null:item.shoesImg[0].url}`} style={{width:'170px',height:'170px',objectFit:'contain',objectPosition:'center',px:1}}/>
                                                        {
                                                            shoesBookmark[item.id]?
                                                            <IconButton onClick={(e)=>onClickBookMart(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                                <BookmarkIcon/>
                                                            </IconButton>
                                                            :
                                                            <IconButton onClick={(e)=>onClickBookMart(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                                <BookmarkBorderIcon/>
                                                            </IconButton>
                                                        }
                                                </Box>
                                                <Box sx={shoesList.shoesDetailBox}>
                                                    <Typography sx={shoesList.shoesDetailBrand}>
                                                        {item.brand}
                                                    </Typography>
                                                    <Typography sx={shoesList.shoesDetailName}>
                                                        {item.koreanName}
                                                    </Typography>
                                                    <Typography sx={shoesList.shoesDetailPrice}>
                                                        {formatNumberWithCommas(item.price)}{"원"}
                                                    </Typography>
                                                </Box>
                                            </Box>
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