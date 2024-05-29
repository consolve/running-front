import {Box,Typography,Button,Input,CircularProgress} from '@mui/material';
import React, { useState } from "react";
import { useRef,useEffect } from 'react';
import styled from "styled-components"
import Topbar from "./Shoes_Add_Component/Shoes_Add_TopBar"
import {Modal} from '@mui/material';
import { useForm } from "react-hook-form"
import { ApplyShoes } from '../../../API/api/RunningShoes/shoes_api';
//모듈 필요
import { FreeMode } from 'swiper/modules';
//Swiper css
import 'swiper/css';
import 'swiper/css/free-mode';

import "./style.css"

import Error from "../../../component/Error/ErrorModal";

function AddShoes(){

    const {
        register,
        handleSubmit
      } = useForm()

    const inputList = [
        ["name",'러닝화 이름','러닝화 이름을 입력해주세요'],
        ["brand",'러닝화 브랜드','NIKE'],
        ["etc",'기타 원하시는 정보',''],
    ]

    const session = localStorage.getItem('sessionid');

    const imageInputRef = useRef(null);

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const [error,setError] = useState();
    const [loading,setLoading] = useState(false);
    const [modalHeader,setModalHeader] = useState("오류");


    const deleteImage = (index,setBase64,Base64) =>{
        setBase64(Base64.filter((_,i)=>i!==index));
    }


    const onSubmit = async (data) => {
        setLoading(true);
        const _response = await ApplyShoes(session,data);

        if(_response.response){
            switch(_response.response.status){
                case 401:
                    setError("로그인이 필요합니다.");
                    handleOpen();
                    break;
                case 409:
                    setError("이미 등록된 러닝화입니다.");
                    handleOpen();
                    break;
                default:
                    setError("알 수 없는 오류가 발생했습니다.");
                    handleOpen();
                    break;
            }
        }
        else{
            setModalHeader("러닝화 등록 요청 완료")
            setError("러닝화 등록 요청이 완료되었습니다.");
            handleOpen();
        }
        setLoading(false);
    }

    return(
      <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',backgroundColor:'#ffffff',flexDirection:'column'}}>
        
        <Topbar/>
        
        <Box sx={{width:'93%',mt:2}}>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'24px'}}>
                원하시는 러닝화가 있으신가요 ?
            </Typography>
            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',color:"#9D9D9D",mt:-0.5}}>
                여러 테스트를 거쳐 러닝화 정보가 업로드 됩니다.
            </Typography>
        </Box>
        

        <Form onSubmit={handleSubmit(onSubmit)}>
            {
                inputList.map((item,index)=>{
                    return(
                        <Box sx={{display:'flex',width:'100%',flexDirection:"column",mt:3}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px'}}>
                                {item[1]}
                            </Typography>
                            <Input {...register(item[0],{ required: true })} placeholder={item[2]} sx={{width:'100%',fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'15px'}}/>   
                        </Box>

                    )
                })
            }  

            <Button type = "submit" variant="contained" color="primary" sx={{width:'100%',height:'40px',borderRadius:'10px',boxShadow:0,my:2}}>
                <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'16px'}}>
                    러닝화 등록 요청
                </Typography>
            </Button>
        </Form> 

        {
            loading?
            <Box sx={{position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',pr:2}}>
                <CircularProgress color="primary"/>
            </Box>
            :
            ""
        }

        <Error propsHeader={modalHeader} error={error} open={modalOpen} handleClose={handleClose}/>

    </Box>    
    )
}

const Form = styled.form`
  width:93%;
  display:'flex';
  justify-content:'space-between';
  align-items:'start';
  flex-direction:'column';
  padding-top:2;

`


export default AddShoes;