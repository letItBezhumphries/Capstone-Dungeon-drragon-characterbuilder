import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { FaUser } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../services/backend';
import { logout } from '../slices/authSlice';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    console.log('logout');
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className='navbar'>
      <h2 className='nav-header' style={{ marginLeft: '30px' }}>
        <Link to='/'>D&D Dungeon Builder</Link>
      </h2>
      <ul>
        <li className='nav-link monsters-link'>
          <Link to='/monsters'>Monsters</Link>
        </li>
        {userInfo ? (
          <>
            <li className='nav-link characters-link'>
              <Link to='/character'>Build Character</Link>
            </li>
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <Nav.Link as={Link} to='/login' className='nav-link'>
            <FaUser /> Sign In
          </Nav.Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
