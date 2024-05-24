import {Box,Typography,Avatar,Button} from '@mui/material';
import React, { useEffect, useState } from "react";
import { API_URL } from '../../../../API/URL';
import { fetchUserName } from '../../../../API/api/RunningShoes/shoes_api';
import ProfileChangeDrawer from "./Profile_ChangeImage_Drawer"
import DefaultProfile from '../../../../Image/user-circle.png';

export default function Profile(){
    const profile = window.localStorage.getItem('profile');
    const [userName, setUserName] = useState('');
    const [image,setImage] = useState("");
    const session = window.localStorage.getItem('sessionid');

    const [open,setOpen] = useState(false);

    const handleOpen = () =>{
        setOpen(prev=>prev=!prev);
    }

    const getUserName = async () =>{
        const response = await fetchUserName(session);
        setUserName(prev=>prev=response);
        return response;
    }

    useEffect(()=>{
        getUserName();
        setImage(profile);
    },[])

    return(
        <Box sx={{width:'100%',my:1}}>
            <Box sx={{px:'20px',display:'flex',alignItems:"center"}}>
                <Avatar alt="Profile" color="primary" src={image==="/media/None.png"?"":`${API_URL}${image}`} sx={{width:"96px",height:"96px"}}/>

                <Box sx={{ml:'17px'}}>
                    <Typography color="primary" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:"normal"}}>
                        {userName}{'님,'}
                    </Typography>
                    <Typography color="primary" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:"normal"}}>
                        {'오늘 러닝은 어떠셨나요?'}
                    </Typography>

                    <Box onClick={handleOpen} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'primary.main',width:'100%',height:'22px',borderRadius:'10px',boxShadow:0,mt:1}}>
                        <Typography sx={{color:"white",fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'10px'}}>
                            프로필 사진 변경
                        </Typography>
                    </Box> 

                </Box>
            </Box>

            <ProfileChangeDrawer open={open} handleOpen={handleOpen} setImage={setImage}/>
        </Box>
    )
}
