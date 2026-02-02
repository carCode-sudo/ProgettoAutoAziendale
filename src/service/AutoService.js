import httpClient from '../http-common';


const getAll =keycloak => {
    return httpClient.get('/auto/getAll',{
        headers: {
            'Authorization': `Bearer ${keycloak.token}`
        }});
}
const getAuto = (id,keycloak) =>{
    return  httpClient.get(`/auto/get/${id}`, {
        headers : {
            'Authorization': `Bearer ${keycloak.token}`
        }});
}

const getById = (id,keycloak) =>{
    return  httpClient.get(`/auto/get/${id}`, {
        headers : {
            'Authorization': `Bearer ${keycloak.token}`
        }});
}




export default {getAll, getAuto , getById};