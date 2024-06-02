import {Box,Modal,Typography} from "@mui/material"
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {BlockUser} from "../../../API/api/User/user"
import Error from "../../Error/ErrorModal"

export default function DeleteModal({id,open,handleOpen,deleteComment,deleteCommentSet}){

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

    const [error,setError] = useState("")
    const [openError,setOpenError] = useState(false)

    const handleCloseError = () => {    
        setOpenError(false);
    }

    const sessionid = localStorage.getItem("sessionid");    
    const navigate = useNavigate();

    const handleDeleteComment = async () => {
        const _response = await deleteComment(sessionid,id);

        if(_response.response){
            switch(_response.response.status){
                case 401:
                    setError("로그인이 필요합니다.")
                    setOpenError(true);
                    break;
                case 403:
                    setError("잘못된 접근입니다.")
                    setOpenError(true);
                    break;
                case 404:
                    setError("존재하지 않는 댓글입니다.")
                    setOpenError(true);
                    break;
                case 500:
                    setError("서버 오류입니다.")
                    setOpenError(true);
                    break;
                default:
                    setError("알 수 없는 오류입니다.")
                    setOpenError(true);
                    break;
            }
        }else{
            const {comment,setComment,index} = deleteCommentSet;
            setComment(comment.filter((_,i)=>i!==index));
        }
    }


    return(
        <>   
            <Error error={error} open={openError} handleClose={handleCloseError} propsHeader="오류가 발생했습니다"/>
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
                        {"작성하신 댓글이 삭제돼요."}<br/>{"확실하신가요?"}
                    </Typography>

                    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",mt:1}}>
                        <Box onClick={handleOpen} sx={{backgroundColor:"#D9D9D9",display:"flex",alignItems:"center",justifyContent:"center",width:"140px",borderRadius:'7px',height:'40px'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',color:"black",fontWeight:600}}>
                                취소
                            </Typography>
                        </Box>
                        
                        <Box onClick={handleDeleteComment} sx={{backgroundColor:"primary.main",width:'140px',borderRadius:'7px',height:'40px',display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',color:"white",fontWeight:600}}>
                                삭제
                            </Typography>
                        </Box>

                    </Box>
                </Box>  
            </Modal>

        </>
    )
}