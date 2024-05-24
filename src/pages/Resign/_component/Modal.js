import {Box,Modal,Typography} from "@mui/material"
import {useState,useEffect} from "react";

export default function Error({open,handleClose}){

    const [header,setHeader] = useState("");
    const [body,setBody] = useState("");

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
                    {/* <Typography id="modal-modal-description" sx={{ mt: 0.5,fontFamily:'Pretendard Variable',fontWeight:500}}>
                        {}
                    </Typography> */}
                </Box>  
            </Modal>

        </Box>
    )
}