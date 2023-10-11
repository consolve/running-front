import axios from "axios";
import { API_URL } from "../../URL";

export const fetchPopularTalk = async (count) =>{
    try{
        const response = await axios.get(`/api/runningtalk/popular/${count}`);
        return response.data.posts;   

    } catch(error){
        return error
    }
}

export const fetchRunnerTalkAll = async (query) =>{
    try{
        const response = await axios.get(`/api/runningtalk/post/all${query}`);
        return response.data.posts;   

    } catch(error){
        return error
    }
}

export const fetchRunnerTalkCategory = async () =>{
    try{
        const response = await axios.get(`/api/runningtalk/category`);
        return response.data.category;   

    } catch(error){
        return error
    }
}

export const fetchRunnerTalkCategoryPost = async (id,query="") =>{
    try{
        const response = await axios.get(`/api/runningtalk/post/${id}${query}`);
        return response.data.posts;   

    } catch(error){
        return error
    }
}