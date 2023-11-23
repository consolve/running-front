import {Box,Typography} from "@mui/material"

export default function Competition_More({navigateToMoreContest}){
    return(
        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column',mt:1}}>
            <Box onClick={navigateToMoreContest} sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px',height:'40px',mt:1,width:'calc(100% - 40px)',border:1,color:'#E8E8E8'}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:'#606060'}}>
                    더보기
                </Typography>
            </Box>
        </Box>
    )
}