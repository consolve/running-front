import {Box,Typography} from '@mui/material'

export default function Title({content}){
    return(
        <Box sx={{width:'100%'}}>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between',px:"20px"}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px',lineHeight:"28.64pxx"}}>
                    {content}
                </Typography>
            </Box>
        </Box>
    )
}