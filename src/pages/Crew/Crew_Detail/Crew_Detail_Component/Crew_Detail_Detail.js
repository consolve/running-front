import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { useEffect,useState } from 'react';
import { API_URL } from '../../../../API/URL/url';

export default function Crew_Detail_Detail(props) {

    const [firstDetail,setFirstDetail] = useState([]);
    const [secondDetail,setSecondDetail] = useState([]);
    const category = ["정기런 러닝 장소","정기런 시간","크루 SNS","크루 가입 방법"];
    const secondCategory = ["크루 인원","크루 연령대","크루 개설년도"];


    useEffect(()=>{
        const squareList = [];
        const detail =[];

        squareList.push(props.crew.runningPlace);
        squareList.push(props.crew.regularRun);
        squareList.push("@"+props.crew.instagram);
        squareList.push(props.crew.crewApplyWay);


        detail.push(props.crew.crewMemberNumber+" 명");
        detail.push(props.crew.crewAverageNumber+" 대");
        detail.push(props.crew.crewCreatedDay+" 년");

        setFirstDetail(squareList);
        setSecondDetail(detail);

    },[])

    return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'column',width:'100%',mt:'15px'}}>
            <Box sx={{px:"20px"}}>
                <Typography color = "#4F1D76" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px'}}>
                    대회상세
                </Typography>
            </Box>


            <Box sx={{width:"100%",mt:'13px'}}>
                {
                    firstDetail.map((item,index)=>{
                        return(
                            <Box key ={index} sx={{height:'50px',border:1,borderColor:'#E8E8E8',borderRadius:'8px',my:'10px',mx:"20px"}}>
                                <Box sx={{width:'100%',margin:'auto',alignItems:"start",display:'flex',flexDirection:'column',justifyContent:"center",height:'100%',ml:1}}>
                                    <Typography color="#9D9D9D" sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px'}}>
                                        {category[index]}
                                    </Typography>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px'}}>
                                        {item}
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'column',width:'100%',mt:'13px'}}>
                {
                    secondDetail.map((item,index)=>{
                        return(
                            <Box key ={index} sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',height:'10px',my:0.8}}>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px',ml:"20px"}}>
                                    {secondCategory[index]}
                                </Typography>
                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'12px',mr:"20px"}}>
                                    {item}
                                </Typography>
                            </Box>
                        )
                    })}
            </Box>

        </Box>
    );
}