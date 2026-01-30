import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from "react-router-dom";
import AutoService from "../service/AutoService";

const AutoList = ({ keycloak }) => {

  const location = useLocation();
  const [autoList, setAutoList] = useState([]);
  const isAdmin = keycloak && keycloak.hasRealmRole('ADMIN');
    console.log('stampa ruolo', keycloak);


    useEffect(() => {
    // Carichiamo i dati solo se l'utente è admin (per risparmiare chiamate inutili)
    if (isAdmin) {
      AutoService.getAll()
          .then(response => {
            setAutoList(response.data);
          })
          .catch(error => {
            console.log('errore auto', error);
          });
    }
  }, [isAdmin]); // Riesegui se il ruolo cambia

  return (
      <div className="container">
        <h3>Pagina Home</h3>
        <hr />

        <div className="mb-3">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <button onClick={() => keycloak.logout()} className="btn btn-danger ms-2">Logout</button>
        </div>

        {/* RENDER CONDIZIONALE */}
        {isAdmin ? (
            <div>
              <h2>Lista Auto (Riservato Admin)</h2>
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                <tr>
                  <th>Marca</th>
                  <th>Nome</th>
                  <th>Seriale</th>
                  <th>Azioni</th>
                </tr>
                </thead>
                <tbody>
                {autoList.map(auto => (
                    <tr key={auto.id}>
                      <td>{auto.marca}</td>
                      <td>{auto.nome}</td>
                      <td>{auto.seriale}</td>
                      <td>
                        <Link className='btn btn-info' state={location.state} to={`/utente/get/${auto.id}`}>
                          Affitta
                        </Link>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        ) : (
            <div className="alert alert-warning">
              <strong>Attenzione:</strong> Non hai i permessi di Amministratore per visualizzare la lista delle auto.
            </div>
        )}
      </div>
  );
}

export default AutoList;