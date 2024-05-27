import * as React from 'react';
import { useCallback } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Typography,CircularProgress,IconButton,Button,Modal} from '@mui/material';
import { useEffect,useState } from 'react';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import {Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import { useParams } from "react-router-dom";
import { FetchRunningshoesCommentReplies,RunningshoesCommentLike } from '../../../../../API/api/RunningShoes/Shoes_comment_api';
import CommentAdder from "./Shoes_Detail_Child_CommentDrawer_AddComment"
import Comment from "../../../../../component/Comment/Comment_Child"
import Parent from "../../../../../component/Comment/Comment_Parent"

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

    const navigateToBack = ()=>{
        navigate(-1);
    }

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

    const toggleDrawer = (open) => (event) => {
        props.setOpen((prev)=>prev=open);
    };

    

    const [comment,setComment] =useState([]);
    const [loading,setLoading] = useState(false);
    const [mainComment,setMainComment] = useState([]);
    const [height,setHeight] = useState(null);
    const [clickedId,setClickedId] = useState(0);


    useEffect(()=>{
        return(()=>{
            document.body.style.removeProperty('overflow');
        })
        
    },[])

    const FetchRunningshoesCommentRepliesFunction = async () => {
        const _Comment = await FetchRunningshoesCommentReplies(props.id,session);

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
        FetchRunningshoesCommentRepliesFunction();
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

                            <Parent setHeight={setHeight} mainComment={mainComment} LikeFunction={RunningshoesCommentLike}/>

                            <Box sx={{display:'flex',flexDirection:'column'}}>
                                
                                <CommentAdder setError = {props.setError} setErrorOpen={props.setErrorOpen} id={props.id} setComment={setComment}/> 

                                <Box sx={{width:"100%",display:'flex'}}>
                                    {/*대댓글*/}
                                    <Box sx={{width:"100%",overflow:'scroll'}}>
                                    {
                                        comment.map((item,index) => {
                                            return(
                                                <Comment onClickComment={props.onClickReport} key = {item.id} item={item} LikeFunction={RunningshoesCommentLike}/>
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
