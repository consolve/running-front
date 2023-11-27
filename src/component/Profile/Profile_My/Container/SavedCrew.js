import {Box,Typography,Modal,Skeleton,Grid} from '@mui/material';
import Topbar from "../Component/Topbar"
import {useState,useEffect} from "react"
import Content from "../Component/Content._Crewjs"
import {FetchMysavedCrew} from "../../../../API/api/RunningCrew/crew_api"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const loadinglist=[1,2,3,4,5,6,7,8,9,10]

export default function MyCrew(){

    const [loading,setLoading] = useState(true);
    const [savedCrew,setSavedCrew] = useState([]);
    const [open, setOpen] = useState(false);
    const [error,setError] = useState("");

    const session = window.localStorage.getItem('sessionid');

    const handleClose = () => setOpen(false);

    const FetchList = async () =>{
        const _savedCrew = await FetchMysavedCrew(session);

        if(_savedCrew.response){
            setError(_savedCrew.response.status)
            setOpen(true)
        }
        else{
            setSavedCrew(_savedCrew);
        }
        setLoading(false);
    }

    useEffect(() =>{
        setLoading(true);
        FetchList();
    },[])

    return(
        <Box sx={{width:"100%"}}>
            <Topbar/>
            <Box sx={{px:"20px",mt:"62px"}}>
                <Box sx={{display:'flex',justifyContent:"space-between",pt:"8px",alignItems:"end"}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'25px',lineHeight:"29.83px"}}>
                        저장한 러닝크루
                    </Typography>
                    {/* <Typography onClick={handleVisible} color={isVisible?"primary":"#A6A6A6"} sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'16px',lineHeight:"19px"}}>
                        {isVisible?"완료":"편집"}
                    </Typography> */}
                </Box>
                <Box sx={{mt:"25px"}}>
                {
                    loading?
                    <Box sx={{display:'flex',justifyContent:"center"}}>
                        <Box sx={{display:'flex',flexDirection:'column',width:"50%",alignItems:"center"}}>
                            {loadinglist.slice(0, Math.ceil(loadinglist.length / 2)).map((item, index) => (
                            <Box key={index} sx={{width:"100%",display:'flex',justifyContent:'center',alignItems:"center"}}>
                                <Skeleton variant="rectangular" width={'95%'} height={"240px"} sx={{mt:1,borderRadius:2}}/>   
                            </Box>
                            ))}
                        </Box>
                        <Box sx={{display:'flex',flexDirection:'column',width:'50%'}}>
                            {loadinglist.slice(Math.ceil(loadinglist.length / 2)).map((item, index) => (
                            <Box key={index} sx={{width:"100%",display:'flex',justifyContent:'center',alignItems:"center"}}>
                                <Skeleton variant="rectangular" width={'95%'} height={"240px"} sx={{mt:1,borderRadius:2}}/>   
                            </Box>
                            ))}
                        </Box>
                    </Box>
                    :
                    <Box sx={{}}>
                        {
                            savedCrew?
                            <Grid container spacing={'10px'} columns={16} >
                                {
                                    savedCrew.map((contest,index) => (
                                        <Content key={contest.id} item={contest}/>
                                    ))
                                }
                            </Grid>
                        
                            :
                            <Box>
                                error
                            </Box>
                        } 
                    </Box>
                    }
                </Box>
            </Box>


            <Box>   
                <Modal
                    open={open}
                    onClose={handleClose}
                    disableScrollLock
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {error}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        
                    </Typography>
                    </Box>
                </Modal>
            </Box>
        </Box>  
    )
}