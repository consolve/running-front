import {Box,Typography,Avatar,Button} from '@mui/material';
import React, { useEffect, useState } from "react";
import { API_URL } from '../../../../API/URL';
import { fetchUserName } from '../../../../API/api/RunningShoes/shoes_api';
import DefaultProfile from '../../../../Image/user-circle.png';
import styled from "styled-components"

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

export default function Profile(){
    const profile = window.localStorage.getItem('profile');
    const [userName, setUserName] = useState('');
    const [Base64s, setBase64s] = useState([]);
    const session = window.localStorage.getItem('sessionid');

    const getUserName = async () =>{
        const response = await fetchUserName(session);
        setUserName(prev=>prev=response);
        return response;
    }

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
        setBase64s([]);

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

                    setBase64s((prev) => [...prev, data ]);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    useEffect(()=>{
        getUserName();
    },[])

    return(
        <Box sx={{width:'100%',my:1}}>
            <Box sx={{px:'20px',display:'flex',alignItems:"center"}}>
                <Avatar alt="Profile" color="primary" src={profile==="/media/None.png"?"":`${API_URL}${profile}`} sx={{width:"96px",height:"96px"}}/>

                <Box sx={{ml:'17px'}}>
                    <Typography color="primary" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:"normal"}}>
                        {userName}{'님,'}
                    </Typography>
                    <Typography color="primary" sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:"normal"}}>
                        {'오늘 러닝은 어떠셨나요?'}
                    </Typography>

                    <Label for='input-file'>
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#4F1D76',width:'100%',height:'22px',borderRadius:'10px',boxShadow:0,mt:1}}>
                            <Typography sx={{color:"white",fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'10px'}}>
                                프로필 사진 변경
                            </Typography>
                        </Box>
                    </Label>    

                    <VisuallyHiddenInput
                        id="input-file"
                        name="photo_file"
                        accept=".jpg"
                        onChange={handleImageUpload}
                        type="file"
                    />

                </Box>
            </Box>
        </Box>
    )
}

const Label = styled.label`
    width:100%;
`