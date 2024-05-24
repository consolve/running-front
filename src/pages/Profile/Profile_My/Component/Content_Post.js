import {Box,Typography,Avatar,Divider} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../API/URL';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';   
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

export default function Post({item}){
    const navigate = useNavigate();

    const navigateToPostDetail = (id) =>{
        navigate(`/runnertalk/detail/${id}`)
    }

    return(
        <Box onClick ={()=>navigateToPostDetail(item.id)} sx={{display:'flex',alignItems:'center',height:'100px',width:'100%',borderBottom:1,borderColor:'rgba(237, 237, 237, 1)'}}>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:`calc(100% - 81px)`,flexDirection:'column'  }}>
                <Box sx={{width:'100%'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px'}}>
                        {item.title}
                    </Typography>
                </Box>
                <Box sx={{width:'100%'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px',color:'#000000',whiteSpace:'pre-line',overflow:'hidden',textOverflow:'ellipsis',WebkitLineClamp:1,display:'-webkit-box',WebkitBoxOrient:'vertical'}}>
                        {item.content}
                    </Typography>
                </Box>
                <Box sx={{width:'100%',display:'flex',justifyContent:'start',alignItems:"center"}}>
                    <Box sx={{display:'flex',height:'14px',alignItems:"center",mr:0.5}}>
                        <Avatar sx={{width:'11px',height:'11px',mr:0.5}}/>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060'  ,height:'100%',lineHeight:'normal'}}>
                            {item.user}
                        </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem variant="middle"  sx={{height:"10px"}}/>
                    <Box sx={{ml:0.5, display:'flex'}}>
                        <Box sx={{display:'flex',alignItems:'center',height:'14px'}}> 
                            <ThumbUpOffAltOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',mr:1,height:'100%'}}>
                                {item.likePoint}
                            </Typography>
                        </Box>
                        <Box sx={{display:'flex',alignItems:'center',height:'14px'}}>
                            <ModeCommentOutlinedIcon sx={{width:'11px',height:'11px',mr:0.3}}/>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'10px',color:'#606060',height:'100%'}}>
                                {item.commentPoint}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                </Box>
            <Box sx={{width:'75px',height:'75px',backgroundColor:'primary.light',borderRadius:'7px',mx:1,backgroundImage:`url(${API_URL}${item.images.length?item.images[0].img:""})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'top center'}}/>
        </Box>
    )
}