import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import AutoService from "../service/AutoService";
import { motion, AnimatePresence } from "framer-motion";

const AutoList = ({ keycloak }) => {
    const [autoList, setAutoList] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isAdmin = keycloak && keycloak.hasRealmRole('ADMIN');

    useEffect(() => {
        if (isAdmin) {
            AutoService.getAll(keycloak)
                .then(res => setAutoList(res.data), console.log(keycloak.token))
                .catch(err => console.log(err));
        }
    }, [isAdmin, keycloak]);


    const containerVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.1 }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>

            {/* SIDEBAR ANIMATA */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: sidebarOpen ? 280 : 80 }}
                transition={{ duration: 0.6, ease: "anticipate" }}
                style={styles.sidebar}
            >
                <div className="p-4">
                    <motion.h4
                        animate={{ opacity: sidebarOpen ? 1 : 0 }}
                        style={styles.sidebarTitle}
                    >
                        DRIVE PANEL
                    </motion.h4>
                    <hr style={{ color: 'rgba(255,255,255,0.2)' }} />

                    <div className="mt-4">
                        <SidebarItem icon="bi-grid-1x2-fill" label="Dashboard" active />
                        <SidebarItem icon="bi-car-front" label="Lista Auto" />
                        <SidebarItem icon="bi-person-badge" label="Profilo" />
                    </div>
                </div>

                <div className="p-4 mt-auto">
                    <button onClick={() =>keycloak.logout({
                        redirectUri: window.location.origin + '/'})
                    } className="btn btn-outline-light w-100 rounded-pill">
                        {sidebarOpen ? 'Esci Sessione' : <i className="bi bi-box-arrow-left"></i>}
                    </button>
                </div>
            </motion.div>

            {/* CONTENUTO PRINCIPALE */}
            <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <header className="mb-5 d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="fw-bold">Gestione Flotta</h1>
                            <p className="text-muted">Benvenuto, {keycloak.tokenParsed?.preferred_username}</p>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="btn btn-white shadow-sm rounded-circle"
                        >
                            <i className={`bi ${sidebarOpen ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i>
                        </button>
                    </header>

                    {isAdmin ? (
                        <motion.div style={styles.tableWrapper}>
                            <table className="table table-borderless align-middle m-0">
                                <thead style={{ backgroundColor: '#f1f5f9' }}>
                                <tr>
                                    <th className="p-3">MARCA</th>
                                    <th className="p-3">MODELLO</th>
                                    <th className="p-3">SERIALE</th>
                                    <th className="p-3 text-center">STATO</th>
                                </tr>
                                </thead>
                                <tbody>
                                {autoList.map((auto, index) => (
                                    <motion.tr key={auto.id} variants={rowVariants} style={styles.tableRow}>
                                        <td className="p-3 fw-bold">{auto.marca}</td>
                                        <td className="p-3">{auto.nome}</td>
                                        <td className="p-3">
                                            <span className="badge bg-light text-dark border">{auto.seriale}</span>
                                        </td>
                                        <td className="p-3 text-center">
                                            <Link to={`/auto/get/${auto.id}`} className="btn btn-primary btn-sm rounded-pill px-4">
                                                Dettagli
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                                </tbody>
                            </table>
                        </motion.div>
                    ) : (
                        <div className="alert alert-info rounded-4 p-5 text-center">
                            <i className="bi bi-lock-fill display-1"></i>
                            <h2 className="mt-3">Area Protetta</h2>
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
};

// Componente Helper per gli item della Sidebar
const SidebarItem = ({ icon, label, active }) => (
    <motion.div
        whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.1)' }}
        style={{ ...styles.sidebarItem, backgroundColor: active ? '#3b82f6' : 'transparent' }}
    >
        <i className={`bi ${icon} me-3`}></i>
        <span>{label}</span>
    </motion.div>
);

const styles = {
    sidebar: {
        backgroundColor: '#0f172a',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
    },
    sidebarTitle: {
        fontSize: '1.2rem',
        fontWeight: '800',
        letterSpacing: '2px',
        whiteSpace: 'nowrap'
    },
    sidebarItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 20px',
        borderRadius: '12px',
        cursor: 'pointer',
        marginBottom: '8px',
        transition: 'background 0.3s',
        whiteSpace: 'nowrap'
    },
    tableWrapper: {
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        overflow: 'hidden'
    },
    tableRow: {
        borderBottom: '1px solid #f1f5f9',
        transition: 'all 0.3s'
    }
};

export default AutoList;