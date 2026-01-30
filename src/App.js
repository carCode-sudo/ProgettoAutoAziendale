import React from "react";
import {
  BrowserRouter,
  Route,Routes,
  Link
} from "react-router-dom";

import AutoList from "./components/AutoList";
import NotFound from "./components/NotFound";
import AddUtente from "./components/VerificaUtente";
import Registrazione from "./components/Registrazione";
import VerificaUtente from "./components/VerificaUtente";
import Affitta from "./components/Affitta";
import {useKeycloak} from "@react-keycloak/web";

function App() {


  const { keycloak, initialized } = useKeycloak();
  //if (!initialized) return <div>Loading...</div>;


  return (
    <BrowserRouter>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        {keycloak.authenticated ? (
            <>
              <span>Benvenuto {keycloak.tokenParsed?.preferred_username}</span>
                {console.log(keycloak.tokenParsed)}
              <button onClick={() => keycloak.logout()}>Logout</button>
            </>
        ) : (
            <button onClick={() => keycloak.login()}>Login</button>
        )}
      </nav>

      <div>
        <Routes>
          <Route exact path="/" element={<AutoList  />} />
          <Route exact path="/login" element={<VerificaUtente  />} />
            <Route exact path="/registrazione" element={<Registrazione/>} />

            <Route exact path="/registrazione" element={<Registrazione/>} />
          <Route exact path="/utente/get/:id" element={<Affitta/>} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App ;