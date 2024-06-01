import {Box,Typography,Paper} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import {ReactComponent as SearchIcon} from '../../../../Image/search.svg';
import WestIcon from '@mui/icons-material/West';
import TopbarTheme from '../../../../style/plate/topbar';

export default function Crew_TopBar(props){

    const [value,setValuse] = useState("");
    const navigate = useNavigate();

    
    const navigateToBack  = () =>{
        navigate(-1);
    }

    const navigateToCrewMain = () =>{
        navigate('/runnertalk')
    }
    
    const navigateToShoesSearch = () =>{
        let payload = {
            "content":value
        }


        var payloadString = Object.entries(payload).map(e => e.join('=')).join('&');
        navigate("/runnertalk/search?"+payloadString)
    }

    const FetchValueTextfield = () =>{ 
        setValuse((prev)=>prev = value);
    }

    const handleOnKeyPress = e=>{
        if(e.key === 'Enter'){
            e.preventDefault();
            navigateToShoesSearch();
        }
    }

    useEffect(() =>{
        FetchValueTextfield();
    },[])

    return(
        <Box sx={TopbarTheme}>
            <Box sx={{mx:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',height:"100%",borderBottom:'3px solid',borderBottomColor:'#F6F6F6',}}>
                <Box onClick = {navigateToCrewMain} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <IconButton type="button" sx={{ }} aria-label="search">
                        <WestIcon sx={{}}/>
                    </IconButton>
                </Box>

                <Box
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:'90%',backgroundColor:'#f4f4f4',borderRadius:'10px' }}
                    >
                    <InputBase
                        onKeyDown={handleOnKeyPress}
                        onChange={(e) => setValuse((prev)=>prev=e.target.value)}
                        value = {value}
                        sx={{ ml: 1, flex: 1,fontFamily: 'Pretendard Variable',fontWeight:500 }}
                    
                    />
                    <IconButton onClick = {navigateToShoesSearch} type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon width={21} height={21}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>    
    )
}