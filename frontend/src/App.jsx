import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { logout } from './slices/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [backgroundClassname, setBackgroundClassname] = useState('main-bg');
  const pathname = location.pathname;

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (pathname !== '/') {
      setBackgroundClassname('main-builder-bg');
    } else {
      setBackgroundClassname('main-bg');
    }
  }, [pathname]);

  return (
    <div id='app'>
      <ToastContainer />
      <Navbar />
      <main className={backgroundClassname}>
        <Container style={{ margin: '0 0', padding: '0 0' }} fluid>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
