import { TextField } from "@mui/material"

export default function Input({handleNumber}){
    return(
        <>
            <TextField variant="outlined"
                onChange={handleNumber}
                placeholder="전화번호 입력"
                sx={{
                    color:"primary.main",
                    width:"100%",
                    pt:1,
                }}
                type="number"
                InputProps={{
                    sx:{
                        borderRadius:'7px',
                        fontFamily:'Pretendard Variable',
                        backgroundColor:"#F9F9F9",
                    }
                }}
                />
        </>
    )
}