import React from 'react';
import { Box,Divider } from '@mui/material';
import Topbar from "./Component/Topbar"
import Profile from "./Component/Profile"
import MyRunningLife from './Component/My';
import Setting from './Component/Setting';
import Information from './Component/Information';
import ETC from './Component/ETC';


export default function ProfileContainer(){
    return(
        <Box sx={{width:'100%'}}>
            <Topbar/>
            <Box sx={{mt:"62px"}}>
                <Profile/>
                <Divider sx={{color:"#F6F6F6",border:8}}/>

                <MyRunningLife/>
                <Divider sx={{color:"#F6F6F6",border:8}}/>

                <Setting/>
                <Divider sx={{color:"#F6F6F6",border:8}}/>

                <Information/>
                <Divider sx={{color:"#F6F6F6",border:8}}/>

                <ETC/>
            </Box>

        </Box>
    )
}