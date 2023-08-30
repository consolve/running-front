import axios from "axios";

export const fetchPopularShoes = async (count) =>{
    try{
        const response = await axios.get(`/api/runningshoes/popular/${count}`);
        return response.data.shoes;   

    } catch(error){
        return error
    }
}

export const fetchShoesDetail = async (id) =>{
    try{
        const response = await axios.get(`/api/runningshoes/detail/${id}`);
        return response.data.shoes;   

    } catch(error){
        return error
    }
}

export const fetchBrandShoes = async (brand) =>{
    try{
        const response = await axios.get(`/api/runningshoes/brand/${brand}`);
        return response.data.shoes;   

    } catch(error){
        return error
    }
}

export const fetchFeatureShoes = async (feature) =>{
    const request = feature.map((url) => axios.get(`/api/runningshoes/feature/${url}`));


    try{
        const response = await axios.all(request);
        return response;   
    } catch(error){
        return error
    }
}

export const fetchFeatureTag = async () =>{
    try{
        const response = await axios.get(`/api/runningshoes/feature-tag`);
        return response.data.tag;   

    } catch(error){
        return error
    }
}

export const fetchBrandTag = async () =>{
    try{
        const response = await axios.get(`/api/runningshoes/brand-tag`);
        return response.data.tag;   

    } catch(error){
        return error
    }
}

export const fetchSearchShoes = async (query) =>{
    try{
        const response = await axios.get(`/api/runnin1gshoes/search${query}`);
        return response.data.shoes;   

    } catch(error){
        return error
    }
}