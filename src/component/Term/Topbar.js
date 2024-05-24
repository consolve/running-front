import {Box,IconButton,Paper} from '@mui/material';
import TopbarTheme from '../../style/plate/topbar';
import WestIcon from '@mui/icons-material/West';


export default function TopBar({handleClose}){

    return(
    <Box sx={TopbarTheme}>
        <Box sx={{mx:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',height:"100%",borderBottom:'3px solid',borderBottomColor:'#F6F6F6',}}>
            <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',height:"100%"}}>
                <IconButton onClick={handleClose} type="button" sx={{p:0}} aria-label="search">
                    <WestIcon sx={{}}/>
                </IconButton>
            </Box>
        </Box>
    </Box>    
    )
}