import {Box,Typography,Grid,IconButton} from '@mui/material';
import React, { useState,useCallback } from "react";
import { useRef,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer"
import {CircularProgress} from '@mui/material';
import {API_URL} from "../../../../API/URL/index"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {useRecoilState} from 'recoil'
import {
    CrewLocation_List,
    CrewLocation_Loading,
    CrewLocation_Error,
    CrewLocation_Location
} from '../../../../state/Crew/CrewLocation_State';
import {    
    CrewMain_CrewBookMark
} from "../../../../state/Crew/CrewMain_State"
import { fetchCrewLocation,runningCrewBookMark } from '../../../../API/api/RunningCrew/crew_api';
import BookMarkHandle from '../../../../Util/bookmark';

export default function Crew_Location_List(props){

    const navigate = useNavigate();
    const session = localStorage.getItem("sessionid");

    const locationMap = {
        1:"captial",
        2:'chungcheong',
        3:'gangwon',
        4:'jeolla',
        5:'gyeongsang',
        6:'gyeongsang',
    }
    
    const [error,setError] = useRecoilState(CrewLocation_Error);
    const [list,setList] = useRecoilState(CrewLocation_List);
    const [ref, inView] = useInView();
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(CrewLocation_Loading);  
    const [location,setLocation] = useRecoilState(CrewLocation_Location);
    const [crewBookMark,setCrewBookMark] = useRecoilState(CrewMain_CrewBookMark);

    const onClickBookMark = (id,event) =>{
        event.stopPropagation();
        if(BookMarkHandle("crew",id,session,navigate)){
            setCrewBookMark((prev)=>({...prev,[id]:!crewBookMark[id]}))
        }
    }

    useEffect(() => {
        const getItems = async () => {
        
            setLoading(true);
            const _CrewList = await fetchCrewLocation(locationMap[location]+"?page="+page,session);
    
            if(_CrewList.response){
                setError(_CrewList.response.status)
                props.setOpen(true);
            }
            else{
                setList((prev)=>[...prev,..._CrewList])
            }
    
            setLoading(false);
        }
        getItems();
    }, [page])

    const navigateToCrewDetail =(id) =>{
        navigate(`/crew/detail/${id}`);
    }

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage(prevState => prevState + 1)
        }
    }, [inView])


    return(
        <Box sx={{display:"flex",justifyContent:"center",flexDirection:'column',alignItems:"center",px:'20px'}}>
            <Box sx={{width:"100%"}}>
                <Grid container spacing={'10px'} columns={16} >
                        {
                            list.map((item,index)=>{
                                return(
                                    <React.Fragment key = {index}>
                                    {
                                        list.length-1===index?
                                        <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
                                            <Box ref={ref} onClick={()=>navigateToCrewDetail(item.id)} sx={{width:'100%',mb:1,display:'flex',flexDirection:'column',alignItems:"start",justifyContent:'center'}}>
                                                <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:'100%',pb:'100%',overflow:"hidden",borderRadius:'8px'}}>
                                                    <img src={`${API_URL}${item.mainImg}`} style={{position:"absolute",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
                                                    {
                                                        crewBookMark[item.id]?
                                                        <IconButton onClick={(e)=>onClickBookMark(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                            <BookmarkIcon sx={{color:"primary.main"}}/>
                                                        </IconButton>
                                                        :
                                                        <IconButton onClick={(e)=>onClickBookMark(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                            <BookmarkIcon sx={{color:"primary.main"}}/>
                                                        </IconButton>
                                                    }
                                                </Box>
                                                <Box sx={{mt:1,mb:0,ml:0.5}}>
                                                        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                            {
                                                                item.activityAreaTag.map((item,index)=>{
                                                                    return(
                                                                        <Box key={index} sx={{backgroundColor:'primary.main',borderRadius:'6px',mr:'3px'}}>
                                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'9px',color:'#ffffff',my:'2px',mx:'6px',lineHeight:"normal"}}>
                                                                                {item.name}
                                                                            </Typography>
                                                                        </Box>
                                                                    )
                                                            })
                                                            }      
                                                        </Box>

                                                        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',width:'100%',mt:'4px'}}>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:"normal"}}>
                                                                {item.name}
                                                            </Typography>
                                                            <Box sx={{display:'flex',mt:"4px"}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',lineHeight:"normal",fontWeight:'300',fontSize:'13px',color:'#606060',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    정기런&nbsp;{'|'}&nbsp;{item.regularRun}
                                                                </Typography>
                                                                
                                                            </Box>

                                                            <Box sx={{display:'flex',mt:'2px'}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',lineHeight:"normal",fontWeight:'300',fontSize:'13px',color:'#606060',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    시간&nbsp;{'|'}&nbsp;{item.runningTime}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        :
                                        <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
                                            <Box onClick={()=>navigateToCrewDetail(item.id)} sx={{width:'100%',mb:1,display:'flex',flexDirection:'column',alignItems:"start",justifyContent:'center'}}>
                                                <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:'100%',pb:'100%',overflow:"hidden",borderRadius:'8px'}}>
                                                    <img src={`${API_URL}${item.mainImg}`} style={{position:"absolute",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
                                                    {
                                                        crewBookMark[item.id]?
                                                        <IconButton onClick={(e)=>onClickBookMark(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                            <BookmarkIcon sx={{color:"primary.main"}}/>
                                                        </IconButton>
                                                        :
                                                        <IconButton onClick={(e)=>onClickBookMark(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                            <BookmarkBorderIcon sx={{color:"#ffffff"}}/>
                                                        </IconButton>
                                                    }
                                                </Box>
                                                <Box sx={{mt:1,mb:0,ml:0.5}}>
                                                        <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                                                            {
                                                                item.activityAreaTag.map((item,index)=>{
                                                                    return(
                                                                        <Box key={index} sx={{backgroundColor:'primary.main',borderRadius:'6px',mr:'3px'}}>
                                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'9px',color:'#ffffff',my:'2px',mx:'6px',lineHeight:"normal"}}>
                                                                                {item.name}
                                                                            </Typography>
                                                                        </Box>
                                                                    )
                                                            })
                                                            }      
                                                        </Box>

                                                        <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',width:'100%',mt:'4px'}}>
                                                            <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:"normal"}}>
                                                                {item.name}
                                                            </Typography>
                                                            <Box sx={{display:'flex',mt:"4px"}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',lineHeight:"normal",fontWeight:'300',fontSize:'13px',color:'#606060',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    정기런&nbsp;{'|'}&nbsp;{item.regularRun}
                                                                </Typography>
                                                                
                                                            </Box>

                                                            <Box sx={{display:'flex',mt:'2px'}}>
                                                                <Typography sx={{fontFamily:'Pretendard Variable',lineHeight:"normal",fontWeight:'300',fontSize:'13px',color:'#606060',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                                                                    시간&nbsp;{'|'}&nbsp;{item.runningTime}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    }
                                    </React.Fragment>
                                )
                            })
                        }
                </Grid>
                
            </Box>
            {
                loading?
                    <CircularProgress color="primary" />
                :
                ""
            }
        </Box>    
    )
}