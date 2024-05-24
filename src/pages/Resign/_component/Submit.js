import {Button,Typography,Box} from '@mui/material';

export default function Submit({
    onClick,
    number
}){
    return(
        <Box sx={{
            width:"100%",
            pt:1
        }}>
            <Box sx={{
                mx:"20px"
            }}>
                <Button disabled = {!number} onClick = {onClick} variant="contained" color="primary" sx={{width:'100%',height:'40px',borderRadius:'10px',boxShadow:0}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px'}}>
                        회원 탈퇴하기
                    </Typography>
                </Button>     
            </Box>
        </Box>
    )
}