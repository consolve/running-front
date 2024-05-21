import {Box,Typography,Button} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../style/fonts/pretendardvariable.css"
import { useNavigate } from "react-router-dom";
import Banner from "./Banner/Banner"
import Competition from "./Main_Competition/Competition"
import Shoes from "./Main_Shoes/Shoes"
import Community from "./Main_Community/Community"
import Crew from './Main_Crew/Crew'
import Auth from "../../hoc/auth"
import {Modal,Divider} from '@mui/material';
import TopBar from "./TopBar/TopBar"
import Error from "../../component/Error/ErrorModal"

function Main(){
            
    const number = localStorage.getItem('user_number');

    const [loading1,setLoading1] = useState(true);
    const [loading2,setLoading2] = useState(true);
    const [loading3,setLoading3] = useState(true);
    const [loading4,setLoading4] = useState(true);
    const [loadingall,setLoadingall] = useState(true);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        navigateToBack()
    };
    const [error,setError] = useState();

    const navigate = useNavigate();

    const navigateToBack  = () =>{
        navigate("/login/main");
    }


    const LoadingCompilation = () => {
        if(!loading1&&!loading2&&!loading3&&!loading4){
            setLoadingall(false);
        }
    }

    useEffect(() =>{
        setLoading1(true);
        setLoading2(true);
        setLoading3(true);
        setLoading4(true);
        setLoadingall(true);

        window.scrollTo({top:0})
    },[])

    useEffect(()=>{
        LoadingCompilation();
    },[loading1,loading2,loading3,loading4])


    return(
        <>
        <script>
            Larademo.postMessage("loadFCM");
        </script>
        <Box sx={{width:'100%',display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column'}}>
            <div id="FFEMAIL" style={{display:"none"}}> {number} </div>
            <Box sx={{display:'flex',flexDirection:'column',width:"100%",background: 'linear-gradient(to bottom, #6C57E5, rgba(255, 255, 255, 0.26))'}}>
                <TopBar/>
                <Banner/>
            </Box>
            <Box sx={{width:'100%',mb:8}}>
                <Divider sx={{border:2,color:"#F6F6F6",mx:"20px"}}/>
                <Competition setLoading1={setLoading1} loadingall={loadingall} setError={setError} setOpen={setOpen}/>
                <Divider sx={{border:2,color:"#F6F6F6",mx:"20px"}}/>
                <Shoes setLoading2={setLoading2} loadingall={loadingall} setError={setError} setOpen={setOpen}/>
                <Divider sx={{border:2,color:"#F6F6F6",mx:"20px"}}/>
                <Community setLoading4={setLoading4} loadingall={loadingall} setError={setError} setOpen={setOpen}/>
                <Divider sx={{border:2,color:"#F6F6F6",mx:"20px"}}/>
                <Crew setLoading3={setLoading3} loadingall={loadingall} setError={setError} setOpen={setOpen}/>

            </Box>


            <Error error={error} open={open} handleClose={handleClose}/>
        </Box>  
        </>  
    )
}

export default Auth(Main,null)