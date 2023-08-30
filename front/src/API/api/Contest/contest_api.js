import axios from "axios";

export const fetchMonthContest = async (count) =>{
    try{
        const response = await axios.get(`/api/contest/month/${count}`);
        return response.data.month_contest;   

    } catch(error){
        return error
    }
}

export const fetchAcceptableContest = async (count) =>{
    try{
        const response = await axios.get(`/api/contest/acceptable/${count}`);
        return response.data.acceptable_contest;   
    } catch(error){
        return error
    }
}

export const fetchCalendarContest = async () =>{
    try{
        const response = await axios.get(`/api/contest/calendar`);
        return response.data.calendar;   

    } catch(error){
        return error
    }
}

export const fetchPopularContest = async (count) =>{
    try{
        const response = await axios.get(`/api/contest/popular/${count}`);
        return response.data.contest;   

    } catch(error){
        return error
    }
}

export const fetchContestDetail = async (id) =>{
    try{
        const response = await axios.get(`/api/contest/detail/${id}`);
        return response.data.contest;   

    } catch(error){
        return error
    }
}

export const fetchSearchContest = async (query) =>{
    try{
        const response = await axios.get(`/api/contest/search${query}`);
        return response.data.contest;   

    } catch(error){
        return error
    }
}