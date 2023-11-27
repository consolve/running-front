import { Box,Typography } from "@mui/material"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from "react-router-dom";

export default function MyRunningLife(){
    const navigate = useNavigate();

    const navigateToAppVersion = () =>{
       
    }

    const navigateToAlert = () =>{
        
    }
    
    const navigateToDeleteCache = () =>{
        
    }

    return(
        <Box sx={{width:"100%",my:2}}>
            <Box sx={{px:"20px"}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px',color:"#AFAFAF",lineHeight:"19px"}}>
                    앱 설정
                </Typography>
                <Box sx={{width:"100%"}}>
                    <Box onClick={navigateToAppVersion} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            앱 버전
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                    <Box onClick={navigateToAlert} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            알림설정
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                    <Box onClick={navigateToDeleteCache} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            캐시 삭제
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}