import * as React from 'react';
import { useCallback } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Typography,CircularProgress,Button,Modal } from '@mui/material';
import { useEffect,useState } from 'react';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import {Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {useRecoilState} from 'recoil';
import { useParams } from "react-router-dom";
import {
    ShoesDetail_Comment,
    ShoesDetail_Comment_Order
} from "../../../../../state/Shoes/ShoesMain_State"
import {FetchRunningshoesCommentLatest} from "../../../../../API/api/RunningShoes/Shoes_comment_api"
import { FetchRunningshoesCommentPopular,RunningshoesCommentLike } from '../../../../../API/api/RunningShoes/Shoes_comment_api';
import CommentAdder from "./Shoes_Detail_CommentDrawer_AddComment"
import ChildComment from "../Shoes_Detail_Comment_ChildComment/Shoes_Detail_Child_CommentDrawer"
import Comment from "../../../../../component/Comment/Comment"

export default function TemporaryDrawer(props) {

    const number = localStorage.getItem('number');
    const { id } = useParams();
    const session = localStorage.getItem('sessionid');

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [reportId,setReportId] = useState(0);
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

    const DrawerTheme = {
        width:'100%',
        height:'100%',
        minWidth:'360px',
        maxWidth:'450px',
        borderTopLeftRadius:20,
        borderTopRightRadius:20, 
        backgroundColor:'#ffffff',
        pb:'60px',

    }

    const toggleDrawer = (open) => (event) => {
        props.setOpen((prev)=>prev=open);
    };

    const toggleChildCommentDrawer = (open,id) => {
        setParentId(prev=>prev=id);
        setChildOpen((prev)=>prev=open);
    };

    const handleToggleOrder = (value) => {
        
        commentOrder.includes(value)?
        setCommentOrder((prev)=>prev=prev)
        :
        setCommentOrder((prev)=>prev=[value])
    };

    

    const [comment,setComment] = useRecoilState(ShoesDetail_Comment);
    const [commentOrder,setCommentOrder] = useRecoilState(ShoesDetail_Comment_Order);
    const [loading,setLoading] = useState(false);
    const [childOpen,setChildOpen] = useState(false);
    const [parentId,setParentId] = useState(1);

    const [clickedId,setClickedId] = useState(0);


    useEffect(()=>{
        return(()=>{
            document.body.style.removeProperty('overflow');
        })
        
    },[])

    const onClickReport = (id) => {
        setReportId(id);

        try{
            // eslint-disable-next-line
            Larademo.postMessage("reportComment");
        }
        catch(e){

        }
    }


    const FetchRunningshoesCommentLatestFunction = async () => {
        const _Comment = await FetchRunningshoesCommentLatest(id,session);
        

        if(_Comment.response){
            props.setError(_Comment.response.status)
            props.setOpen(true);
        }
        else{
            setComment(prev=>prev=_Comment);
        }

        setLoading(false);

    }

    const FetchRunningshoesCommentPopularFunction = async () => {
        const _Comment = await FetchRunningshoesCommentPopular(id,session);

        if(_Comment.response){
            props.setError(_Comment.response.status)
            props.setOpen(true);
        }
        else{
            setComment(prev=>prev=_Comment);
        }
        
        setLoading(false);
    }

    useEffect(()=>{
        setLoading(true);
        if(commentOrder.includes(0)){
            FetchRunningshoesCommentPopularFunction();
        }
        else if(commentOrder.includes(1)){
            FetchRunningshoesCommentLatestFunction();
        }

    },[commentOrder])

    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center'}}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
        >
            <div id="FFEMAIL" style={{display:"none"}}> {number} </div>
            <div id="reportShoesID" style={{display:"none"}}> {reportId} </div>

            <Box sx={DrawerTheme}>
                <Box sx={{}}>
                    <Box sx={{height:'100px',display:'flex',justifyContent:'center',alignItems:'start',position:'relative',flexDirection:'column',px:'20px'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px'}}>
                            댓글
                        </Typography>
                        <Box sx={{display:'flex',mt:1,ml:-0.5}}>
                            <Box onClick ={()=>handleToggleOrder(0)} backgroundColor={commentOrder.includes(0)?'primary.main':''}  sx={{width:"48px",height:'25px',border:1,borderRadius:'8px',display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                <Typography color = {commentOrder.includes(0)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px'}}>
                                    {"인기순"}
                                </Typography>
                            </Box>
                            <Box onClick ={()=>handleToggleOrder(1)} backgroundColor={commentOrder.includes(1)?'primary.main':''}  sx={{width:"48px",height:'25px',border:1,borderRadius:'8px',display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                <Typography color = {commentOrder.includes(1)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'13px'}}>
                                    {"최신순"}
                                </Typography>
                            </Box>       
                        </Box>
                    </Box>
                    <Divider/>

                    {/*날짜*/}
                    {
                        loading?
                        <Box sx={{width:"100%",height:'360px',mx:'auto',display:'flex',flexDirection:"column",justifyContent:"center",alignItems:'center'}}>
                            <CircularProgress color="primary" />
                        </Box>
                        :
                        <Box sx={{width:"100%",height:'360px',mx:'auto',display:'flex',flexDirection:"column"}}>
                            <Box sx={{height:"100%",overflow:'scroll'}}>
                            {
                                comment.map((item,index) => {
                                    return(
                                        <Comment onClickComment={()=>onClickReport(item.id)} key = {item.id} item={item} toggleChildCommentDrawer={toggleChildCommentDrawer} LikeFunction = {RunningshoesCommentLike}/> 
                                    )
                                })
                            }
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
                    <CommentAdder setError = {props.setError} setErrorOpen={props.setErrorOpen}/>
                </SwipeableDrawer>
                {
                    childOpen&&
                    <ChildComment onClickReport={onClickReport} setError = {props.setError} setErrorOpen={props.setErrorOpen} open={childOpen} setOpen={setChildOpen} id={parentId}/>
                }

            </React.Fragment>
        </Box>
    );
}
