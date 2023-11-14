import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import { useEffect,useState } from 'react';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import {Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {useRecoilState} from 'recoil'
import {
    CompetitionFilter_Course,
    CompetitionFilter_Location,
    CompetitionFilter_Month,
    CompetitionFilter_Keywords,
} from '../../../../state/Competition/CompetitionSearch_State';

export default function TemporaryDrawer(props) {

    const navigate = useNavigate();

    const [month, setMonth] = useRecoilState(CompetitionFilter_Month);
    const [course, setCourse] = useRecoilState(CompetitionFilter_Course);
    const [location, setLocation] = useRecoilState(CompetitionFilter_Location);
    const [keyword, setKeyword] = useRecoilState(CompetitionFilter_Keywords);

    const DrawerTheme = {
        width:'100%',
        height:'100%',
        minWidth:'360px',
        maxWidth:'450px',
        borderTopLeftRadius:20,
        borderTopRightRadius:20, 
        backgroundColor:'#ffffff'
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }
        props.setOpen((prev)=>prev=open);
        console.log(props.open)
    };


    const handleToggleMonth = (value) => {
        !month.includes(value)
        ? setMonth(((month) => [...month, value]))
        : setMonth((month.filter((button) => button !== value)));
    };

    const handleToggleCourse = (value) => {
        !course.includes(value)
        ? setCourse(((course) => [...course, value]))
        : setCourse((course.filter((button) => button !== value)));
    };

    const handleToggleLocation = (value) => {
        !location.includes(value)
        ? setLocation(((location) => [...location, value]))
        : setLocation((location.filter((button) => button !== value)));
    };

    const navigateToSearch = () =>{
        let queryMonth = month.join("%20");
        let queryCourse = course.join("%20");
        let queryLocation = location.join("%20");
        let queryKeyword = keyword;


        const queryArray = [queryMonth,queryCourse,queryLocation,queryKeyword];
        const queryKey = ['month','course','location','keyword'];

        let payload ={}

        for(let i = 0 ; i<4;i++){
            if(queryArray[i] != ""){
                payload[queryKey[i]] = queryArray[i];
            }
        }

        var payloadString = Object.entries(payload).map(e => e.join('=')).join('&');
        props.setOpen(false);

        navigate("/schedule/search?"+payloadString)
    }

    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center'}}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
        >
            <Box sx={DrawerTheme}>
                <Box sx={{height:'450px'}}>
                    <Box sx={{height:'50px',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'15px'}}>
                            필터
                        </Typography>
                        <ClearIcon onClick={toggleDrawer(false)} sx={{position:'absolute', right:30}}/>
                    </Box>
                    <Divider/>

                    {/*날짜*/}
                    <Box sx={{width:"92%",height:'100px',mx:'auto'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'13px',mt:2}}>
                            날짜
                        </Typography>
                        <Box sx={{mt:1}}>
                            <Box sx={{display:'flex',width:"100%"}}>
                                {['1월','2월','3월','4월','5월','6월','7월','8월'].map((text,index)=>(
                                    <Box key = {index} onClick ={()=>handleToggleMonth(index+1)} backgroundColor={month.includes(index+1)?'#4F1D76':''}  sx={{width:"35px",height:'23px',border:1,borderRadius:'13px',display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                        <Typography color = {month.includes(index+1)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px'}}>
                                            {text}
                                        </Typography>
                                    </Box>   
                                ))
                                }
                            </Box>
                            <Box sx={{display:'flex',width:"100%",mt:1}}>
                                {['9월','10월','11월','12월'].map((text,index)=>(
                                    <Box key = {index} onClick ={()=>handleToggleMonth(index+9)} backgroundColor={month.includes(index+9)?'#4F1D76':''} sx={{width:"35px",height:'23px',border:1,borderRadius:'13px',display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                        <Typography color = {month.includes(index+9)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px'}}>
                                            {text}
                                        </Typography>
                                    </Box>   
                                ))
                                }
                            </Box>
                        </Box>
                    </Box>
                    <Divider/>

                    {/*코스*/}
                    <Box sx={{width:"92%",height:'80px',mx:'auto'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'13px',mt:2}}>
                            코스
                        </Typography>
                        <Box sx={{mt:1.5}}>
                            <Box sx={{display:'flex',width:"100%"}}>
                                {['FULL','HALF','10K','5K','ULTRA','챌린지'].map((text,index)=>(
                                    <Box key = {index} onClick ={()=>handleToggleCourse(index)} backgroundColor={course.includes(index)?'#4F1D76':''} sx={{height:'23px',border:1,borderRadius:'13px',display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                        <Typography color = {course.includes(index)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px',mx:1}}>
                                            {text}
                                        </Typography>
                                    </Box>   
                                ))
                                }
                            </Box>
                        </Box>
                    </Box>
                    <Divider/>

                    {/*지역*/}
                    <Box sx={{width:"92%",height:'80px',mx:'auto'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'13px',mt:2}}>
                            지역
                        </Typography>
                        <Box sx={{mt:1.5}}>
                            <Box sx={{display:'flex',width:"100%"}}>
                                {['수도권','충청권','강원권','전라권','경상권','제주권'].map((text,index)=>(
                                    <Box key = {index} onClick ={()=>handleToggleLocation(index)} backgroundColor={location.includes(index)?'#4F1D76':''} sx={{width:"50px",height:'23px',border:1,borderRadius:'13px',display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                        <Typography color = {location.includes(index)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'13px'}}>
                                            {text}
                                        </Typography>
                                    </Box>   
                                ))
                                }
                            </Box>
                        </Box>
                    </Box>

                    {/*하단 버튼*/}
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'92%',mx:'auto',mt:1}}>
                        <Button onClick ={()=>{
                            navigateToSearch();
                            }} variant="contained" color='primary' sx={{width:'100%',height:'45px',borderRadius:'7px'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'15px',fontWeight:700}}>
                                러닝대회 찾기
                            </Typography>
                        </Button>
                    </Box>

                </Box>

            </Box>
        </Box>
    );

    return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:"center"}}>
            <React.Fragment>
            <Drawer
                PaperProps={{
                    sx: {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    }
                }}
                anchor={'bottom'}
                open={props.open}
                onClose={toggleDrawer(false)}
            >   
                {list()}
            </Drawer>
            </React.Fragment>
        </Box>
    );
}
