import {Box,Modal,Typography} from "@mui/material"
import {useState,useEffect} from "react";

export default function Error({error,open,handleClose,propsHeader="오류가 발생했습니다"}){

    const [header,setHeader] = useState("");
    const [body,setBody] = useState("");

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border:0,
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius:'7px',
        p: 3,
        outline: 'none',
    };

    useEffect(()=>{
        setHeader(propsHeader);
        setBody(error);
    },[error])

    return(
        <Box>   
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ '& .Mui-focused': { outline: 'none' } }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" sx={{fontFamily:'Pretendard Variable',fontWeight:700}}>
                        {header}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 0.5,fontFamily:'Pretendard Variable',fontWeight:500}}>
                        {body}
                    </Typography>
                </Box>  
            </Modal>

        </Box>
    )
}