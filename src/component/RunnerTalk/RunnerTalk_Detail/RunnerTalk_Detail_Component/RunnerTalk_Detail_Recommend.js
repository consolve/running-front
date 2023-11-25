import { Box } from '@mui/material';
import Like from "./RunnerTalk_Detail_Recommend_Component/Like"
import Bookmark from "./RunnerTalk_Detail_Recommend_Component/Bookmark"

export default function Recommend({detail}){
    const likePoint = detail.likePoint;
    const bookmarkPoint = detail.bookmarkPoint;
    const id = detail.id;

    return(
        <Box sx={{width:"100%",my:"10px"}}>
            <Box sx={{px:"20px",display:"flex"}}>
                <Like point = {likePoint} id={id}/>
                <Bookmark point={bookmarkPoint} id={id}/>
            </Box>
        </Box>
    )
}