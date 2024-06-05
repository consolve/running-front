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
import Image from "./Crew_Detail_Component/Crew_Detail_Image"
import Navbar from './Crew_Detail_Component/Crew_Detail_Navbar';
import Skeleton from '@mui/material/Skeleton';
import { useParams } from "react-router-dom";
import {fetchCrewDetail} from "../../../API/api/RunningCrew/crew_api"
import axios from 'axios';
import { useRecoilState } from 'recoil';
import Comment from "./Crew_Detail_Component/Crew_Detail_Comment"
import {
    CrewDetail_Comment,
    CrewDetail_Comment_Order
} from "../../../state/Crew/CrewDetail_Comment_State";
import Error from '../../../component/Error/ErrorModal';
import { keyframes } from '@mui/material';


function Crew_Detail(){
    const spin = keyframes`
    0%{
        opacity: 0;
        transform: translateY(20px);
      }
      100%{
        opacity: 1;
        transform: translateY(0px);
      }
    `;

    const { id } = useParams();
    const session = localStorage.getItem('sessionid');

    const navigate = useNavigate();

    const navigateToBack  = () =>{
        navigate(-1);
    }

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const [open, setOpen] = React.useState(false);
    const [crew,setCrew] = useState({});
    const [comment,setComment] = useRecoilState(CrewDetail_Comment);
    const [commentOrder,setCommentOrder] = useRecoilState(CrewDetail_Comment_Order);
    

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack();
    };

    const Fetchcrew = async () => {
        const [_CrewDetail] = await axios.all([fetchCrewDetail(id,session)]);

        if(_CrewDetail.response){
            setError(_CrewDetail.response?_CrewDetail.response.status:"")
            setOpen(true);
        }
        else{
            setCrew(_CrewDetail);
        }

        setLoading(false);
    }
    
    useEffect(()=>{
        window.scrollTo({top:0})
        setLoading(true);
        Fetchcrew();


        // const session = window.localStorage.getItem("sessionid");
        // console.log(`Bearer `+`${session}`)

        // UpdatecrewView(session,id);
    },[])

    return(
        <Box sx={{backgroundColor:"primary.main"}}>
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',animation:`${spin} 0.2s ease`}}>
            
            <Box sx={{width:'100%'}}>
                {
                    loading&&comment?
                    <Box sx={{position:'fixed',width:'100%',width:"100%",backgroundColor:'primary.main',maxWidth:"450px",minWidth:"360px"}}>
                        <Skeleton variant="rectangular" width={'100%'} height={"300px"} sx={{position:'relative',zIndex:-1}}/>
                    </Box>
                    :
                    <Box sx={{width:"100%"}}>
                    {
                        crew!=0&&comment?
                        <Box sx={{width:"100%",height:"300px",position:"fixed",maxWidth:"450px",minWidth:"360px"}}>
                            <TopBar crew={crew}/>
                            <Banner crew={crew}/>
                        </Box>
                        :
                        <Box sx={{position:'fixed',width:'100%',height:'300px',backgroundColor:'primary.main'}}>
                        </Box>
                    }
                    </Box>
                }
                <Box sx={{position:'relative',display:"flex",flexDirection:"column",justifyContent:"start",alignItems:"center",mt:'-30px',zIndex:1,backgroundColor:"#ffffff",borderTopLeftRadius:'20px',borderTopRightRadius:'20px',pb:5,mt:"270px"}}>
                    {
                        loading? 
                        <Box sx={{width:"100%",height:"600px",mb:1}}>
                            <Skeleton variant="rectangular" width={'100%'} height={"100%"} sx={{borderTopLeftRadius:'20px',borderTopRightRadius:'20px',pb:11}}/>
                        </Box>
                        :
                        <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                            {
                                crew!=0&&comment?
                                <Box sx={{width:"100%"}}>
                                    <Title crew = {crew}/>

                                    <Divider sx={{border:2,color:"#F6F6F6",mx:"20px"}}/>

                                    <Detail crew = {crew}/>
                                    
                                    <Divider sx={{border:2,color:"#F6F6F6",my:'20px',mx:'20px'}}/>

                                    <Image crew = {crew}/>
                                    
                                    <Divider sx={{border:2,color:"#F6F6F6",my:'20px',mx:'20px'}}/>

                                    <Comment setError = {setError} setOpen={setOpen}/> 
                                    {/*<Navbar/> */}
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

            <Error error={error} open={open} handleClose={handleClose}/>
        </Box>  
    </Box>  
    )
}

export default Auth(Crew_Detail,null);