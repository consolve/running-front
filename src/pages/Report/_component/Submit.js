import {Button,Typography,Box} from '@mui/material';

export default function Submit({
    onClick,
    header,
    content
}){
    return(
        <Box sx={{
            width:"100%",
            pt:2
        }}>
            <Box sx={{
                mx:"20px"
            }}>
                <Button disabled = {!header||!content} onClick = {onClick} variant="contained" color="primary" sx={{width:'100%',height:'40px',borderRadius:'10px',boxShadow:0}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px'}}>
                        문의 및 신고 하기
                    </Typography>
                </Button>     
            </Box>
        </Box>
    )
}