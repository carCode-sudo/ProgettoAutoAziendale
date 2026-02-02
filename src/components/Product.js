import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AutoService from "../service/AutoService";
import keycloak from "../auth/Keycloak";
import toast from "./Toast";
import axios from "axios";

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [auto, setAuto] = useState(null);
    const [dataInizio, setDataInizio] = useState('');
    const [dataFine, setDataFine] = useState('');
    const [caricamento, setCaricamento] = useState(false);



    useEffect(() => {
        AutoService.getById(id,keycloak)
            .then(res => setAuto(res.data))
            .catch(err => console.error("Errore recupero auto", err, id));
    }, [id]);

    if (!auto) return <div className="text-white text-center mt-5">Caricamento...</div>;

    const handlePrenotazione = async () => {
        if (!dataInizio || !dataFine) {
            toast.error("Per favore, seleziona entrambe le date.");
            return;
        }
        setCaricamento(true);
        const prenotazione = {
            auto: { seriale: auto.seriale },
            dataInizio: dataInizio,
            dataFine: dataFine
        };

        try {
            await axios.post('http://localhost:8080/api/prenotazioni/crea', prenotazione, {
                headers: { Authorization: `Bearer ${keycloak.token}` }
            });
            toast.success("Prenotazione effettuata con successo!");
            navigate('/'); // Reindirizza l'utente
        } catch (err) {
            const msg = err.response?.data || "Errore: l'auto è già occupata in queste date.";
            toast.error(msg);
        } finally {
            setCaricamento(false);
        }
    };





    return (
        <div style={styles.pageWrapper}>
            <div className="container">
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => navigate('/AutoListNew')}
                    style={styles.backBtn}
                >
                    <i className="bi bi-arrow-left me-2"></i> Torna alla lista
                </motion.button>

                <div className="row align-items-center" style={{ minHeight: '80vh' }}>

                    {/* COLONNA SINISTRA: Immagine e Badge */}
                    <div className="col-lg-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: -50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span style={styles.categoryBadge}>Premium Fleet</span>
                            <h1 style={styles.mainTitle}>{auto.marca}</h1>
                            <h2 style={styles.subTitle}>{auto.nome}</h2>

                            <div style={styles.imageContainer}>
                                <img
                                    src={`https://source.unsplash.com/800x600/?car,${auto.marca}`}
                                    alt={auto.nome}
                                    style={styles.carImage}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* COLONNA DESTRA: Info Card */}
                    <div className="col-lg-5 offset-lg-1">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={styles.detailsCard}
                        >
                            <h4 className="mb-4 fw-bold">Specifiche Veicolo</h4>

                            <div style={styles.infoRow}>
                                <span className="text-secondary">Codice Seriale</span>
                                <span className="fw-bold text-primary">{auto.seriale}</span>
                            </div>

                            <div style={styles.infoRow}>
                                <span className="text-secondary">Stato</span>
                                <span className="badge bg-success-subtle text-success rounded-pill px-3">Disponibile</span>
                            </div>

                            <div style={styles.infoRow}>
                                <span className="text-secondary">Assicurazione</span>
                                <span className="fw-bold">Kasko Inclusa</span>
                            </div>

                            <hr className="my-4" style={{ opacity: 0.1 }} />

                            <p className="text-muted small mb-4">
                                Prenotando questo veicolo accetti il regolamento aziendale sulla flotta.
                                Il veicolo dovrà essere riconsegnato con il pieno di carburante.
                            </p>
                            <div className="mt-4">
                                <h5 className="mb-3" style={{fontSize: '0.9rem', color: '#3b82f6', textTransform: 'uppercase'}}>Scegli il periodo</h5>
                                <div style={styles.dateGroup}>
                                    <div style={styles.dateInputWrapper}>
                                        <label style={styles.label}>Ritiro</label>
                                        <input
                                            type="date"
                                            style={styles.dateInput}
                                            onChange={(e) => setDataInizio(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div style={styles.dateInputWrapper}>
                                        <label style={styles.label}>Consegna</label>
                                        <input
                                            type="date"
                                            style={styles.dateInput}
                                            onChange={(e) => setDataFine(e.target.value)}
                                            min={dataInizio || new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" style={{ opacity: 0.1 }} />

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                style={{...styles.rentBtn, opacity: caricamento ? 0.7 : 1}}
                                onClick={handlePrenotazione}
                                disabled={caricamento}
                            >
                                {caricamento ? 'Elaborazione...' : 'Conferma Prenotazione'}
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
        color: 'white',
        paddingTop: '40px',
        overflowX: 'hidden'
    },
    backBtn: {
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
        padding: '8px 20px',
        borderRadius: '100px',
        marginBottom: '20px'
    },
    categoryBadge: {
        color: '#3b82f6',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        fontSize: '0.8rem',
        fontWeight: 'bold'
    },
    mainTitle: {
        fontSize: '5rem',
        fontWeight: '900',
        lineHeight: '1',
        margin: '10px 0'
    },
    subTitle: {
        fontSize: '2rem',
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '300'
    },
    imageContainer: {
        marginTop: '40px',
        position: 'relative'
    },
    carImage: {
        width: '100%',
        borderRadius: '24px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
        transform: 'rotate(-2deg)'
    },
    detailsCard: {
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '40px',
        borderRadius: '32px',
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px 0',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
    },
    rentBtn: {
        width: '100%',
        background: '#3b82f6',
        color: 'white',
        border: 'none',
        padding: '16px',
        borderRadius: '16px',
        fontSize: '1.1rem',
        fontWeight: '700',
        boxShadow: '0 10px 25px rgba(59,130,246,0.4)'
    },
    dateGroup: {
        display: 'flex',
        gap: '15px',
        marginBottom: '20px'
    },
    dateInputWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.5)',
        marginBottom: '5px',
        marginLeft: '5px'
    },
    dateInput: {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        color: 'white',
        padding: '10px',
        outline: 'none',
        fontSize: '0.9rem'
    }
};

export default Product;