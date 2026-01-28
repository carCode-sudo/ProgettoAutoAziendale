import {Toast} from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import UtenteService from "../service/UtenteService";
import { useParams } from "react-router"
import React, { useRef } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";      

const AddUtente = () => {
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [codiceFiscale, setCodiceFiscale] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const toast = useRef();


    

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'UTENTE ESEGUITO', detail: 'Utente registrato', life: 3000 });
    }

    const showWarn = () => {
        toast.current.show({ severity: 'error', summary: 'ERRORE', detail: 'errore utente gia registrato', life: 3000 });
    }




    const saveUtente = (e) => {




        e.preventDefault();

        const utente = { nome, cognome, codiceFiscale, id };

        if (id) {

            UtenteService.update(utente)
                .then(response => {
                    console.log('utente aggiontato con successo', response.data)

                    // navigate('/');
                })

        }
        else {
            UtenteService.addUtente(utente)

                .then(response => {
                    console.log('utente aggiunto con successo', response.data);

                    showSuccess();

                  
                    // navigate("/");

                })
                .catch(error => {
                    
                    showWarn()
                    console.log('errore inserimento/// utente', error);
                });
        }
    }


    useEffect(() => {

        if (id) {
           // console.log('verifica dellid',id)
            UtenteService.get(id)
                .then(utente => {
                    setNome(utente.data.nome);
                    setCognome(utente.data.cognome);
                    setCodiceFiscale(utente.data.codiceFiscale);
                    console.log('urente preso', utente);

                })
                .catch(error => {
                    console.log('errore ', error);
                });
        }
    }, [])





    return (
        <>
        <Toast ref={toast}/>
        <div className="container">
            
            <h3>Registrati</h3>
            <hr />
            <form>
                <div className="form-group">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control col-4"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder=" nome" />
                    </div>
                    <div className="form-group">

                        <input
                            type="text"
                            className="form-control col-4"
                            id="cognome"
                            value={cognome}
                            onChange={(e) => setCognome(e.target.value)}
                            placeholder="cognome" />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control col-4"
                            id="codiceFiscale"
                            value={codiceFiscale}
                            onChange={(e) => setCodiceFiscale(e.target.value)}
                            placeholder="codice fiscale" />
                    </div>




                </div>
                <div>

                    <button className="btn btn-primary" onClick={(e) => saveUtente(e)   } >salva</button>


        </div>
            </form >

            <hr />
            <Link to={"/"}>RITORNA ALLA HOME</Link>

        </div >

        </>
    );
    
}

export default AddUtente;



