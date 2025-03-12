import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

// Custom CSS styles using React inline style objects
const styles = {
  container: {
    background: 'linear-gradient(135deg, #411d70, #19118b)',
    minHeight: '120vh',
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
  },
  gridContainer: {
    marginTop: '2rem'
  },
  paper: {
    padding: '28px 20px',
    textAlign: 'center',
    backgroundColor: '#1f1f38',
    color: 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  iconBox: {
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease'
  },
  icon: {
    fontSize: '32px',
    color: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease'
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: '600',
    marginBottom: '14px',
    color: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease'
  },
  description: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.6)',
    transition: 'all 0.3s ease'
  },
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    zIndex: 9999
  },
  loadingText: {
    color: 'white',
    marginTop: '10px',
    fontSize: '1rem'
  }
};

// Additional CSS to be injected via useEffect
const injectCSS = () => {
  const css = `
    .user-card:hover {
      transform: translateY(-5px);
      background-color: #2c2c6c;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    }
    
    .user-card:hover .card-title {
      color: white;
    }
    
    .user-card:hover .card-description {
      color: rgba(255, 255, 255, 0.8);
    }
    
    .user-card:hover .card-icon-box {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .user-card:hover .card-icon {
      color: white;
    }
    
    .user-card:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #7928ca, #ff0080);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }
    
    .user-card:hover:before {
      transform: scaleX(1);
    }
    
    @media (max-width: 600px) {
      .grid-container {
        margin-top: 1rem;
      }
    }
  `;
  
  const styleElement = document.createElement('style');
  styleElement.innerHTML = css;
  document.head.appendChild(styleElement);
  
  return () => {
    document.head.removeChild(styleElement);
  };
};

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  // Inject custom CSS
  useEffect(() => {
    const cleanup = injectCSS();
    return cleanup;
  }, []);

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      }
      else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <div style={styles.container}>
      <Container>
        <Grid container spacing={3} justifyContent="center" style={styles.gridContainer} className="grid-container">
          <Grid item xs={12} sm={6} md={4}>
            <div 
              style={styles.paper} 
              className="user-card"
              onClick={() => navigateHandler("Admin")}
            >
              <Box style={styles.iconBox} className="card-icon-box">
                <AccountCircle style={styles.icon} className="card-icon" />
              </Box>
              <h2 style={styles.title} className="card-title">
                Admin
              </h2>
              <div style={styles.description} className="card-description">
                Login as an administrator to access the dashboard to manage app data.
              </div>
            </div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <div 
              style={styles.paper} 
              className="user-card"
              onClick={() => navigateHandler("Student")}
            >
              <Box style={styles.iconBox} className="card-icon-box">
                <School style={styles.icon} className="card-icon" />
              </Box>
              <h2 style={styles.title} className="card-title">
                Student
              </h2>
              <div style={styles.description} className="card-description">
                Login as a student to explore course materials and assignments.
              </div>
            </div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <div 
              style={styles.paper} 
              className="user-card"
              onClick={() => navigateHandler("Teacher")}
            >
              <Box style={styles.iconBox} className="card-icon-box">
                <Group style={styles.icon} className="card-icon" />
              </Box>
              <h2 style={styles.title} className="card-title">
                Teacher
              </h2>
              <div style={styles.description} className="card-description">
                Login as a teacher to create courses, assignments, and track student progress.
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: 9999 }}
        open={loader}
        style={styles.backdrop}
      >
        <CircularProgress color="inherit" size={50} />
        <div style={styles.loadingText}>Please Wait</div>
      </Backdrop>
      
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default ChooseUser;