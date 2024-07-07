import { ContestBookMark } from "../API/api/Contest/contest_api";
import { runningShoesBookMark } from "../API/api/RunningShoes/shoes_api";
import { runningCrewBookMark } from "../API/api/RunningCrew/crew_api";
import { runningTalkBookMark } from "../API/api/RunningTalk/runningTalk_api";

const functionEnum = {
    "contest":ContestBookMark,
    "shoes":runningShoesBookMark,
    "crew":runningCrewBookMark,
    "community":runningTalkBookMark
}

export default async function BookMarkHandle(where,id,sessionid,navigate){

    if(sessionid){
        const response = await checkresponse(where,id,sessionid); 
        return response
    }
    else{
        navigate("/login/main")
    }
}

const checkresponse = async (where,id,sessionid)=>{
    const response  = await functionEnum[where](id,sessionid);
    
    if(response.response){
        return false;
    }
    return true;
}