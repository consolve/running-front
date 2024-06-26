import * as React from 'react';
import { useCallback } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Typography,CircularProgress,IconButton,Button,Modal} from '@mui/material';
import { useEffect,useState } from 'react';
import Divider from '@mui/material/Divider';
import { deleteComment } from '../../../../../API/api/RunningTalk/runningTalk_comment_api';
import { useNavigate } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import { useParams } from "react-router-dom";
import { FetchRunningTalkCommentReplies,RunningTalkCommentLike } from '../../../../../API/api/RunningTalk/runningTalk_comment_api';
import CommentAdder from "./RunningTalk_Detail_Child_CommentDrawer_AddComment"
import Comment from '../../../../../component/Comment/Comment_Child';
import Parent from '../../../../../component/Comment/Comment_Parent';

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

    const DrawerTheme = {
        width:'100%',
        height:'100%',
        minWidth:'360px',
        maxWidth:'450px',
        borderTopLeftRadius:20,
        borderTopRightRadius:20, 
        backgroundColor:'#ffffff',
    }

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

    const toggleDrawer = (open) => (event) => {
        props.setOpen((prev)=>prev=open);
    };

    

    const [comment,setComment] =useState([]);
    const [loading,setLoading] = useState(false);
    const [mainComment,setMainComment] = useState([]);

    const [clickedId,setClickedId] = useState(0);

    const [height,setHeight] = useState(null);

    useEffect(()=>{
        return(()=>{
            document.body.style.removeProperty('overflow');
        })
        
    },[])

    const FetchRunningTalkCommentRepliesFunction = async () => {
        const _Comment = await FetchRunningTalkCommentReplies(props.id,session);

        if(_Comment.response){
            props.setError(_Comment.response.status)
            props.setErrorOpen(true);
        }
        else{
            setComment(prev=>prev=_Comment.comments);
            setMainComment(prev=>prev=_Comment.main_comment[0]);
        }

        setLoading(false);

    }

    useEffect(()=>{
        setLoading(true);
        FetchRunningTalkCommentRepliesFunction();
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
                        <Box sx={{width:"100%",height:'460px',mx:'auto',display:'flex',flexDirection:"column",overflow:"scroll"}}>
                            {/*댓글*/}
                            <Parent setHeight={setHeight} mainComment={mainComment} LikeFunction={RunningTalkCommentLike}/>

                            <Box sx={{display:'flex',flexDirection:'column'}}>
                                
                                <CommentAdder setError = {props.setError} setErrorOpen={props.setErrorOpen} id={props.id} setComment={setComment}/> 

                                <Box sx={{width:"100%",display:'flex'}}>
                                    {/*대댓글*/}
                                    <Box sx={{width:"100%",overflow:'scroll'}}>
                                    {
                                        comment.map((item,index) => {
                                            return(
                                                <>
                                                    <Comment 
                                                        onClickComment={() => props.onClickReport(item.id)} 
                                                        key = {item.id} 
                                                        item={item} 
                                                        LikeFunction={RunningTalkCommentLike}
                                                        deleteComment={deleteComment}
                                                        deleteCommentSet={{
                                                            comment,
                                                            setComment,
                                                            index
                                                        }}
                                                    />
                                                </>
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
            <SwipeableDrawer
                onOpen={()=>{}}
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
            </SwipeableDrawer>

            </React.Fragment>
        </Box>
    );
}
