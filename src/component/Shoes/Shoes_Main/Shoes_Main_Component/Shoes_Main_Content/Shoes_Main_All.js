import {Box,Grid,Typography,IconButton} from '@mui/material';
import React from "react";
import {API_URL} from "../../../../../API/URL/index"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


export default function AllShoes({list,shoesBookmark,onClickBookMart,navigateToShoesDetail}){

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return(
        <Box sx={{width:"100%",mt:2,display:"flex",justifyContent:"center"}}>
        {
            list.length!=0?
            <Box sx={{width:"100%",px:'20px'}}>
                <Grid container spacing={'10px'} columns={16} >
                        {
                            list.map((item,index)=>{
                                return(
                                    <React.Fragment key = {index}>
                                    {
                                        <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
                                            <Box onClick={()=>navigateToShoesDetail(item.id)} sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:"start",justifyContent:'center'}}>
                                                <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:'100%',pb:'100%',overflow:"hidden",borderRadius:'8px'}}>
                                                    <img src={`${API_URL}${!item.shoesImg.length?null:item.shoesImg[0].url}`}  style={{position:"absolute",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
                                                    {
                                                        shoesBookmark[item.id]?
                                                        <IconButton onClick={(e)=>onClickBookMart(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:1}}>
                                                            <BookmarkIcon/>
                                                        </IconButton>
                                                        :
                                                        <IconButton onClick={(e)=>onClickBookMart(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:1}}>
                                                            <BookmarkBorderIcon/>
                                                        </IconButton>
                                                    }
                                                </Box>
                                                
                                                <Box sx={{my:1}}>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {item.brand}
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {item.koreanName}
                                                    </Typography>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                        {formatNumberWithCommas(item.price)}{"원"}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    }
                                    </React.Fragment>
                                )
                            })
                        }
                </Grid>
            </Box>
            :
            ""
        }
    </Box>   
    )
}