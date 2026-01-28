import httpClient from '../http-common';
const getAll = () => {
    return httpClient.get('/auto/getAll');
}
const getAuto = id =>{
    return  httpClient.get(`/auto/get/${id}`);
}



export default {getAll, getAuto };