import { Box, Skeleton } from "@mui/material";

export default function MoreSkeleton(){
    return(
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',flexDirection:'column',mt:1}}>
            <Box sx={{width:"100%"}}>
                <Skeleton variant="rectangular" sx={{borderRadius:'10px',height:'40px',mx:"20px"}}/>
            </Box>
        </Box>
    )
}