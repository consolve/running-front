import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {useState,React} from "react";
import {Box,Typography} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import DefaultProfile from '../../../../Image/user-circle.png';
import styled from "styled-components"
import { fetchUserImage } from '../../../../API/api/Profile/profile_api';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
    display: 'inline-block',
    cursor: 'pointer'
  });

const DrawerTheme = {
    width:'100%',
    height:'100%',
    minWidth:'360px',
    maxWidth:'450px',
    borderTopLeftRadius:20,
    borderTopRightRadius:20, 
    backgroundColor:'#ffffff',
    pb:3
}

export default function Profile_ChangeImage_Drawer({open,handleOpen,setImage}){

    const session = localStorage.getItem("sessionid");

    const encodeFileToBase64 = (image) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);    
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageUpload = async (e) => {
        const fileArr = e.target.files;

        let file;
        let maxFile = 1;
        let filesLength = fileArr.length > maxFile ? maxFile : fileArr.length;

        if (fileArr.length > maxFile) {
            alert(`한번에 업로드 가능한 사진은 최대 ${maxFile}장 까지 입니다.`);
        }

        for (let i = 0; i < filesLength; i++) {
            file = fileArr[i];

            if (file.type !== "image/jpeg" && file.type !== "image/jpg") {
                alert(`JPG 사진 파일만 가능합니다.`);
                break;
            } else {
                try {
                    const data = await encodeFileToBase64(file);

                    FetchProfileImage(data);

                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    const FetchProfileImage = async (data) =>{
        const response = await fetchUserImage(session,data);

        console.log(response);

        if(response.response){

        }
        else{
            
        }
    }

    const FetchProfileImageDefault = () =>{
        setImage("/media/None.png");
        localStorage.setItem("profile","/media/None.png");
        handleOpen();
    }

    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center'}}
        role="presentation"
        >
            <Box sx={DrawerTheme}>
                <Box onClick={handleOpen} sx={{display:"flex",justifyContent:'end',alignItems:"center",px:3,py:1}}>
                    <CloseIcon/>
                </Box>

                <Box sx={{display:'flex',flexDirection:'column',justifyContent:"center",alignItems:'start',px:3}}>

                    <Typography onClick={FetchProfileImageDefault} sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px'}}>
                        기본 프로필로 변경
                    </Typography>
        
                    <Label for="input-file">
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'600',fontSize:'16px',pt:1}}>
                            프로필 사진 업로드
                        </Typography>
                    </Label>

                </Box>
            </Box>
        </Box>
    );
    
    return(
        <Box sx={{display:'flex',justifyContent:'center',alignItems:"center"}}
        
        >
            <>
                <SwipeableDrawer
                    disableScrollLock={ true }
                    PaperProps={{
                        sx: {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        
                        }
                    }}
                    anchor={'bottom'}
                    open={open}
                    onClose={handleOpen}
                >   
                    {list()}
                </SwipeableDrawer>

                
                <VisuallyHiddenInput
                    id="input-file"  
                    name="photo_file"
                    accept=".jpg"
                    onChange={handleImageUpload}
                    type="file"
                />
            </>
        </Box>
    )
}

const Label = styled.label`
    width:100%;
`