import {Box,Typography} from '@mui/material';

export default function More({select,tags,navigateToShoesSearch}){
    return(
        <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
            {
                tags.length?
                <Box onClick={()=>navigateToShoesSearch(select+1)} sx={{display:'flex',justifyContent:'start',alignItems:'center',width:'100%',flexDirection:'column',mt:2,px:"20px"}}>
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'10px',height:'40px',width:'100%',border:1,color:'#E8E8E8'}}>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px',color:'#000000'}}>
                            {tags[select].name}
                        </Typography>
                        <Typography sx={{fontFamily:'Pretendard Variable',fontWeight:'500',fontSize:'18px',color:'#9D9D9D'}}>
                            &nbsp;러닝화 보기
                        </Typography>
                    </Box>
                </Box>
                :
                ""
            }
        </Box>
    )
}