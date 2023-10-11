import axios from "axios";
import { API_URL } from "../../URL";

export const fetchCrewAll = async (query,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const response = await axios.get(`/api/runningcrew/all${query}`,header);
        return response.data.crew;   

    } catch(error){
        return error
    }
}

export const fetchCrewLocation = async (value,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }
        const response = await axios.get(`/api/runningcrew/${value}`,header);
        return response.data.crew;   

    } catch(error){
        return error
    }
}

export const fetchCrewDetail = async (id) =>{
    try{
        const response = await axios.get(`/api/runningcrew/detail/${id}`);
        return response.data.crew;   

    } catch(error){
        return error
    }
}

export const runningCrewBookMark = async (id,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const body ={
                "postId":id
            }
        const response = await axios.post(`/api/runningcrew/bookmark`,body,header);
        return response;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}