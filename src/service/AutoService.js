import httpClient from '../http-common';


const getAll =keycloak => {
    return httpClient.get('/auto/getAll',{
        headers: {
            'Authorization': `Bearer ${keycloak.token}`
        }});
}
const getAuto = id =>{
    return  httpClient.get(`/auto/get/${id}`);
}




export default {getAll, getAuto };