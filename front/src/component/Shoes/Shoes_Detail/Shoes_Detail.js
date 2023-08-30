import {Box,Typography} from '@mui/material';
import React, { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Banner from "./Shoes_Detail_Component/Shoes_Detail_Banner"
import Title from "./Shoes_Detail_Component/Shoes_Detail_Title"
import TopBar from "./Shoes_Detail_Component/Shoes_Detail_TopBar"
import {Divider} from '@mui/material';
import Recommend from "./Shoes_Detail_Component/Shoes_Detail_Recommend"
import Feature from "./Shoes_Detail_Component/Shoes_Detail_Feature"
import Navbar from './Shoes_Detail_Component/Shoes_Detail_Navbar';
import { fetchShoesDetail } from '../../../API/api/RunningShoes/shoes_api';
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



export default function Shoes_Detail(){
    const { id } = useParams();

    const [loading,setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [shoes,setShoes] = useState({});

    const FetchShoes = async () => {
        const _ShoesDetail = await fetchShoesDetail(id);
        console.log(_ShoesDetail)
        
        if(_ShoesDetail.response){
            setOpen(true);
        }
        else{
            setShoes(_ShoesDetail);
        }

        setLoading(false);
    }
    
    useEffect(()=>{
        console.log(id)
        window.scrollTo({top:0})
        setLoading(true);
        FetchShoes();
    },[])

    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%'}}>
            <TopBar shoes={shoes}/>
            {/* 60px은 navbar*/}
            <Box sx={{width:'100%',mt:'60px'}}>
                <Banner shoes={shoes}/>
                <Box sx={{position:'relative',mt:'-30px',zIndex:1,backgroundColor:"#ffffff",borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>
                    {
                        loading? 
                        <Box sx={{width:"100%",height:"720px"}}>
                            <Skeleton variant="rectangular" width={'100%'} height={"100%"} sx={{mt:1,borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}/>
                        </Box>
                        :
                        <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                            {
                                !shoes.response?
                                <Box sx={{width:"100%"}}>
                                    <Title shoes = {shoes}/>
                                    <Divider/>

                                    <Recommend shoes = {shoes}/>
                                    <Divider/> 

                                    <Feature shoes = {shoes}/>
                                    <Divider/>
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