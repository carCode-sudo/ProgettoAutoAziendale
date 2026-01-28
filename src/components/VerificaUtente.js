import {Toast} from 'primereact/toast';


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import UtenteService from "../service/UtenteService";
import { useParams } from "react-router"
import React, { useRef } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";      

const VerificaUtente = () => {

    const [nome, setNome] = useState('');
    const [codiceFiscale, setCodiceFiscale] = useState('');
    const navigate = useNavigate(" ", []);
    const toast = useRef();

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'UTENTE ESEGUITO', detail: 'Utente registrato', life: 3000 });
    }
    const showWarn = () => {
        toast.current.show({ severity: 'error', summary: 'ERRORE', detail: 'errore utente gia registrato', life: 3000 });
    }
    const verifica = (e) => {

        e.preventDefault();

        const utente = { nome, codiceFiscale };
            UtenteService.verifica(utente)
                .then(response => {
                    console.log('rispostaa5', response.status);
                    showSuccess()
                        console.log("stampa utente " ,utente)
                  
                     navigate('/' , {state:utente});
                })
                .catch(error => {
                    showWarn()
                    console.log('errore inserimento/// utente', error);
                });
    }
    return (
        <>
        <Toast ref={toast}/>
        <div className="container">
            <h3>Login</h3>
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
                            id="codiceFiscale"
                            value={codiceFiscale}
                            onChange={(e) => setCodiceFiscale(e.target.value)}
                            placeholder="codice fiscale" />
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={(e) => verifica(e)   } >entra</button>
        </div>
            </form >
            <hr />
            <Link to={"/"}>RITORNA ALLA HOME</Link>
        </div >
        </>
    );
}
export default VerificaUtente;



