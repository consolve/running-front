import {ReactComponent as AlarmIconOutlined} from '../../../Image/icon/AlarmIconOutlined.svg'
import {ReactComponent as AlarmIconActive} from '../../../Image/icon/AlarmIcon.svg'
import BookMarkHandle from '../../../Util/bookmark'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Bookmark({item}){
    const navigate = useNavigate();
    const sessionid = localStorage.getItem('sessionid');
    const [alarm,setAlarm] = useState(item.bookmarked)

    const onClickBookMark = (e) =>{
        e.stopPropagation();
        if(BookMarkHandle("contest",item.id,sessionid,navigate)){
            setAlarm(prev=>prev=!alarm);
            return;
        }
    }


    return(
        <IconButton onClick={(e)=>onClickBookMark(e)} sx={{p:0,position:'absolute',right:10,top:10,zIndex:999}}>
            {
                alarm?
                <AlarmIconActive style={{ color: '#6C57E5'}} width={21.46} height={21.46}/>
                :
                <AlarmIconOutlined width={21.46} height={21.46} />
            }
        </IconButton>
    )
}
