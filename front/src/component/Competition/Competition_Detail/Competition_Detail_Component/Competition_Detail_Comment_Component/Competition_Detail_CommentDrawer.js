import * as React from 'react';
import { useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import { useEffect,useState } from 'react';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import {Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {useRecoilState} from 'recoil'
import {
    CompetitionSchedule_Comment
} from "../../../../../state/Competition/CompetitionSchedule_State"
import {API_URL} from "../../../../../API/URL/index"
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

export default function TemporaryDrawer(props) {
    const useBodyScrollLock = () => {
        const lockScroll = useCallback(() => {
            document.body.style.overflow = 'hidden';
        }, []);

        const openScroll = useCallback(() => {
            document.body.style.removeProperty('overflow');
        }, []);

        return { lockScroll, openScroll };
    }
    
    const { lockScroll, openScroll } = useBodyScrollLock();

    const navigate = useNavigate();
    const DrawerTheme = {
        width:'100%',
        height:'100%',
        minWidth:'360px',
        maxWidth:'420px',
        borderTopLeftRadius:20,
        borderTopRightRadius:20, 
        backgroundColor:'#ffffff'
    }

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

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }
        if(open){
            console.log(open)
            lockScroll();
        } 
        else {
            openScroll();
        }
        props.setOpen(open);
    };

    const [comment,setComment] = useRecoilState(CompetitionSchedule_Comment);
    

    const navigateToFilter = (id) =>{
        navigate(`/runnertalk/category/${id}`)
    }

    useEffect(()=>{
        return(()=>{
            document.body.style.removeProperty('overflow');
        })
    },[])

    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center'}}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
        >
            <Box sx={DrawerTheme}>
                <Box sx={{}}>
                    <Box sx={{height:'80px',width:'100%',display:'flex',justifyContent:'start',alignItems:'center',position:'relative'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px',ml:2}}>
                            댓글
                        </Typography>
                    </Box>
                    <Divider/>

                    {/*날짜*/}
                    <Box sx={{width:"92%",height:'360px',mx:'auto',display:'flex',flexDirection:"column"}}>
                        <Box sx={{height:"100%",overflow:'scroll'}}>
                        {
                            comment.map((item,index) => {
                                return(
                                    <Box onClick={()=>navigateToFilter(item.id)} key = {index} sx={{display:'flex',alignItems:'center',width:'100%',mt:2.5}}>
                                        <Box sx={{height:'100%'}}>
                                            <Avatar src={`${API_URL}${item.user_profile}`} sx={{width:'20px',height:'20px',mr:1,mb:3}}/>
                                        </Box>
                                        <Box sx={{flex:1}}>
                                            <Box sx={{display:'flex'}}>
                                                <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px'}}>
                                                    {item.user}{" -"}
                                                </Typography>
                                                <Typography color="#959494" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px',ml:0.5}}>
                                                    {timeForToday(item.created)}
                                                </Typography>
                                            </Box>
                                            <Box sx={{width:"100%",my:0.5}}>
                                                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',height:'100%',color:'#000000'}}>
                                                    {item.comment}
                                                </Typography>
                                            </Box>
                                            <Box sx={{display:"flex"}}>
                                                <Box sx={{display:'flex',alignItems:'center',height:'14px'}}> 
                                                    <ThumbUpOffAltOutlinedIcon sx={{width:'16px',height:'16px',mr:0.3}}/>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',mr:1,height:'100%'}}>
                                                        {item.likePoint}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{display:'flex',alignItems:'center',height:'14px'}}>
                                                    <ModeCommentOutlinedIcon sx={{width:'16px',height:'16px',mr:0.3}}/>
                                                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',height:'100%'}}>
                                                        {item.commentPoint}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            
                                        </Box>
                                    </Box> 
                                )
                            })
                        }
                        </Box>
                    </Box>

                </Box>

            </Box>
        </Box>
    );
    

    return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:"center"}}
        
        >
            <React.Fragment>
            <Drawer
                disableScrollLock={ true }
                PaperProps={{
                    sx: {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    }
                }}
                anchor={'bottom'}
                open={props.open}
                onClose={toggleDrawer(false)}
            >   
                {list()}
            </Drawer>
            </React.Fragment>
        </Box>
    );
}
