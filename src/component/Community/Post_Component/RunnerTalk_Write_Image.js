import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button,Typography } from '@mui/material';
import styled from "styled-components"
import {
    RunnerTalk_Write_Image
} from "../../../state/RunnerTalk/RunnerTalk_Write_State"
import { useRecoilState } from 'recoil';
import {ReactComponent as ImageIcon} from '../../../Image/icon/ImageIconOutlined.svg';

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

export default function Navbar() {
    const [base64s,setBase64s] = useRecoilState(RunnerTalk_Write_Image);

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

                    setBase64s((prev) => [...prev, data ]);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

  return (
    <Box sx={{display:'flex',alignItems:"center", position: 'fixed', bottom: 0, left: '50%', right: 0,width:'95%',minWidth:'342px',maxWidth:'399px',transform:'translate(-50%,0)',zIndex:2,height:'65px',borderTop:1,borderTopColor:'#EDEDED',backgroundColor:'#ffffff' }} elevation={0}>
        
        <Label for="input-file">
            <ImageIcon width={26} height={26} style={{marginLeft:'8px'}}/>
        </Label>

        <VisuallyHiddenInput
            id="input-file"
            multiple   
            name="photo_file"
            accept=".jpg"
            onChange={handleImageUpload}
            type="file"
        />
    </Box>
  );
}

const Label = styled.label`
    width:100%;
`