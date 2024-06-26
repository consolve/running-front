import * as React from 'react';
import { useCallback } from 'react';
import {deleteComment} from "../../../../API/api/RunningTalk/runningTalk_comment_api"
import {Typography,CircularProgress,Divider,Button,Modal} from '@mui/material';
import { Box } from '@mui/system';
import { useParams } from "react-router-dom";
import { useEffect,useState } from 'react';
import { useRecoilState } from 'recoil';
import ChildComment from './RunningTalk_Detail_Comment_ChildComment/RunningTalk_Detail_Child_CommentDrawer';
import {
    FetchRunningTalkCommentLatest,
    FetchRunningtalkCommentPopular,
    RunningTalkCommentLike
} from "../../../../API/api/RunningTalk/runningTalk_comment_api"
import {
    RunnerTalkDetail_Comment,
    RunnerTalkDetail_Comment_Order
} from "../../../../state/RunnerTalk/RunnerTalk_Comment_State"
import Comment from "../../../../component/Comment/Comment"


export default function RunningTalk_Detail_Comment(props) {

    const { id } = useParams();
    const session = localStorage.getItem('sessionid');
    const number = localStorage.getItem('user_number');

    const [Modalopen, setModalOpen] = React.useState(false);
    const handleOpen = (id=0) => {
        setClickedId(id);
        setModalOpen(true);
    }
    const handleClose = () => {
        setModalOpen(false)
    };

    const DrawerTheme = {
        width:'100%',
        minWidth:'360px',
        maxWidth:'450px',
        borderTopLeftRadius:20,
        borderTopRightRadius:20, 
        backgroundColor:'#ffffff',
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        
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

    
    const [comment,setComment] = useRecoilState(RunnerTalkDetail_Comment);
    const [commentOrder,setCommentOrder] = useRecoilState(RunnerTalkDetail_Comment_Order);
    const [loading,setLoading] = useState(false);
    const [childOpen,setChildOpen] = useState(false);
    const [parentId,setParentId] = useState(1);
    const [reportId,setReportId] = useState(0);

    const [clickedId,setClickedId] = useState(0);


    useEffect(()=>{
        return(()=>{
            document.body.style.removeProperty('overflow');
        })
        
    },[])

    const FetchRunningTalkCommentLatestFunction = async () => {
        const _Comment = await FetchRunningTalkCommentLatest(id,session);
        

        if(_Comment.response){
            props.setError(_Comment.response.status)
            props.setOpen(true);
        }
        else{
            setComment(prev=>prev=_Comment);
        }

        setLoading(false);

    }

    const onClickReport = (id) => {
        setReportId(id);

        try{
            // eslint-disable-next-line
            Larademo.postMessage("reportComment");
        }
        catch(e){

        }
    }


    const FetchRunningTalkCommentPopularFunction = async () => {
        const _Comment = await FetchRunningtalkCommentPopular(id,session);

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
            FetchRunningTalkCommentPopularFunction();
        }
        else if(commentOrder.includes(1)){
            FetchRunningTalkCommentLatestFunction();
        }

    },[commentOrder])

    useEffect(()=>{
        setLoading(true);

        if(commentOrder.includes(0)){
            FetchRunningTalkCommentPopularFunction();
        }
        else if(commentOrder.includes(1)){
            FetchRunningTalkCommentLatestFunction();
        }

    },[childOpen])

    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center',width:"100%"}}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
        >
            <div id="FFEMAIL" style={{display:"none"}}> {number} </div>
            <div id="reportRunningTalkID" style={{display:"none"}}> {reportId} </div>

            <Box sx={DrawerTheme}>
                <Box sx={{}}>
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'start',position:'relative',flexDirection:'column',px:'20px',pb:'10px'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px'}}>
                            댓글
                        </Typography>
                        <Box sx={{display:'flex',mt:2,ml:-0.5}}>
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

                    <Divider sx={{border:2,color:"#F6F6F6"}}/>

                    {/*날짜*/}
                    {
                        loading?
                        <Box sx={{width:"100%",mx:'auto',display:'flex',flexDirection:"column",justifyContent:"center",alignItems:'center'}}>
                            <CircularProgress color="primary" />
                        </Box>
                        :
                        <Box sx={{width:"100%",mx:'auto',display:'flex',flexDirection:"column"}}>
                            <Box sx={{height:"100%",overflow:'scroll'}}>
                            {
                                comment.map((item,index) => {
                                    return(
                                        <>
                                            <Comment 
                                                onClickComment={() => onClickReport(item.id)} 
                                                key = {item.id} 
                                                item={item} 
                                                toggleChildCommentDrawer={toggleChildCommentDrawer} 
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
                    }

                </Box>

            </Box>
        </Box>
    );
   

    const lockScroll = useCallback(() => {
        document.body.style.overflow = 'hidden';
    }, []);

    // const [comment,setComment] = useRecoilState(CompetitionSchedule_Comment);
    const [open,setOpen] = useState(false);

    const openDrawer = () => {

        setOpen(true);
    }


    useEffect(()=>{
    },[])

    return (
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',width:'100%'}}>

            {list()}
            
            {
                childOpen&&
                <ChildComment onClickReport={onClickReport} setError = {props.setError} setErrorOpen={props.setErrorOpen} open={childOpen} setOpen={setChildOpen} id={parentId}/>
            }
        </Box>
    );
}