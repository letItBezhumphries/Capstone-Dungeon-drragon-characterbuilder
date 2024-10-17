import { styled } from 'styled-components';
import * as pallete from '../constants/variables';
import { LinkContainer } from 'react-router-bootstrap';
import { FaUser } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../services/backend';
import { logout } from '../slices/authSlice';

const Navigation = styled.nav`
  width: 100%;
  height: 15%;
  color: ${pallete.COLOR_DAVYS_GRAY};
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  min-height: 128px;

  & ul {
    list-style-type: none;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    margin-right: 60px;
    max-width: 60%;
  }

  & a {
    text-decoration: none;
    color: ${pallete.COLOR_DAVYS_GRAY};
  }

  & a:hover {
    text-decoration: none;
  }
`;

const NavHeader = styled.h2`
  margin-left: 30px;
  font-size: 20px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavLink = styled.li`
  & a {
    text-decoration: none;
    color: ${pallete.COLOR_DAVYS_GRAY};
  }

  & a:hover {
    color: lightpink;
  }
`;

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
    <Navigation>
      <NavHeader>
        <Link to='/'>
          <i className='fa-brands fa-d-and-d fa-2xl'></i>
          D&D Dungeon Builder
        </Link>
      </NavHeader>
      <ul>
        <NavLink>
          <Link to='/monsters'>Monsters</Link>
        </NavLink>
        {userInfo ? (
          <>
            <NavLink>
              <Link to='/character'>Build Character</Link>
            </NavLink>
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
    </Navigation>
  );
};

export default Navbar;
