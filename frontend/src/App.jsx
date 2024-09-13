import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { logout } from './slices/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <div id='app'>
      <ToastContainer />
      <Navbar />
      <main className='main'>
        <Container style={{ margin: '0 0', padding: '0 0' }} fluid>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
