import {Box,Typography,Modal,Divider} from '@mui/material';
import Topbar from "../Component/Topbar"
import {useState,useEffect} from "react"
import Content from "../Component/Content_Post.js"
import {FetchMyPost,runningTalkBookMark} from "../../../../API/api/RunningTalk/runningTalk_api"
import ContentSkeleton from '../../../../component/shoes/wide_Skeleton.js';

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

  const loadinglist=[1,2,3,4,5,6,7,8,9,10]

export default function MyBookmarkPost(){

    const [loading,setLoading] = useState(true);
    const [savedPosts,setSavedPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [error,setError] = useState("");

    const session = window.localStorage.getItem('sessionid');

    const handleClose = () => setOpen(false);

    const FetchList = async () =>{
        const _savedPost = await FetchMyPost(session);

        if(_savedPost.response){
            setError(_savedPost.response.status)
            setOpen(true)
        }
        else{
            setSavedPosts(_savedPost);
        }
        setLoading(false);
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
                        내가 쓴 러너톡
                    </Typography>
                    
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
                            savedPosts?
                            savedPosts.map((post,index) => (
                                <Box key={post.id} sx={{width:"100%",position:"relative"}}>
                                    
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