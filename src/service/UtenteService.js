import AutoList from '../components/AutoList';
import httpClient from '../http-common';

const addUtente = (utente) =>{
return    httpClient.post("/utente/add", utente);
}

const getUtente = id =>{
  return  httpClient.get(`/utente/get/${id}`);
}

const update = (data) =>{

return httpClient.patch('/utente/update',data);

}

const verifica = (data) =>{

  return httpClient.post('/utente/verificaUtente',data);
}

const prenotazione = (auto,utente) =>{

  return httpClient.put('/prenotazione/inserimento',auto,utente);
}



export default { prenotazione, getUtente, update , addUtente,verifica};