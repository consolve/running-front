import axios from "axios";

export async function reportApi(session,report){

    const {title,content,images} = report;

    try{
        const header = {
            headers: {
                "Authorization":`Bearer `+`${session}`
            }
        }
        const body ={
            title:title,
            content:content,
            images:images
        }
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/users/inquiry`,body,header);
        return response;
    }
    catch(error){
        return error
    }
}
