import TopBar from "./Topbar"
import { Box,Typography } from "@mui/material"
import {content} from "./const"
import { useNavigate } from "react-router-dom"

export default function Personal(){
    
    const navigate = useNavigate();

    const handleClose = () =>{
        navigate(-1)
    }

    return(
        <Box sx={{
            width:"100%",
            height:'100vh',
            zIndex:1300,
            position:"fixed",
            overflowY:"scroll",
            overflowX:"hidden", 
            left:0,
            top:0,
            backgroundColor:"#ffffff",
        }}>
            <TopBar handleClose={handleClose}/>
            <Box sx={{pt:9,px:'20px'}}>
                <Typography sx={{
                    fontSize:'24px',
                    fontWeight:"700",
                }}>
                    개인정보 처리방침
                </Typography>

                <Box sx={{
                    pt:1,
                    display:"block",
                }}>
                    {
                        content.map((item,index)=>{
                            return(
                                <Box key={index} sx={{pt:2}}>
                                    <Typography sx={{
                                        fontFamily:'Pretendard Variable',
                                        fontSize:'20px',
                                        fontWeight:"600",
                                    }}>
                                        {item.title}
                                    </Typography>
                                    <Typography sx={{
                                        fontFamily:'Pretendard Variable',
                                        color:"#4D5967",
                                        fontSize:'16px',
                                        fontWeight:"500",
                                        pt:1
                                    }}>
                                        {item.content}
                                    </Typography>
                                </Box>
                            )
                        })
                    }
                    <Typography sx={{
                        fontFamily:'Pretendard Variable',
                        color:"#4D5967",
                        fontSize:'16px',
                        fontWeight:"500",
                        pt:1
                    }}>
                        {
                            "부칙"
                        }
                    </Typography>
                    <Typography sx={{
                        fontFamily:'Pretendard Variable',
                        color:"#4D5967",
                        fontSize:'16px',
                        fontWeight:"500",
                        pt:1
                    }}>
                        {
                            "제1조 본 방침은 2024.05.01.부터 시행됩니다."
                        }
                    </Typography>
                </Box>

            </Box>
        </Box>
    )
}