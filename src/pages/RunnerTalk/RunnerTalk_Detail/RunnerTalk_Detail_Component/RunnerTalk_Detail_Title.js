import {Box,Typography,Button,Card} from '@mui/material';
import React, { useEffect, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import {Backdrop} from '@mui/material';
import Delete from "./RunnerTalk_Detail_Delete"

export default function RunnerTalk_Detail_Detail(props){

    const navigate = useNavigate();
    const session = window.localStorage.getItem("sessionid");
    const number = localStorage.getItem('user_number');

    const [open,setOpen] = useState(false);
    const [opendelete,setOpendelete] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    const navigateToCategory = (name) =>{
        const id = props.category.filter((item)=>item.name === name)[0].id;

        navigate(`/runnertalk/category/${id}`)
    }

    const handleOpen = () => {
        {
            open ? setOpen((prev) => prev = false) : setOpen((prev) => prev = true)
        }
    };

    const handleDeleteOpen = () => {
        {
            opendelete ? setOpendelete((prev) => prev = false) : setOpendelete((prev) => prev = true)
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        handleOpen();
    };

    const navigateToRunnerTalkWrite = () =>{
        navigate('/runnertalk/write')
    }

    const onClickReport = (id) => {

        try{
            // eslint-disable-next-line
            Larademo.postMessage("reportArticle");
        }
        catch(e){

        }
    }



    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',backgroundColor:'#ffffff',borderTopLeftRadius:'20px',borderTopRightRadius:'20px'}}>
            
            <div id="FFEMAIL" style={{display:"none"}}> {number} </div>
            <div id="reportPostId" style={{display:"none"}}> {props.detail.id} </div>

            <Backdrop
            sx={{ backgroundColor:"transparent", zIndex:1001 }}
            open={open}
            onClick={handleClick}
            >
            </Backdrop>

            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'90%'}}>
                
                <Typography onClick={()=>navigateToCategory(props.detail.category)} color = {"primary"} sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'12px'}}>
                    {props.detail.category}{" >"}
                </Typography>

                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'20px',mt:0.5}}>
                    <MoreVertIcon aria-describedby={id} onClick={handleClick} sx={{position:"relative",height:'20px',color:'#D9D9D9'}}/>
                    
                    <Popper id={id} open={open} anchorEl={anchorEl} transition placement={'bottom-end'} style={{zIndex:1002}}>
                        {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Box sx={{display:'flex',flexDirection:'column',alignItems:'start',justifyContent:"center",width:'180px',backgroundColor:'primary.light',borderRadius:'15px',border:1,borderColor:'primary.main',zIndex:1002}}>

                                <Box onClick={navigateToRunnerTalkWrite} sx={{display:'flex',ml:2,my:1}}>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:"primary.main",ml:1,lineHeight:'25px'}}>
                                        수정하기
                                    </Typography>
                                </Box>

                                <Box onClick={onClickReport} sx={{display:'flex',ml:2,my:0.5}}>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:"primary.main",ml:1,lineHeight:'25px'}}>
                                        신고하기
                                    </Typography>
                                </Box>  

                                <Box onClick={handleDeleteOpen} sx={{display:'flex',ml:2,mt:0.2,my:1}}>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:"primary.main",ml:1,lineHeight:'23px'}}>
                                        삭제
                                    </Typography>
                                </Box>
                            </Box>
                        </Fade>
                        )}
                    </Popper>

                </Typography>
            </Box>

            
            <Delete id={props.detail.id} sessionid={session} open={opendelete} handleOpen={handleDeleteOpen} setError={props.setError} setOpen={props.setOpen}/>
        </Box>    
    )
}