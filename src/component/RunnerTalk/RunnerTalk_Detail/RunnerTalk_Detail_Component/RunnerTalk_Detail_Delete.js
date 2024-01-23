import {Box,Modal,Typography} from "@mui/material"
import {DeletePost} from "../../../../API/api/RunningTalk/runningTalk_api";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function DeletePopper({id,sessionid,open,handleOpen}){

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius:'7px',
        p: 3,
        outline: 'none',
    };

    const navigate = useNavigate();
      
    const deletePost = async () => {
        const response = await DeletePost(sessionid,id);
        if(response){
            handleOpen();
        }
        else{
            navigate(-1);
        }
    }

    return(
        <Box>   
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ '& .Mui-focused': { outline: 'none' } }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" sx={{fontFamily:'Pretendard Variable',fontWeight:700}}>
                        잠시만요, 확인해주세요!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 0.5,fontFamily:'Pretendard Variable',fontWeight:500}}>
                        {"한번 삭제된 게시글은 다시 복구할 수 없어요."}<br/>{"확실하신가요?"}
                    </Typography>

                    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",mt:1}}>
                        <Box onClick={handleOpen} sx={{backgroundColor:"#D9D9D9",display:"flex",alignItems:"center",justifyContent:"center",width:"140px",borderRadius:'7px',height:'40px'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',color:"black",fontWeight:600}}>
                                취소
                            </Typography>
                        </Box>
                        
                        <Box onClick={deletePost} sx={{backgroundColor:"#4F1D76",width:'140px',borderRadius:'7px',height:'40px',display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',color:"white",fontWeight:600}}>
                                삭제
                            </Typography>
                        </Box>

                    </Box>
                </Box>  
            </Modal>

        </Box>
    )
}