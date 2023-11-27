import axios from "axios";


export const fetchUserImage = async (session,image) =>{
    try{

        const header = {
            headers: {
                Authorization:`Bearer `+`${session}`
            }
        }

        const body ={
            "image":image 
        }

        const response = await axios.post(`${process.env.REACT_APP_URL}/api/users/profile`,body,header);
        return response;   

    } catch(error){
        return error
    }
}
