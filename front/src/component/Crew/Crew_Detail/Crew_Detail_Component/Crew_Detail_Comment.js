import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { useEffect,useState } from 'react';
import { useRecoilState } from 'recoil';
import {CompetitionSchedule_Comment} from "../../../../state/Competition/CompetitionSchedule_State"

export default function Competition_Detail_Detail(props) {

    const [comment,setComment] = useRecoilState(CompetitionSchedule_Comment);
    const category = ["대회일시","접수기간","대회장소","대회종목"];
    const secondCategory = ["홈페이지","주최","주관"];

    useEffect(()=>{

    },[])

    return (
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',mt:2}}>
            <Box sx={{width:'90%'}}>
                <Typography color = "#4F1D76" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px'}}>
                    댓글
                </Typography>
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'column',width:'90%',mt:1}}>
                <Box key ={1} sx={{width:'100%',height:'50px',border:1,borderColor:'#E8E8E8',borderRadius:'5px',my:0.5}}>
                    <Box sx={{width:'95%',margin:'auto',alignItems:"start",display:'flex',flexDirection:'column',justifyContent:"center",height:'100%'}}>
                        <Typography color="#9D9D9D" sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px'}}>
                            {category[1]}
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px'}}>
                            {1}
                        </Typography>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}