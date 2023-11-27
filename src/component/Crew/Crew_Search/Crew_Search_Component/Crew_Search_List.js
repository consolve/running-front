import {Box,Typography,Grid,IconButton} from '@mui/material';
import React, { useState,useCallback } from "react";
import { useRef,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useLocation} from "react-router-dom"
import { useInView } from "react-intersection-observer"
import {CircularProgress} from '@mui/material';
import {API_URL} from "../../../../API/URL/index"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { fetchCrewSearch,runningCrewBookMark } from '../../../../API/api/RunningCrew/crew_api';


export default function Crew_Search_List(props){
    const navigate = useNavigate();
    const querylocation = useLocation();
    const session = localStorage.getItem("sessionid");
    
    const [ref, inView] = useInView();
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [crewBookMark,setCrewBookMark] = useState([]);  
    
    const getItems = useCallback(async () => {
        const query = querylocation.search
        const decodeUri = decodeURI(query);
        setLoading(true);

        let _CrewList = "";
    
        if(decodeUri === ""){
            _CrewList = await fetchCrewSearch("?page="+page,session);
        }
        else{
            _CrewList = await fetchCrewSearch(decodeUri+"&page="+page,session);
        }

        if(_CrewList.response){
            props.setError(_CrewList.response.status)
            props.setOpen(true);
        }
        else{
            props.setList((prev)=>[...prev,..._CrewList])
        }

        setLoading(false);
    }, [page])

    const bookMark = async (id) =>{
        const response = await runningCrewBookMark(id,session);
        if(response.response){
            props.setError(response.response.status)
            props.setOpen(true);
            return false;
        }
        else{
            return true;
        }
    }

    const onClickBookMark = (id,event) =>{
        event.stopPropagation();
        if(bookMark(id)){
            setCrewBookMark((prev)=>({...prev,[id]:!crewBookMark[id]}))
        }
    }


    const navigateToCrewDetail =(id) =>{
        navigate(`/crew/detail/${id}`);
    }

    useEffect(() => {
        getItems();
    }, [getItems])

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage(prevState => prevState + 1)
        }
    }, [inView])

    useEffect(()=>{
        for(const item of props.list){
            setCrewBookMark((prev)=>({...prev,[item.id]:item.bookmarked}))
        }
    },[props.list])

    return(
        <Box sx={{mt:2,display:"flex",justifyContent:"center",flexDirection:'column',alignItems:"center",px:'20px'}}>
            <Box sx={{width:"100%"}}>
                    <Grid container spacing={'10px'} columns={16} >
                        {
                            props.list.map((item,index)=>{
                                return(
                                    <React.Fragment key = {index}>
                                    {
                                        props.list.length-1===index?
                                        <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
                                            <Box ref={ref} onClick={()=>navigateToCrewDetail(item.id)} sx={{width:'100%',mb:1,display:'flex',flexDirection:'column',alignItems:"start",justifyContent:'center'}}>
                                                <Box sx={{position:'relative',backgroundColor:'#f4f4f4',width:'100%',pb:'100%',overflow:"hidden",borderRadius:'8px'}}>
                                                    <img src={`${API_URL}${item.mainImg}`} style={{position:"absolute",width:"100%",height:"100%",objectFit:'contain',objectPosition:'contain'}}/>
                                                    {
                                                        crewBookMark[item.id]?
                                                        <IconButton onClick={(e)=>onClickBookMark(item.id,e)} sx={{position:"absolute",top:5,right:5,zIndex:999}}>
                                                            <BookmarkIcon sx={{color:"#ffffff"}}/>
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
                                                                        <Box key={index} sx={{backgroundColor:'#4F1D76',borderRadius:'6px',mr:'3px'}}>
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
                                                            <BookmarkIcon sx={{color:"#ffffff"}}/>
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
                                                                        <Box key={index} sx={{backgroundColor:'#4F1D76',borderRadius:'6px',mr:'3px'}}>
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