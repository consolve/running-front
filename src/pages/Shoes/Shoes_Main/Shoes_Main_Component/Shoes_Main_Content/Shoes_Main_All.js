import {Box,Grid,Typography,IconButton} from '@mui/material';
import React from "react";
import Feed from "../../../../../component/shoes/feed";


export default function AllShoes({list,shoesBookmark}){

    return(
        <Box sx={{width:"100%",mt:2,display:"flex",justifyContent:"center"}}>
        {
            list.length!=0?
            <Box sx={{width:"100%",px:'20px'}}>
                <Grid container spacing={'10px'} columns={16} >
                        {
                            list.map((item,index)=>{
                                return(
                                    <React.Fragment key = {index}>
                                    {
                                        <Grid item xs={8} key={item.id} sx={{display:'flex',justifyContent:'center'}}>
                                            <Feed data={{
                                                item:item,
                                                shoesBookmark:shoesBookmark,
                                            }}/>
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