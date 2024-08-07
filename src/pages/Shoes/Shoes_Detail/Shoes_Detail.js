import {Box,Typography} from '@mui/material';
import React, { useState } from "react";
import { useEffect } from 'react';
import Auth from "../../../hoc/auth"
import Banner from "./Shoes_Detail_Component/Shoes_Detail_Banner"
import Title from "./Shoes_Detail_Component/Shoes_Detail_Title"
import TopBar from "./Shoes_Detail_Component/Shoes_Detail_TopBar"
import {Divider} from '@mui/material';
import Recommend from "./Shoes_Detail_Component/Shoes_Detail_Recommend"
import Feature from "./Shoes_Detail_Component/Shoes_Detail_Feature"
import { fetchShoesDetail } from '../../../API/api/RunningShoes/shoes_api';
import Skeleton from '@mui/material/Skeleton';
import { useParams } from "react-router-dom";
import {
    ShoesDetail_Comment,
} from "../../../state/Shoes/ShoesMain_State";
import Comment from "./Shoes_Detail_Component/Shoes_Detail_Comment"
import { FetchRunningshoesCommentPopular } from '../../../API/api/RunningShoes/Shoes_comment_api';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import Error from "../../../component/Error/ErrorModal"
import { useLocation } from 'react-router-dom';


function Shoes_Detail(){

    const { id } = useParams();
    const session = localStorage.getItem("sessionid");
    const location = useLocation();


    const [loading,setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [error,setError] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [shoes,setShoes] = useState({});
    const [comment,setComment] = useRecoilState(ShoesDetail_Comment);
    

    const FetchShoes = async () => {
        const [_ShoesDetail,_Comment] = await axios.all([fetchShoesDetail(id,session),FetchRunningshoesCommentPopular(id,session)]);
        
        if(_ShoesDetail.response||_Comment.response){
            setError(_ShoesDetail.response?_ShoesDetail.response.status:_Comment.response.status)
            setOpen(true);
        }
        else{
            setComment(prev=>prev=_Comment);
            setShoes(_ShoesDetail);
        }

        setLoading(false);
    }
    
    useEffect(()=>{
        setLoading(true);
        FetchShoes();
    },[])

    return(
        <Box sx={{position:"absolute",zIndex:1001,maxWidth:"450px",minWidth:"360px",display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%'}}>
            <TopBar shoes={shoes}/>
            {/* 60px은 navbar*/}
            <Box sx={{width:'100%',mt:'60px',mb:10}}>
                {
                    loading?
                    <Box sx={{width:"100%",height:"720px"}}>
                        <Skeleton variant="rectangular" width={'100%'} height={"100%"} sx={{}}/>
                    </Box>
                    :
                    <Banner shoes={shoes}/>
                }
                <Box sx={{zIndex:1,backgroundColor:"#ffffff"}}>
                    {
                        loading? 
                        <Box sx={{width:"100%",height:"720px"}}>
                            <Skeleton variant="rectangular" width={'100%'} height={"100%"} sx={{}}/>
                        </Box>
                        :
                        <Box sx={{display:"flex",justifyContent:"center"}}>
                            {
                                shoes&&comment?
                                <Box sx={{width:"100%"}}>
                                    <Title setError = {setError} shoes = {shoes}/>

                                    <Divider sx={{border:2,color:"#F6F6F6",my:'21px',mx:'20px'}}/>

                                    <Recommend shoes = {shoes}/>

                                    <Divider sx={{border:2,color:"#F6F6F6",my:'21px',mx:'20px'}}/>

                                    <Feature shoes = {shoes}/>

                                    <Divider sx={{border:2,color:"#F6F6F6",my:'20px',mx:'20px'}}/>

                                    <Comment setError = {setError} setOpen={setOpen}/>
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
            {/* <Navbar/> */}

            <Error error={error} open={open} handleClose={handleClose}/>
        </Box>  
    )
}


export default Auth(Shoes_Detail,null);