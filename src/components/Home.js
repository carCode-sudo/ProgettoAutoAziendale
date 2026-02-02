import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // La libreria magica

const Home = () => {
    const { keycloak, initialized } = useKeycloak();
    const navigate = useNavigate();

    useEffect(() => {
        if (initialized && keycloak.authenticated) {
            navigate('/AutoListNew');
        }
    }, [initialized, keycloak.authenticated, navigate]);

    return (
        <div style={styles.container}>
            {/* Sfondo Animato */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                style={styles.blob}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={styles.card}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
                    style={styles.iconBox}
                >
                    <i className="bi bi-speedometer2" style={{ fontSize: '2.5rem', color: '#fff' }}></i>
                </motion.div>

                <h1 style={styles.title}>Drive<span style={{color: '#3b82f6'}}>Corporate</span></h1>

                <p style={styles.text}>
                    Gestisci la tua flotta aziendale con la massima semplicità.
                    Accedi in sicurezza e prenota il tuo prossimo viaggio.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => keycloak.login({ redirectUri: window.location.origin + '/AutoListNew' })}
                    style={styles.button}
                >
                    Inizia l'Esperienza
                </motion.button>

                <div style={styles.footer}>
                    <span><i className="bi bi-shield-lock-fill"></i> Secured by Keycloak</span>
                </div>
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        backgroundColor: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        color: '#fff'
    },
    blob: {
        position: 'absolute',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 0
    },
    card: {
        zIndex: 1,
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        padding: '3rem',
        borderRadius: '30px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
    },
    iconBox: {
        marginBottom: '1.5rem',
        display: 'inline-block',
        padding: '1rem',
        background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
        borderRadius: '20px'
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: '900',
        marginBottom: '1rem',
        letterSpacing: '-2px'
    },
    text: {
        fontSize: '1.1rem',
        color: '#9ca3af',
        lineHeight: '1.6',
        marginBottom: '2rem'
    },
    button: {
        padding: '1rem 3rem',
        fontSize: '1.2rem',
        fontWeight: '700',
        color: '#fff',
        background: '#3b82f6',
        border: 'none',
        borderRadius: '15px',
        cursor: 'pointer',
        boxShadow: '0 10px 20px rgba(59,130,246,0.3)'
    },
    footer: {
        marginTop: '2rem',
        fontSize: '0.8rem',
        color: '#4b5563',
        textTransform: 'uppercase',
        letterSpacing: '2px'
    }
};

export default Home;