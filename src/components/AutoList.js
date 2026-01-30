import React, { useEffect } from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UtenteService from "../service/UtenteService"
import {Link} from "react-router-dom"
import {useLocation} from 'react-router-dom';

import {useNavigate} from 'react-router-dom';
import AutoService from "../service/AutoService";

const AutoList = () => {
  const location = useLocation();
  console.log("stampa dell utente ", location.state)
  const [autoList, setAutoList] = useState([]);

//  const history = useNavigate(`/utente/get/${employees.id}`,location.state)

  //const login = () => keycloak.login();
  //const logout = () => keycloak.logout();



  useEffect(() => {
    AutoService.getAll()
      .then(response => {
        console.log('print ', response.data);
        setAutoList(response.data);
      })
      .catch(error => {
        console.log('errore auto', error);
      })
  }, [])

  return (
    <>

      <div className="container">
        <h3>lista auto</h3>
        <h2>Utente </h2>
        <hr></hr>
        <div>
        <Link to="/login" className="btn btn-primary mb-2"> login</Link>
          <Link to="/registrazione" className="btn btn-success mb-2 ml-5  float-right"> logout</Link>

          <table border='1' cellPadding="10" 
          className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>marca</th>
                <th>nome</th>
                <th>seriale</th>
                <th>azioni</th>
              </tr>
            </thead>
            <tbody>
                {
                  autoList.map(autoList => (

                    <tr key={autoList.id}>
                      <td>{autoList.marca}</td>
                      <td>{autoList.nome}</td>
                      <td>{autoList.seriale}</td>
                      <td>
                        <Link className='btn btn-info'     state={location.state}   to={`/utente/get/${autoList.id}`} > affitta</Link>
                      </td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}
export default AutoList;





