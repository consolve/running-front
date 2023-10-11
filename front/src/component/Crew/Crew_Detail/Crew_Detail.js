import {Box,Typography,Modal,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import Auth from "../../../hoc/auth"
import Banner from "./Crew_Detail_Component/Crew_Detail_Banner"
import Title from "./Crew_Detail_Component/Crew_Detail_Title"
import TopBar from "./Crew_Detail_Component/Crew_Detail_TopBar"
import {Divider} from '@mui/material';
import { useNavigate } from "react-router-dom";
import Detail from "./Crew_Detail_Component/Crew_Detail_Detail"
import Course from "./Crew_Detail_Component/Crew_Detail_Course"
import Image from "./Crew_Detail_Component/Crew_Detail_Image"
import Navbar from './Crew_Detail_Component/Crew_Detail_Navbar';
import {CompetitionSchedule_Comment} from "../../../state/Competition/CompetitionSchedule_State"
import Skeleton from '@mui/material/Skeleton';
import Comment from "./Crew_Detail_Component/Crew_Detail_Comment"
import { useParams } from "react-router-dom";
import { UpdateContestView,fetchContestDetail } from '../../../API/api/Contest/contest_api';
import {FetchContestComment} from "../../../API/api/Contest/contest_api"
import axios from 'axios';
import { useRecoilState } from 'recoil';

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



function Crew_Detail(){

    const { id } = useParams();

    const navigate = useNavigate();

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const [comment,setComment] = useRecoilState(CompetitionSchedule_Comment);
    const [open, setOpen] = React.useState(false);
    const [contest,setContest] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };

    const FetchContest = async () => {
        // const [_ContestDetail,_Comment] = await axios.all([fetchContestDetail(id),FetchContestComment(id)]);

        console.log(_ContestDetail);
        console.log(_Comment);
        console.log(_Comment.response.status)

        if(_ContestDetail.response||_Comment.response){
            setError(_ContestDetail.response?_ContestDetail.response.status:_Comment.response.status)
            setOpen(true);
        }
        else{
            setContest(_ContestDetail);
            setComment(_Comment);
        }

        setLoading(false);
    }
    
    useEffect(()=>{
        window.scrollTo({top:0})
        setLoading(true);
        FetchContest();


        const session = window.localStorage.getItem("sessionid");
        console.log(`Bearer `+`${session}`)

        UpdateContestView(session,id);
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%'}}>
            
            <Box sx={{width:'100%',mb:10}}>
                {
                    loading?
                    <Skeleton variant="rectangular" width={'100%'} height={"300px"} sx={{position:'relative',zIndex:-1}}/>
                    :
                    <Box sx={{width:"100%"}}>
                    {
                        contest&&comment.length!=0?
                        <Box sx={{width:"100%"}}>
                            <TopBar competition={contest}/>
                            <Banner competition={contest}/>
                        </Box>
                        :
                        <Box sx={{width:'100%',height:'300px',backgroundColor:'#4F1D76'}}>
                        </Box>
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
                                contest&&comment.length!=0?
                                <Box sx={{width:"100%"}}>
                                    <Title competition = {contest}/>
                                    <Divider/>

                                    <Detail competition = {contest}/>
                                    <Divider/> 
                                
                                    <Course competition = {contest}/>
                                    <Divider/>

                                    <Image competition = {contest}/>
                                    <Divider/>

                                    {/* <Comment/> */}
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

            <Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    disableScrollLock
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {error}
                    </Typography>
                    
                    </Box>
                </Modal>
            </Box>

            <Navbar/>
        </Box>    
    )
}

export default Auth(Crew_Detail,null);