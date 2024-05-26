import { Box,Typography } from "@mui/material"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from "react-router-dom";

export default function MyRunningLife(){
    const navigate = useNavigate();

    const navigateToSavedCompetition = () =>{
        navigate('/profile/saved/competition')
    }

    const navigateToSavedRunnerTalk = () =>{
        navigate('/profile/saved/runnertalk')
    }
    
    const navigateToSavedShoes = () =>{
        navigate('/profile/saved/shoes')
    }

    const navigateToSavedCrew = () =>{
        navigate('/profile/saved/crew')
    }

    const navigateToMyRunnerTalk = () =>{
        navigate('/profile/myrunnertalk')
    }


    return(
        <Box sx={{width:"100%",my:2}}>
            <Box sx={{px:"20px"}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px',color:"#AFAFAF",lineHeight:"19px"}}>
                    MY RUNNINGLIFE
                </Typography>
                <Box sx={{width:"100%"}}>
                    <Box onClick={navigateToSavedCompetition} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            저장한 대회
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                    <Box onClick={navigateToSavedShoes} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            저장한 러닝화
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                    <Box onClick={navigateToSavedRunnerTalk} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            저장한 러너톡
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                    <Box onClick={navigateToSavedCrew} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            저장한 러닝크루
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                    <Box onClick={navigateToMyRunnerTalk} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            내가 쓴 러너톡
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}