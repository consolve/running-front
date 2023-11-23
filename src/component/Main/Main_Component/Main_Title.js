import {Box,Typography} from "@mui/material"
import { Link } from "react-router-dom"

export default function Title({title,navigate}){
    return(
        <Box sx={{width:"100%"}}>
            <Box sx={{mx:"20px",display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'800',fontSize:'24px'}}>
                    {title}
                </Typography>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'14px',color:'#8E8D8D'}}>
                    <Link to = {navigate} style={{ textDecoration: 'none', color:'#9D9D9D' }}>
                        더보기 {'>'}
                    </Link>
                </Typography>
            </Box>
        </Box>
    )
}