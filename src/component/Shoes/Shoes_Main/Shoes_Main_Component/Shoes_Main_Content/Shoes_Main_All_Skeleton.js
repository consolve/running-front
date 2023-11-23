import {Box,Grid,Typography,IconButton,Skeleton} from '@mui/material';
import React from "react";

export default function AllShoes({}){

    const list = [1,2,3,4,5,6,7,8,9,10];

    return(
        <Box sx={{width:"100%",mt:2,display:"flex",justifyContent:"center"}}>
        {
            list.length!=0?
            <Box sx={{width:"100%",px:'20px'}}>
                <Grid container spacing={1} columns={16} >
                        {
                            list.map((item,index)=>{
                                return(
                                    <React.Fragment key = {index}>
                                    {
                                        <Grid item xs={8} sx={{display:'flex',justifyContent:'center'}}>
                                            <Skeleton variant="rectangular" width={'100%'} height={"240px"} sx={{mt:1,borderRadius:2}}/>  
                                        </Grid>
                                    }
                                    </React.Fragment>
                                )
                            })
                        }
                </Grid>
            </Box>
            :
            ""
        }
        </Box>   
    )
}