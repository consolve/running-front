import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';


export default function  Community(){

    const post_list = [
        {
            user:'쿠킹러너',
            title:'과음한 다음날 \'러닝\'해도 괜찮을까요?',
            content:'알코올이 신체 내에 흡수되면 디하이드로제논과 같은 화학 물질이 생성되어 운동능력을 저하시킵니다. 따라서 술을 마신 후...',
            scrap:17,
            recommendation:34,
            comment:12
        },
        {
            user:'쿠킹러너',
            title:'과음한 다음날 \'러닝\'해도 괜찮을까요?',
            content:'알코올이 신체 내에 흡수되면 디하이드로제논과 같은 화학 물질이 생성되어 운동능력을 저하시킵니다. 따라서 술을 마신 후...',
            scrap:17,
            recommendation:34,
            comment:12
        },
        
    ]

    const navigate = useNavigate();

    const navigateToCompetitionDetail =() =>{
        navigate("/comp_detail")
    }

    const [post,setPost] = useState([
        
    ]);

    const FetchPostList = async () =>{
        const list = post_list;
        setPost(list);     
    }
    
    useEffect(() =>{
        FetchPostList();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>

            {/*상단제목*/}
            <Box sx={{width:'100%'}}>
                <Box sx={{width:'100%',pt:1,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px',ml:2}}>
                        이런 러닝 꿀팁은 어때요?
                    </Typography>
                </Box>
            </Box>

            {/*대회정보*/}
            <Box sx={{width:'100%',height:'190px',pt:1,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                {
                    post.map((item,index)=>{
                        return(
                            <Box sx={{width:'95%',height:'80px',backgroundColor:'#F6F6F6',borderRadius:3,mt:1,display:'flex',alignItems:'center'}}>
                                <Box sx={{width:'60px',height:'60px',backgroundColor:'#4F1D76',borderRadius:3,mx:1}}/>
                                <Box sx={{display:'flex',justifyContent:'start',alignItems:'start',width:`calc(100% - 76px)`,flexDirection:'column'}}>
                                    <Box sx={{width:'100%'}}>
                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px'}}>
                                            {item.title}
                                        </Typography>
                                    </Box>
                                    <Box sx={{width:'95%'}}>
                                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'8px',color:'#606060'}}>
                                            {item.content}
                                        </Typography>
                                    </Box>
                                    <Box sx={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:"center",mt:0.5}}>
                                        <Box sx={{display:'flex',height:'14px',alignItems:"center"}}>
                                            <Avatar sx={{width:'11px',height:'11px',mr:0.5}}/>
                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060'  ,height:'100%',lineHeight:'normal'}}>
                                                {item.user}
                                            </Typography>
                                        </Box>
                                        <Box sx={{mr:3, display:'flex'}}>
                                            <Box sx={{display:'flex',alignItems:'center',height:'14px'}}>
                                                <TurnedInNotIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                <Typography align ="center" sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',mr:1,height:'100%',lineHeight:'normal'}}>
                                                    {item.scrap}
                                                </Typography>
                                            </Box>
                                            <Box sx={{display:'flex',alignItems:'center',height:'14px'}}> 
                                                <RecommendOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',mr:1,height:'100%'}}>
                                                    {item.recommendation}
                                                </Typography>
                                            </Box>
                                            <Box sx={{display:'flex',alignItems:'center',height:'14px'}}>
                                                <ModeCommentOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',height:'100%'}}>
                                                    {item.comment}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>

            {/*더보기*/}
            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'95%',flexDirection:'column',mt:1}}>
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px',height:'40px',mt:1,width:'100%',border:1,color:'#E8E8E8'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#606060'}}>
                        다른 꿀팁보기
                    </Typography>
                </Box>
            </Box>
        </Box>    
    )
}