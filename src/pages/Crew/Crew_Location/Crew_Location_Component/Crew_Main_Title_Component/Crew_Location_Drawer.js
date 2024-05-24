import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import { useEffect,useState } from 'react';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import {Button,Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useRecoilState} from 'recoil'
import {
    CrewLocation_Location
} from '../../../../../state/Crew/CrewLocation_State';

export default function TemporaryDrawer(props) {

    const navigate = useNavigate();
    const [location,setLocation] = useState([]);
    const [currentLocation,setCurrentLocation] = useRecoilState(CrewLocation_Location);

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
    };
    {/*
        속성마다 Drawer의 버튼 선택 여부 변경
    */}

    const handleToggleLocation = (value) => {
        location.includes(value)?
        setLocation((prev)=>prev=[])
        :
        setLocation((prev)=>prev=[value])
    };

    const navigateToCrewLocatioin = () => {
        props.setOpen(false)
        navigate(`/crew/location?location=${location[0]}`);
        setCurrentLocation(location);
    }

    useEffect(()=>{
        setLocation((prev)=>prev=currentLocation);
    },[])

    const list = (anchor) => (
        <Box
        sx={{display:'flex',justifyContent:'center'}}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
        >
            <Box sx={DrawerTheme}>
                <Box sx={{mb:'100px'}}>
                    <Box sx={{height:'50px',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:"21.48px"}}>
                            선택해주세요
                        </Typography>
                        <ClearIcon onClick={toggleDrawer(false)} sx={{position:'absolute', right:30}}/>
                    </Box>
                    <Divider/>

                    {/*지역*/}
                    <Box sx={{width:"92%",my:'20px',mx:'auto'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px'}}>
                            지역
                        </Typography>
                        <Grid container rowSpacing={1} columnSpacing={0} column={{mobile:10,largeMobile:10}} sx={{mb:'20px',mt:'0px'}}>
                            {['수도권','충청권','강원권','전라권','경상권','제주권'].map((text,index)=>(
                                <Grid item mobile={2} largeMobile={2} key = {index}>
                                    <Box key = {index} onClick ={()=>handleToggleLocation(index+1)} backgroundColor={location.includes(index+1)?'primary.main':''} sx={{border:1,borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',mr:1,borderColor:'#D9D9D9'}}>
                                        <Typography color = {location.includes(index+1)?'white':'black'} sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'14px',lineHeight:"16.71px",mx:'9px',my:"7px"}}>
                                            {text}
                                        </Typography>
                                    </Box>    
                                </Grid>
                                ))
                            }
                        </Grid>
                    </Box>

                    {/*하단 버튼*/}
                    <Box sx={{display:'flex',position:"absolute",bottom:'33px',justifyContent:'center',alignItems:'center',left:"50%",transform:'translateX(-50%)',width:'92%',mx:'auto',mt:1,minWidth:'324px',maxWidth:"405px"}}>
                        <Button onClick ={()=>{
                                navigateToCrewLocatioin();
                            }} disabled= {!location.length} variant="contained" color='primary' sx={{width:'100%',height:'45px',borderRadius:'7px'}}>
                            <Typography sx={{fontFamily:'Pretendard Variable',fontSize:'15px',fontWeight:700}}>
                                러닝크루 찾기
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
