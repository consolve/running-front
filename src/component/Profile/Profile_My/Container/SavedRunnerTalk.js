import {Box,Typography,Modal} from '@mui/material';
import Topbar from "../Component/Topbar"
import {useState,useEffect} from "react"
import Content from "../Component/Content_Post"
import ContentSkeleton from '../../../Competition/Competition_Content_Component/Competition_Content_Skeleton';
import { useNavigate } from 'react-router-dom';
import {FetchMySavedPost,runningTalkBookMark} from "../../../../API/api/RunningTalk/runningTalk_api"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { keyframes } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function MySavedPost(){
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const [savedPost,setSavedPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [error,setError] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const session = window.localStorage.getItem('sessionid');

    const handleClose = () => setOpen(false);

    const FetchList = async () =>{
        const _savedPost = await FetchMySavedPost(session);

        if(_savedPost.response){
            setError(_savedPost.response.status)
            setOpen(true)
        }
        else{
            setSavedPosts(_savedPost);
        }
        setLoading(false);
    }

    const bookmark = async (id) =>{
        const _savedPost = await runningTalkBookMark(id,session);

        if(_savedPost.response){

            return false;
        }
        else{
            return true;
        }
    }

    const onClickBookMark = (id) =>{
        if(bookmark(id)){
            setSavedPosts(prev=>prev=savedPost.filter(item=>item.id!==id));
        }
    }

    const handleVisible = () =>{
        setIsVisible(prev=>prev=!prev);
    }

    useEffect(() =>{
        setLoading(true);
        FetchList();
    },[])

    return(
        <Box sx={{width:"100%"}}>
            <Topbar/>
            <Box sx={{mt:"62px"}}>
                <Box sx={{display:'flex',justifyContent:"space-between",pt:"8px",alignItems:"end",px:"20px"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'25px',lineHeight:"29.83px"}}>
                        저장한 러너톡
                    </Typography>
                    <Typography onClick={handleVisible} color={isVisible?"primary":"#A6A6A6"} sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px',lineHeight:"19px"}}>
                        {isVisible?"완료":"편집"}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{mt:"25px"}}>
                {
                    loading?
                    <Box sx={{width:"100%"}}>
                        <ContentSkeleton/>
                        <ContentSkeleton/>
                        <ContentSkeleton/>
                        <ContentSkeleton/>
                        <ContentSkeleton/>
                        <ContentSkeleton/>
                        <ContentSkeleton/>
                        <ContentSkeleton/>
                    </Box>
                    :
                    <Box sx={{px:"20px"}}>
                        {
                            savedPost?
                            savedPost.map((post,index) =>(
                                <Box key={post.id} sx={{width:"100%",position:"relative"}}>
                                    {
                                        isVisible&&<RemoveCircleOutlineIcon onClick={()=>onClickBookMark(post.id)} color="primary" sx={{position:'absolute',left:-10,top:-10,zIndex:10}}/>
                                    }
                                    <Content key={post.id} item={post}/>
                                </Box>
                            ))
                            :
                            <Box>
                                error
                            </Box>
                        } 
                    </Box>
                }
            </Box>


            <Box>   
                <Modal
                    open={open}
                    onClose={handleClose}
                    disableScrollLock
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {error}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        
                    </Typography>
                    </Box>
                </Modal>
            </Box>
        </Box>  
    )
}