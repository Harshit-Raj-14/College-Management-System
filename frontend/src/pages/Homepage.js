import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import Students from "../assets/students.svg";

// Custom CSS directly in the file
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(145deg, #fcfcfc, #f0f0f0)',
    padding: '20px',
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
  },
  gridContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    background: '#fff'
  },
  imageContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    background: 'linear-gradient(135deg, #8a63e3 0%, #5b2c92 100%)'
  },
  image: {
    width: '100%',
    maxWidth: '500px',
    filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.15))',
    animation: 'float 5s ease-in-out infinite'
  },
  contentContainer: {
    padding: '3rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  },
  title: {
    fontSize: 'calc(2rem + 1vw)',
    fontWeight: '800',
    color: '#252525',
    marginBottom: '1.5rem',
    lineHeight: '1.2',
    position: 'relative'
  },
  titleHighlight: {
    color: '#7f56da'
  },
  description: {
    color: '#555',
    fontSize: '1.1rem',
    lineHeight: '1.7',
    marginBottom: '2rem'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto'
  },
  primaryButton: {
    background: '#7f56da',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    textTransform: 'none',
    fontSize: '1rem',
    width: '100%',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(127, 86, 218, 0.25)',
    border: 'none',
    cursor: 'pointer'
  },
  secondaryButton: {
    background: 'transparent',
    color: '#7f56da',
    padding: '11px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    textTransform: 'none',
    fontSize: '1rem',
    width: '100%',
    transition: 'all 0.3s ease',
    border: '2px solid #7f56da',
    cursor: 'pointer'
  },
  signupText: {
    textAlign: 'center',
    marginTop: '1.5rem',
    color: '#555'
  },
  link: {
    textDecoration: 'none',
    display: 'block',
    width: '100%'
  },
  signupLink: {
    color: '#550080',
    fontWeight: '600',
    textDecoration: 'none',
    borderBottom: '1px solid transparent',
    transition: 'all 0.2s ease',
    padding: '2px 0'
  },
  '@media (max-width: 768px)': {
    contentContainer: {
      padding: '2rem 1.5rem'
    },
    title: {
      fontSize: '2rem'
    }
  }
};

// Inject a small stylesheet for animations and responsive adjustments
const injectCSS = () => {
  const css = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    
    @media (max-width: 768px) {
      .contentContainer {
        padding: 2rem 1.5rem !important;
      }
      .title {
        font-size: 2rem !important;
      }
    }
    
    .primaryButton:hover {
      background: #6a46b8;
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(127, 86, 218, 0.35);
    }
    
    .secondaryButton:hover {
      background: rgba(127, 86, 218, 0.08);
      transform: translateY(-2px);
    }
    
    .signupLink:hover {
      border-bottom: 1px solid #550080;
    }
  `;
  
  const styleElement = document.createElement('style');
  styleElement.innerHTML = css;
  document.head.appendChild(styleElement);
  
  return () => {
    document.head.removeChild(styleElement);
  };
};

const Homepage = () => {
  React.useEffect(() => {
    const cleanup = injectCSS();
    return cleanup;
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.gridContainer}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <div style={styles.imageContainer}>
              <img 
                src={Students} 
                alt="students" 
                style={styles.image} 
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={styles.contentContainer} className="contentContainer">
              <h1 style={styles.title} className="title">
                Welcome to<br />
                <span style={styles.titleHighlight}>College Management</span><br />
                System
              </h1>
              <p style={styles.description}>
                Streamline College Management, class organization, and add students and faculty.
                Seamlessly track attendance, assess performance, and provide feedback.
                Access records, view marks, pay your fees and communicate effortlessly.
              </p>
              <div style={styles.buttonContainer}>
                <Link to="/choose" style={styles.link}>
                  <button 
                    style={styles.primaryButton} 
                    className="primaryButton"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/Adminregister" style={styles.link}>
                  <button 
                    style={styles.secondaryButton} 
                    className="secondaryButton"
                  >
                    Sign Up
                  </button>
                </Link>
                <p style={styles.signupText}>
                  {' '}
                  <Link to="/" style={styles.signupLink} className="signupLink">
                    
                  </Link>
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Homepage;