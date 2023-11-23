import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { useEffect,useState } from 'react';
import { listItemSecondaryActionClasses } from '@mui/material';

export default function Shoes_Detail_Recommend(props) {

    const [firstDetail,setFirstDetail] = useState([]);
    const [secondDetail,setSecondDetail] = useState([]);
    const category = ["대회일시","접수기간","대회장소","대회종목"];
    const secondCategory = ["홈페이지","주최","주관"];

    
    useEffect(()=>{
        
    },[])

    return (
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',flexDirection:'column',width:'100%',mt:2}}>
            <Box sx={{px:"20px"}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:"21.48px"}}>
                    이런 분들에게 추천해요
                </Typography>
            </Box>

            <Box sx={{width:'100%',mt:1}}>
                {
                    props.shoes.recommendTo.map((item,index)=>{
                        return(
                            <Box key = {index} sx={{display:'flex',justifyContent:'start',alignItems:'center',mx:'20px',mt:1,backgroundColor:'#4F1D76',height:'28px',borderRadius:'14px'}}>
                                <Box key ={index} sx={{borderRadius:'50%',width:'24px',height:'24px',border:"2.5px solid #4F1D76",backgroundColor:'#ffffff',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Typography marginRight={index==0?'1px':0} align="center" sx={{color:'#4F1D76',fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px',height:'15px',lineHeight:'15.51px'}}>
                                        {index+1}
                                    </Typography>
                                </Box>

                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#ffffff',ml:'3px',lineHeight:"16.71px"}}>
                                    {item.content}
                                </Typography>
                            </Box>
                        )
                    })
                }
            </Box>

        </Box>
    );
}