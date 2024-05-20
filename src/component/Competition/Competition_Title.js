import {Box,Typography} from "@mui/material"

export default function Competition_Title({title,content}){
    return(
        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'start',width:'100%'}}>
            <Box sx={{px:"20px"}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px'}}>
                    {title}
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:"#9D9D9D"}}>
                    {content}
                </Typography>
            </Box>
        </Box>
    )
}
