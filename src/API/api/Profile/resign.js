import axios from "axios";

export async function resignApi(session,number){

    try{
        const header = {
            headers: {
                "Authorization":`Bearer `+`${session}`
            }
        }
        const body ={
            "phonenumber":number,
        }
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/users/inquiry`,body,header);
        return response;
    }
    catch(error){
        return error
    }
}
