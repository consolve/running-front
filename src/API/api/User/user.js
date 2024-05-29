import axios from "axios";

export const BlockUser = async (sessionid,data) =>{ 
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${sessionid}`
            }
        }

        const body = {
            "userId":data
        }

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/users/block`,body,header);
        return response;
    }
    catch(error){
        return error
    }
}