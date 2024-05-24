import { Box,Typography } from "@mui/material"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from "react-router-dom";
import React from 'react';
import Personal from "../../../../component/Term/privacy";

export default function MyRunningLife(){
    const navigate = useNavigate();
    const [termOpen,setTermOpen] = React.useState(false); 

    const handleClose = () =>{
        setTermOpen(false);
    }

    const navigateToReport = () =>{
       
    }

    const navigateToNotification = () =>{
        
    }
    
    const navigateToRule = () =>{
        
    }

    const navigateToTerms = () =>{
        navigate("/term/service")
    }

    const navigateToPrivacy = () =>{
        navigate("/term/privacy");
    }

    const navigateToOSL = () =>{

    }

    return(
        <Box sx={{width:"100%",my:2}}>
            <Box sx={{px:"20px"}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px',color:"#AFAFAF",lineHeight:"19px"}}>
                    이용안내
                </Typography>
                <Box sx={{width:"100%"}}>
                    <Box onClick={navigateToReport} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            문의 및 신고
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                    {/* <Box onClick={navigateToNotification} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            공지사항
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box> */}
                    {/* <Box onClick={navigateToRule} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            커뮤니티 이용규칙
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box> */}
                    <Box onClick={navigateToTerms} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            서비스 이용약관
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                    <Box onClick={navigateToPrivacy} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            개인정보 처리방침
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box>
                    {/* <Box onClick={navigateToOSL} sx={{display:"flex",justifyContent:"space-between",my:"13px"}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',lineHeight:"17px"}}>
                            오픈소스 라이선스
                        </Typography>
                        <ChevronRightIcon color="primary" sx={{width:"20px",height:"20px"}}/>
                    </Box> */}
                </Box>
            </Box>

            {
                termOpen&&<Personal handleClose={handleClose}/>
            }
        </Box>
    )
}