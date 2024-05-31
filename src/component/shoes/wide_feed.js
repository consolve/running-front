import {Box,Typography} from '@mui/material';
import { API_URL } from '../../API/URL';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import { keyframes } from '@mui/material';

const convertToCustomDate = (date) => {
    const customDate = new Date(date); // 월은 0부터 시작하므로 2는 3월을 의미합니다.
    const year = customDate.getFullYear();
    const month = (customDate.getMonth() + 1).toString().padStart(2, '0'); // 1을 더하고 두 자리로 맞춥니다.
    const day = customDate.getDate().toString().padStart(2, '0'); // 두 자리로 맞춥니다.
    return `${year}.${month}.${day}`;
};

export default function Competition_TopBar({item,navigateToCompetitionDetail,inputref}){
    return(
        <Box ref={inputref} key ={item.id} onClick ={()=>navigateToCompetitionDetail(item.id)} sx={{display:'flex',alignItems:'center',backgroundColor:'#F6F6F6',borderRadius:2,height:'110px',mt:1,mx:"20px"}}>
            <Box sx={{width:'90px',height:'90px',backgroundColor:'#F6F6F6',borderRadius:'8px',mx:'11px',backgroundImage:`url(${API_URL}${item.mainBanner.mainBanner})`,backgroundRepeat:'no-repeat',backgroundSize:'contain',backgroundPosition:'center'}}/>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:`calc(100% - 112px)`,flexDirection:'column'  }}>
                <Box sx={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'700',fontSize:'18px',lineHeight:'21.46px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                        {item.name}
                    </Typography>
                    <NotificationsActiveIcon fontSize={'small'} sx={{pr:2}}/>
                </Box>
                <Box sx={{width:'100%',mt:'7px'}}>
                    <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'0.75rem',color:'#606060',lineHeight:'15.51px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                            {item.place}
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'0.75rem',color:'#606060',lineHeight:'15.51px'}}>
                            &nbsp;{'|'}&nbsp;
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'0.75rem',color:'#606060',lineHeight:'15.51px',mr:2}}>
                            {convertToCustomDate(item.competitionTime)}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{width:'100%',mt:'3px'}}>
                    <Box sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'0.75rem',color:'#606060',lineHeight:'15.51px'}}>
                            접수기간 |&nbsp;
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'0.75rem',color:'#606060',lineHeight:'15.51px'}}>
                            {convertToCustomDate(item.receptionStartTime)}
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'0.75rem',color:'#606060',lineHeight:'15.51px'}}>
                            ~
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'0.75rem',color:'#606060',lineHeight:'15.51px'}}>
                            {convertToCustomDate(item.receptionEndTime)}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',pt:'8px'}}>
                    <Box sx={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                    {
                        item.courseTags.map((item,index)=>{
                            return(
                                <Box key ={index} sx={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'primary.main',borderRadius:'6px',mr:'3px'}}>
                                    <Typography sx={{fontFamily:'Pretendard Variable',fontStyle:'normal',fontWeight:'700',fontSize:'9px',color:'#ffffff',lineHeight:"10.74px",mx:'6px',my:'2px',width:"auto"}}>
                                        {item.name}
                                    </Typography>
                                </Box>
                            )
                    })
                    }   
                    </Box>
                    <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'300',fontSize:'8px',color:'#606060',width:'35px',mr:'15px'}}>
                        상세정보 {'>'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}