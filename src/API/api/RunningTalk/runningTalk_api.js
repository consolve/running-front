import axios from "axios";

export const fetchPopularTalk = async (count,session) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningtalk/popular/${count}`,header);
        return response.data.posts;   

    } catch(error){
        return error
    }
}

export const fetchRunnerTalkAll = async (query,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningtalk/post/all${query}`,header);
        return response.data.posts.reverse();   

    } catch(error){
        return error
    }
}

export const fetchRunnerTalkCategory = async () =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningtalk/category`);
        return response.data.category;   

    } catch(error){
        return error
    }
}

export const fetchRunnerTalkCategoryPost = async (id,session,query="") =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningtalk/post/${id}${query}`,header);
        return response.data.posts;   

    } catch(error){
        return error
    }
}

export const fetchRunnerTalkCPostDetail = async (id,session) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningtalk/detail/${id}`,header);
        return [response.data.post_detail[0],response.data.post_detail[1],response.data.post_detail[2]];   

    } catch(error){
        return error
    }
}

export const fetchRunnerTalkSearch = async (query,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningtalk/search${query}`,header);
        return response.data.post;   

    } catch(error){
        return error
    }
}

export const UpdateRunningTalkView = async (session,id) =>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningtalk/view`,
            {  
                "postId" : id
            }
            ,
            {
            headers:{
                    "Authorization":`Bearer `+`${session}`
                }
            }
        );
        return response.data.message;   

    } catch(error){
        return error
    }
}

export const FetchRunnerTalkPost = async (session,id=0,category,title,content,images = []) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const body = {
            "category": category,
            "title" : title,
            "content" : content,
            "images":images
        }

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningtalk/post`,body,header);
        return response.data.message;   

    } catch(error){
        return error
    }
}

export const runningTalkBookMark = async (id,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const body ={
                "postId":id
            }

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningtalk/bookmark`,body,header);
        return response;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const runningTalkLike = async (id,session) =>{
    try{
        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const body ={
                "postId":id
            }

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/runningtalk/like`,body,header);
        return response;   

    } catch(error){
        if(error.status === 409){
            return
        }
        return error
    }
}

export const FetchMyPost = async (session) =>{
    try{
        const header = {
            headers: {
                Authorization:'Bearer '+`${session}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningtalk/post`,header);
        return response.data.posts;   
    }
    catch(error){
        return error
    }
}

export const FetchMySavedPost = async (session) =>{
    try{
        const header = {
            headers: {
                Authorization:'Bearer '+`${session}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningtalk/bookmark`,header);
        return response.data.post;   
    }
    catch(error){
        return error
    }
}

export const DeletePost = async (session,id) => {
    try{
        const header = {
            headers: {
                Authorization:'Bearer '+`${session}`
            }
        }

        const response = await axios.delete(`${process.env.REACT_APP_URL}/api/runningtalk/post/${id}`,header);
        return response
    }
    catch(error){
        
        return error
    }
}

export const UpdatePost = async (session,id,category,title,content,images=[]) => {
    try{
        const header = {
            headers: {
                Authorization:'Bearer '+`${session}`
            }
        }

        const body = {
            "id":id,
            "category": category,
            "title" : title,
            "content" : content,
            "images":images
        }

        const response = await axios.put(`${process.env.REACT_APP_URL}/api/runningtalk/post`,body,header);
        return response
    }
    catch(error){
        return error
    }
}

export const checkWriter = async (session,id) => {

    try{
        const header = {
            headers: {
                Authorization:'Bearer '+`${session}`
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_URL}/api/runningtalk/post/${id}/check`,header);
        return response.data.message
    }
    catch(error){
        return error
    }
}