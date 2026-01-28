import { Toast } from 'primereact/toast';


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import UtenteService from "../service/UtenteService";
import { useParams } from "react-router"
import React, { useRef } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import { useLocation } from 'react-router-dom';

var moment = require('moment');

let myDate;

myDate=moment().format("YYYY-MM-D")

const AddUtente = () => {

    const location = useLocation();

    console.log("stampa del componente ", location.state)
    console.log("stampa delLORA ", myDate)

    const [marca, setMarca] = useState('');
    const [modello, setModello] = useState('');
    const [seriale, setSeriale] = useState('');
    const [dataInizio, setDataInizio] = useState(myDate );
    const [DataFine, setDataFine] = useState( myDate);


    const navigate = useNavigate();

    const { id } = useParams();
    const toast = useRef();




    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'UTENTE ESEGUITO', detail: 'Utente registrato', life: 3000 });
    }

    const showWarn1 = () => {
        toast.current.show({ severity: 'error', summary: 'ERRORE', detail: 'data di inizio risulta precedente alla data corrente', life: 3000 });
    }
    const showWarn2 = () => {
        toast.current.show({ severity: 'error', summary: 'ERRORE', detail: 'data di fine antecendente alla data di oggi', life: 4000 });
    }




    const saveAuto = (e) => {

        e.preventDefault();

        const auto = { marca, modello, seriale, id, dataInizio, DataFine };



        console.log("stampa della data ", auto)


        if (id) {

            if (dataInizio <= myDate) {

                showWarn1();

                console.log("data <= a quella di oggi");


            }

             if(DataFine <= dataInizio){

                console.log("data di fine antecendente alla data di oggi")
                showWarn2();

            }

            
            if(dataInizio > myDate  && DataFine > dataInizio ){
                UtenteService.prenotazione(auto, location.state)

                    .then(response => {
                        console.log('utente aggiontato con successo', response.data)

                        // navigate('/');
                    })
                }
            
        }

    }


    useEffect(() => {

        if (id) {
            // console.log('verifica dellid',id)

            UtenteService.getAuto(id)
                .then(auto => {
                    setMarca(auto.data.marca);
                    setModello(auto.data.nome);
                    setSeriale(auto.data.seriale);


                    console.log('auto presa', auto);

                })
                .catch(error => {
                    console.log('errore ', error);
                });
        }
    }, [])





    return (
        <>
            <Toast ref={toast} />
            <div className="container">

                <h3>Affitta auto</h3>
                <hr />
                <form>
                    <div className="form-group">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control col-4"
                                id="marca"
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                                placeholder=" marca" />
                        </div>
                        <div className="form-group">

                            <input
                                type="text"
                                className="form-control col-4"
                                id="modello"
                                value={modello}
                                onChange={(e) => setModello(e.target.value)}
                                placeholder="modello" />
                        </div>
                        <div className="form-group">

                            <input
                                type="text"
                                className="form-control col-4"
                                id="seriale"
                                value={seriale}
                                onChange={(e) => setSeriale(e.target.value)}
                                placeholder="seriale" />
                        </div>

                        <div className="form-group">
                            <input
                                type="date"
                                className="form-control col-4"
                                id="codiceFiscale"
                                value={dataInizio}
                                onChange={(e) => setDataInizio(e.target.value)}
                                placeholder="Data-inizio" />
                        </div>
                        <div className="form-group">
                            <input
                                type="date"
                                className="form-control col-4"
                                id="codiceFiscale"
                                value={DataFine}
                                onChange={(e) => setDataFine(e.target.value)}
                                placeholder="Data-fine" />
                        </div>




                    </div>
                    <div>

                        <button className="btn btn-primary" onClick={(e) => saveAuto(e)} >salva</button>


                    </div>
                </form >

                <hr />
                <Link to={"/"}>RITORNA ALLA HOME</Link>

            </div >

        </>
    );

}

export default AddUtente;



