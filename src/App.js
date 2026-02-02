import React from "react";
import {
  BrowserRouter,
  Route,Routes,
  Link
} from "react-router-dom";
import Home from "./components/Home";

import AutoList from "./components/AutoList";
import NotFound from "./components/NotFound";
import AddUtente from "./components/VerificaUtente";
import Registrazione from "./components/Registrazione";
import VerificaUtente from "./components/VerificaUtente";
import Affitta from "./components/Affitta";
import {useKeycloak} from "@react-keycloak/web";
import AutoListNew from "./components/AutoListNew";
import Product from "./components/Product";

function App() {
    const { keycloak, initialized } = useKeycloak();
    if (!initialized) return <div>Loading...</div>;


    return (
        <BrowserRouter>
            <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                {keycloak.authenticated ? (
                    <>
                        <span>Benvenuto {keycloak.tokenParsed?.preferred_username} </span>
                        <button onClick={() => keycloak.logout({
                            redirectUri: window.location.origin + '/'})
                        }>Logout</button>
                    </>
                ) : (
                    <button onClick={() => keycloak.login({
                        redirectUri: window.location.origin + '/AutoListNew'})
                    }>Login</button>
                )}
            </nav>

            <div>
                <Routes>
                    {/* PASSA KEYCLOAK QUI */}


                    <Route exact path="/AutoList" element={<AutoList keycloak={keycloak} /> } />
                    <Route exact path="/AutoListNew" element={<AutoListNew keycloak={keycloak} /> } />

                    <Route exact path="/" element={<Home keycloak={keycloak} />} />
                    <Route exact path="/login" element={<VerificaUtente />} />
                    <Route exact path="/registrazione" element={<Registrazione/>} />
                    <Route exact path="/auto/get/:id" element={<Product/>} />
                    <Route exact path="*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App ;