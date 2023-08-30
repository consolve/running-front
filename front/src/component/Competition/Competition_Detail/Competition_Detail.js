import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Banner from "./Competition_Detail_Component/Competition_Detail_Banner"
import Title from "./Competition_Detail_Component/Competition_Detail_Title"
import TopBar from "./Competition_Detail_Component/Competition_Detail_TopBar"
import {Divider} from '@mui/material';
import Detail from "./Competition_Detail_Component/Competition_Detail_Detail"
import Course from "./Competition_Detail_Component/Competition_Detail_Course"
import Image from "./Competition_Detail_Component/Competition_Detail_Image"
import Navbar from './Competition_Detail_Component/Competition_Detail_Navbar';
import { fetchContestDetail } from '../../../API/api/Contest/contest_api';
import Skeleton from '@mui/material/Skeleton';
import { useParams } from "react-router-dom";
import {Modal} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



export default function Competition_Detail(){

    const { id } = useParams();

    const [loading,setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [contest,setContest] = useState({});

    const FetchContest = async () => {
        const _ContestDetail = await fetchContestDetail(id);

        console.log(_ContestDetail.mainBanner.mainBanner)

        if(_ContestDetail.response){
            setOpen(true);
        }
        else{
            setContest(_ContestDetail);
        }

        setLoading(false);
    }
    

    
    useEffect(()=>{
        console.log(id)
        setLoading(true);
        FetchContest();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%'}}>
            <TopBar/>
            {/* 60px은 navbar*/}
            <Box sx={{width:'100%',mt:'60px'}}>
                {
                    loading?
                    <Skeleton variant="rectangular" width={'100%'} height={"210px"} sx={{position:'relative',zIndex:-1}}/>
                    :
                    <Box sx={{width:"100%"}}>
                    {
                        !contest.response?
                        <Banner competition={contest}/>
                        :
                        <Box sx={{width:'100%',height:'210px',backgroundColor:'#4F1D76'}}/>
                    }
                    </Box>
                }
                <Box sx={{position:'relative',mt:'-30px',zIndex:1,backgroundColor:"#ffffff",borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>
                    {
                        loading? 
                        <Box sx={{width:"100%",height:"600px",mb:1}}>
                            <Skeleton variant="rectangular" width={'100%'} height={"100%"} sx={{mt:1,borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}/>
                        </Box>
                        :
                        <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                            {
                                !contest.response?
                                <Box sx={{width:"100%"}}>
                                    <Title competition = {contest}/>
                                    <Divider/>

                                    <Detail competition = {contest}/>
                                    <Divider/> 
                                
                                    <Course competition = {contest}/>
                                    <Divider/>

                                    <Image competition = {contest}/>
                                </Box>
                                :
                                <Box sx={{width:'100%',height:"500px",display:'flex',justifyContent:"center",alignItems:"center"}}>
                                    error
                                </Box>
                            }
                        </Box>   
                    }
                </Box>
            </Box>
            <Navbar/>
        </Box>    
    )
}