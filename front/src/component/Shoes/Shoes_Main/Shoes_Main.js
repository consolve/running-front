import {Box,Typography,Button,Card} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import TopBar from "./Shoes_Main_Component/Shoes_Main_TopBar";
import ShoesHot from "./Shoes_Main_Component/Shoes_Main_Hot";
import ShoesBrand from "./Shoes_Main_Component/Shoes_Main_Brand";
import ShoesFeature from "./Shoes_Main_Component/Shoes_Main_Feature"
import Filter from "./Shoes_Main_Component/Shoes_Main_Filter"
import {useRecoilState} from 'recoil'
import {
    ShoesMain_PopularLoading,
    ShoesMain_BrandLoading,
    ShoesMain_FeatureLoading,
    ShoesMain_Error,
    ShoesMain_AllLoading,
} from '../../../state/Shoes/ShoesMain_State';

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


export default function Shoes_Main(){

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [loading1,setLoading1] = useRecoilState(ShoesMain_PopularLoading);
    const [loading2,setLoading2] = useRecoilState(ShoesMain_BrandLoading);
    const [loading3,setLoading3] = useRecoilState(ShoesMain_FeatureLoading);
    const [error,setError] = useRecoilState(ShoesMain_Error);
    const [loadingall,setLoadingall] = useRecoilState(ShoesMain_AllLoading);

    const LoadingCompilation = () => {
        if(!loading1&&!loading2&&!loading3){
            setLoadingall(false);
        }
    }

    useEffect(() =>{  
        setLoading1(true);
        setLoading2(true);
        setLoading3(true)
        setLoadingall(true);
    },[])

    useEffect(()=>{
        LoadingCompilation();
    },[loading1,loading2,loading3])

    return(
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column',width:'100%'}}>
            <TopBar/>
            <Filter/>
            <Box sx={{width:'95%',mt:'60px'}}>
                <ShoesHot/>
                <ShoesBrand setOpen = {handleOpen} setClose = {handleClose} setError = {setError}/>
                <ShoesFeature/>
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
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    </Box>
                </Modal>
            </Box>
        </Box>    
    )
}