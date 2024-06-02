import {Box,Typography,Avatar,Fade,Popper,ClickAwayListener} from '@mui/material';
import React, { useState } from "react";
import { API_URL } from '../../API/URL';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import {useNavigate} from "react-router-dom"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BlockModal from "./Modal/BlockModal"
import Like from "./component/Like"
import DeleteModal from './Modal/DeleteModal';

function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}

export default function ChildComment({item,LikeFunction,onClickComment,deleteCommentSet,deleteComment}){
    const navigate = useNavigate();

    const [likePoint,setlikePoint] = useState(item.likePoint);
    const sessionid = localStorage.getItem('sessionid');
    const [open,setOpen] = useState(false);
    const [modalOpen,setModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        handleOpen();
    };

    return(
        <Box sx={{display:'flex',alignItems:'start',ml:'40px',my:1.5}}>

            <BlockModal id={item.user} handleOpen={handleModalOpen} open={modalOpen}/>
            <DeleteModal 
                id={item.id} 
                handleOpen={handleModalOpen} 
                open={modalOpen} 
                deleteComment={deleteComment}
                deleteCommentSet={deleteCommentSet}
            />

            <Box sx={{height:'100%',mt:0.5}}>
                <Avatar src={`${API_URL}${item.user_profile}`} sx={{width:'20px',height:'20px',mr:'12px',mb:4.5}}/>
            </Box>
            <Box sx={{flex:1}}>
                <Box sx={{display:'flex',justifyContent:"space-between"}}>
                    <Box sx={{display:"flex"}}>
                        <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px'}}>
                            {item.user_nickname}{" -"}
                        </Typography>
                        <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px',ml:0.5}}>
                            {timeForToday(item.created)}
                        </Typography>
                    </Box>

                    <MoreVertIcon onClick={handleClick} sx={{position:"relative",height:'20px',color:'#D9D9D9',mr:2}}/>

                    {
                        open&&
                        <ClickAwayListener onClickAway={handleClose}>
                            <Popper
                                open={open} 
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                transition
                                ransition placement={'bottom-end'} 
                                style={{zIndex:2000}}
                                >
                                {({ TransitionProps }) => (
                                <>
                                <Fade {...TransitionProps} timeout={350}>
                                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'start',justifyContent:"center",width:'180px',backgroundColor:'primary.light',borderRadius:'15px',border:1,borderColor:'primary.main',py:1,mt:1}}>
                                        
                                        {
                                            item.is_Owner?
                                            <Box sx={{display:'flex',ml:2,mt:0.2,my:1}}>
                                                <Typography onClick={()=>{
                                                    handleClose();
                                                    handleModalOpen();
                                                }} sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:"primary.main",ml:1,lineHeight:'23px'}}>
                                                    삭제하기
                                                </Typography>
                                            </Box>
                                            :
                                            <>
                                            <Box sx={{display:'flex',ml:2,my:1}}>
                                                <Typography onClick={onClickComment} sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:"primary.main",ml:1,lineHeight:'25px'}}>
                                                    신고하기 
                                                </Typography>
                                            </Box>
                                            <Box sx={{display:'flex',ml:2,mt:0.2,my:1}}>
                                                <Typography onClick={()=>{
                                                    handleClose();
                                                    handleModalOpen();
                                                }} sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:"primary.main",ml:1,lineHeight:'23px'}}>
                                                    차단하기
                                                </Typography>
                                            </Box>
                                            </>
                                        }
                                            
                                    </Box>
                                </Fade>
                                </>
                                )}
                            </Popper>
                        </ClickAwayListener>
                    }
                </Box>
                <Box sx={{width:"100%",mb:0.6,mr:'11px'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#000000',whiteSpace:'normal',wordBreak:'break-all'}}>
                        {item.comment}
                    </Typography>
                </Box>
                <Box sx={{display:"flex",mt:1}}>
                    <Like handleLike={LikeFunction} item={item}/>
                </Box>
                
            </Box>
        </Box> 
    )
}