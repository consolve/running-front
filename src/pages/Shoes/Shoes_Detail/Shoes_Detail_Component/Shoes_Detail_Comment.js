import * as React from 'react';
import { useCallback } from 'react';
import {API_URL} from "../../../../API/URL/index"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import { useEffect,useState } from 'react';
import { useRecoilState } from 'recoil';
import {ShoesDetail_Comment} from "../../../../state/Shoes/ShoesMain_State"
import Drawer from "./Shoes_Detail_Comment_Component/Shoes_Detail_CommentDrawer"


export default function Shoes_Detail_Comment(props) {

    const lockScroll = useCallback(() => {
        document.body.style.overflow = 'hidden';
    }, []);

    const myProfile = localStorage.getItem("profile");

    const [comment,setComment] = useRecoilState(ShoesDetail_Comment);
    const [open,setOpen] = useState(false);

    const openDrawer = () => {

        setOpen(true);
    }


    useEffect(()=>{
    },[])

    return (
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%',mt:2}}>
            <Box sx={{width:'90%',display:'flex',alignItems:'end'}}>
                <Typography color = "primary.main" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px'}}>
                    댓글
                </Typography>
                <Typography color = "#9D9D9D" sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',ml:0.5}}>
                    {comment.length}
                </Typography>
            </Box>

            <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',flexDirection:'column',px:'20px',width:'calc(100% - 40px)',mt:0.5}}>
                <Box onClick ={openDrawer} sx={{width:"100%",height:'50px',borderRadius:'5px',my:0.5,backgroundColor:'#F9F9F9'}}>
                    <Box sx={{alignItems:"center",display:'flex',justifyContent:"start",height:'100%'}}>
                        <Avatar src={comment.length ===0 ?`${API_URL}${myProfile}`:`${API_URL}${comment[0].user_profile}`} sx={{width:'20px',height:'20px',ml:1,mr:'12px'}}/>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'12px',whiteSpace:'pre-line',overflow:'hidden',textOverflow:'ellipsis',WebkitLineClamp:2,display:'-webkit-box',WebkitBoxOrient:'vertical',mr:'7px'}}>
                            {comment.length === 0 ? "": comment[0].comment}
                        </Typography>
                    </Box>
                </Box>
            </Box>  

            <Drawer open = {open} setOpen ={setOpen} setError={props.setError} setErrorOpen = {props.setOpen}/>

        </Box>
    );
}