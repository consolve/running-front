import {Box,Typography,Grid} from '@mui/material';
import React from "react";
import Filter from './Crew_Filter';


export default function Shoes_Main_All({title,content}){

    return(
        <Box sx={{backgroundColor:'#ffffff',height:'60%',borderColor:'#E8E8E8',width:'100%',mb:2}}>

            {/*상단제목*/}
            <Box sx={{px:'20px'}}>
                <Box sx={{display:'flex',alignItems:'start',flexDirection:'column',justifyContent:"center"}}>
                    <Box sx={{}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px',lineHeight:"28.64px"}}>
                            {title}
                        </Typography>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"space-between",width:"100%",alignItems:'center',height:"25px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:"#9D9D9D",lineHeight:'16.71px',mt:"7px"}}>
                            {content}
                        </Typography>
                        <Filter/>
                    </Box>
                </Box>
            </Box>
        </Box>    
    )
}