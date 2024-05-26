import { Box,Typography } from "@mui/material"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from "react-router-dom";

export default function MyRunningLife(){
    const navigate = useNavigate();

    const navigateToBan = () =>{
       
    }

    const navigateToAgree = () =>{
        
    }
    
    const navigateToExit = () =>{
        navigate('/resign')
        
    }

    const navigateToLogout = () =>{
        window.localStorage.removeItem('sessionid');
        window.localStorage.removeItem('profile');
        window.localStorage.removeItem('user_number');
        navigate("/login/main")
        window.location.reload();
    }

    return(
        <Box sx={{width:"100%",my:2}}>
            <Box sx={{px:"20px"}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px',color:"#AFAFAF",lineHeight:"19px"}}>
                    기타
                </Typography>
                <Box sx={{width:"100%"}}>
                    {/* <Box onClick={navigateToBan} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            이용 제한 내역
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                    <Box onClick={navigateToAgree} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            정보 동의 설정
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box> */}
                    <Box onClick={navigateToExit} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            회원 탈퇴
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                    <Box onClick={navigateToLogout} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            로그아웃
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}