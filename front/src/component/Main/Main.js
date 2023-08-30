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
import { fetchPopularContest } from '../../API/api/Contest/contest_api';
import { fetchPopularShoes } from '../../API/api/RunningShoes/shoes_api';
import {Modal} from '@mui/material';
import TopBar from "./TopBar/TopBar"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function Main(){
    const [loading1,setLoading1] = useState(true);
    const [loading2,setLoading2] = useState(true);
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
        navigate("/");
    }


    const LoadingCompilation = () => {
        if(!loading1&&!loading2){
            setLoadingall(false);
        }
    }

    useEffect(() =>{
        setLoading1(true);
        setLoading2(true);
        setLoadingall(true);
    },[])

    useEffect(()=>{
        LoadingCompilation();
    },[loading1,loading2])


    return(
        <Box sx={{width:'100%',display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column'}}>
            <Box sx={{display:'flex',flexDirection:'column',width:"100%",background: 'linear-gradient(to bottom, #4F1D76, rgba(255, 255, 255, 0.26))'}}>
                <TopBar/>
                <Banner/>
            </Box>
            <Box sx={{width:'98%',mb:10}}>
                <Competition setLoading1={setLoading1} loadingall={loadingall} setError={setError} setOpen={setOpen}/>
                <Shoes setLoading2={setLoading2} loadingall={loadingall} setError={setError} setOpen={setOpen}/>
                <Community/>
                <Crew/>
            </Box>

            <Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    disableScrollLock
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    </Box>
                </Modal>
            </Box>
        </Box>    
    )
}