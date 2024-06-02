import {Box,Typography,Fade,Popper,ClickAwayListener } from "@mui/material";
import React, { useState,useRef,useEffect } from "react";
import {API_URL} from '../../API/URL/index';
import Avatar from '@mui/material/Avatar';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import styled from "styled-components"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Like from "./component/Like"
import BlockModal from "./Modal/BlockModal"
import DeleteModal from "./Modal/DeleteModal"

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



export default function Comment({item,toggleChildCommentDrawer,LikeFunction,onClickComment,deleteCommentSet,deleteComment}){
    const [likePoint,setlikePoint] = useState(item.likePoint);
    const sessionid = localStorage.getItem('sessionid');
    const contentRef = useRef(null);
    const [isShowReadMore, setIsShowReadMore] = useState(false);
    const [modalOpen,setModalOpen] = useState(false);

    const [open,setOpen] = useState(false);
    const [opendelete,setOpendelete] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    };

    const onClick = (e) => {
        contentRef.current.classList.add("show");
        setIsShowReadMore(false);
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        if(item.comment.length > 200){
            setIsShowReadMore(true);
        }
    },[])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        handleOpen();
    };

    useEffect(()=>{
        return()=>{
            setOpen(false);
        }
    },[])

    return(
        <Box sx={{display:'flex',alignItems:'start',px:2,py:1.5}}>

            <BlockModal id={item.user} handleOpen={handleModalOpen} open={modalOpen}/>
            <DeleteModal 
                id={item.id} 
                handleOpen={handleModalOpen} 
                open={modalOpen} 
                deleteComment={deleteComment}
                deleteCommentSet={deleteCommentSet}
            />

            <Box sx={{height:'100%',display:'block',mt:0.5}}>
                <Avatar src={`${API_URL}${item.user_profile}`} sx={{width:'20px',height:'20px',mr:1}}/>
            </Box>

            <Box sx={{flex:1}}>
                <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Box sx={{display:"flex"}}>
                        <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px'}}>
                            {item.user_nickname}{" -"}
                        </Typography>
                        <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px',ml:0.5}}>
                            {timeForToday(item.created)}
                        </Typography>
                    </Box>

                    <MoreVertIcon onClick={handleClick} sx={{position:"relative",height:'20px',color:'#D9D9D9'}}/>

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

                                        <Box sx={{display:'flex',ml:2,mt:0.2,my:1}}>
                                            <Typography onClick={()=>{
                                                handleClose();
                                                handleModalOpen();
                                            }} sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:"primary.main",ml:1,lineHeight:'23px'}}>
                                                삭제하기
                                            </Typography>
                                        </Box>
                    
                                    </Box>
                                </Fade>
                                </>
                                )}
                            </Popper>
                        </ClickAwayListener>
                    }
                </Box>

                <Box sx={{width:"100%",mb:0.6}}>
                    <Ellipsis ref={contentRef}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#000000',whiteSpace:'normal',wordBreak:'break-all'}}>
                            {item.comment}
                        </Typography>
                    </Ellipsis>
                    <Box sx={{width:"90%",display:'flex',justifyContent:"start",alignItems:"center"}}>
                        {isShowReadMore && <Typography onClick={onClick} sx={{maxHeight:'17.9px',lineHeight:"25px",fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:'#A6A6A6'}}>...자세히 보기</Typography>}
                    </Box>
                </Box>
                <Box sx={{display:"flex",mt:1.5}}>
                    <Like handleLike={LikeFunction} item={item}/>
                    <Box onClick={()=>toggleChildCommentDrawer(true,item.id)} sx={{display:'flex',alignItems:'center',height:'14px',ml:'11px'}}>
                        <ModeCommentOutlinedIcon sx={{width:'16px',height:'16px',mr:0.3}}/>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',height:'100%'}}>
                            {item.commentPoint}
                        </Typography>
                    </Box>
                </Box>
                
            </Box>
        </Box> 
    )
}

const Ellipsis = styled.div`
  position: relative;
  display: -webkit-box;
  max-height: 80px;
  overflow: hidden;
  &.show {
    display: block;
    max-height: none;
    overflow: auto;
    -webkit-line-clamp: unset;
  }
`;
