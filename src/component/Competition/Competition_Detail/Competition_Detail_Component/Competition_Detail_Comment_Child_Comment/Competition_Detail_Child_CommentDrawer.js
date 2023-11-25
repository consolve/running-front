import * as React from 'react';
import { useCallback,useRef } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography,CircularProgress,IconButton,Modal,Button} from '@mui/material';
import { useEffect,useState } from 'react';
import Divider from '@mui/material/Divider';
import {Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import { useParams } from "react-router-dom";
import {API_URL} from "../../../../../API/URL/index"
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { FetchContestCommentReplies,ContestCommentLike } from '../../../../../API/api/Contest/contest_comment_api';
import CommentAdder from "./Competition_Detail_Child_CommentDrawer_AddComment"
import Comment from "../../../../Comment/Comment_Child"
import Parent from "../../../../Comment/Comment_Parent"

export default function TemporaryDrawer(props) {

    const { id } = useParams();
    const session = localStorage.getItem('sessionid');

    const [open, setOpen] = React.useState(false);
    const handleOpen = (id=0) => {
        setClickedId(id);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
    };

    const navigateToBack = ()=>{
        navigate(-1);
    }

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
        maxWidth:'450px',
        borderTopLeftRadius:20,
        borderTopRightRadius:20, 
        backgroundColor:'#ffffff',
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '320px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
      };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        
        props.setOpen((prev)=>prev=open);
    };

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

    const [comment,setComment] =useState([]);
    const [loading,setLoading] = useState(false);
    const [mainComment,setMainComment] = useState([]);
    
    const [clickedId,setClickedId] = useState(0);

    const useGettingHeight = () => {
        const [height, setHeight] = useState(null);

        const ref = useCallback((node) => {
          if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
          }
        }, []);
      
        return [height, ref];
    };

    const [totalHeight,ref] = useGettingHeight();

    const FetchContestCommentRepliesFunction = async () => {
        const _Comment = await FetchContestCommentReplies(props.id,session);

        if(_Comment.response){
            props.setError(_Comment.response.status)
            props.setErrorOpen(true);
        }
        else{
            setComment(prev=>prev=_Comment.comments);
            setMainComment(prev=>prev=_Comment.main_comment[0]);
        }

        console.log(mainComment)
        console.log(comment)

        setLoading(false);

    }

    useEffect(()=>{
        setLoading(true);
        FetchContestCommentRepliesFunction();
    },[props.id]);

    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center',height:"100%"}}
        role="presentation"
        >
            <Box sx={DrawerTheme}>
                <Box sx={{display:"flex",flexDirection:"column",width:'100%'}}>
                    <Box sx={{display:"flex",height:'60px'}}>
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <IconButton onClick = {toggleDrawer(false)} type="button" sx={{color:'black',ml:'14px' }} aria-label="search">
                                <WestIcon sx={{}}/>
                            </IconButton>
                        </Box>
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',position:'relative',flexDirection:'column',px:'6px'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px'}}>
                                {"답글"}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider/>

                    {/*날짜*/}
                    {
                        loading?
                        <Box sx={{width:"100%",height:'460px',mx:'auto',display:'flex',flexDirection:"column",justifyContent:"center",alignItems:'center'}}>
                            <CircularProgress color="primary" />
                        </Box>
                        :
                        <Box sx={{width:"100%",height:'460px',mx:'auto',display:'flex',flexDirection:"column"}}>
                            {/*댓글*/}
                            <Parent ref={ref} mainComment={mainComment} LikeFunction={ContestCommentLike}/>

                            <Box sx={{display:'flex',flexDirection:'column'}}>
                                
                                <CommentAdder setError = {props.setError} setErrorOpen={props.setErrorOpen} id={props.id} setComment={setComment}/> 

                                <Box sx={{width:"100%",display:'flex'}}>
                                    {/*대댓글*/}
                                    <Box sx={{width:"100%",height:`calc(409px - ${totalHeight}px )`,overflow:'scroll'}}>
                                    {
                                        comment.map((item,index) => {
                                            return(
                                                <Comment key = {index} item={item} LikeFunction={ContestCommentLike}/>
                                            )
                                        })
                                    }
                                    </Box>
                                </Box>
                            </Box>
                            
                        </Box>
                    }

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
