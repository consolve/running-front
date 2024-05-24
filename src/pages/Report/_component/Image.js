import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button,Typography } from '@mui/material';
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

export default function Navbar(props) {
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
        props.setBase64s([]);

        let file;
        let maxFile = 10;
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

                    props.setBase64s((prev) => [...prev, data ]);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

  return (
    <Box sx={{display:'flex',alignItems:"start",width:'100%',backgroundColor:'#ffffff',flexDirection:"column"}} elevation={0}>
        <Box sx={{
            px:"20px"
        }}>
            
            <Label for="input-file">
                <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:"100%"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px'}}>
                        사진
                    </Typography>
                </Box>
            </Label>

            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'400',fontSize:'10px',color:"#A6A6A6",pt:'12px'}}>
                악의적인 신고를 반복할 경우 서비스 이용이 제한될 수 있습니다.
            </Typography>

            <VisuallyHiddenInput
                id="input-file"
                multiple   
                name="photo_file"
                accept=".jpg"
                onChange={handleImageUpload}
                type="file"
            />
        </Box>
    </Box>
  );
}

const Label = styled.label`
    width:100%;
`