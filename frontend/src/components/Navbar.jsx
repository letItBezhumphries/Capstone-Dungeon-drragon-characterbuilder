import { styled } from 'styled-components';
import * as pallete from '../constants/variables';
import { LinkContainer } from 'react-router-bootstrap';
import { FaUser } from 'react-icons/fa';
import { NavDropdown, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../services/backend';
import { logout } from '../slices/authSlice';

const Navigation = styled.nav`
  width: 100%;
  background-color: ${pallete.COLOR_RAISIN_BLACK};
  color: ${pallete.COLOR_DAVYS_GRAY};
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 120px;

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
    color: ${pallete.COLOR_BURNT_SIENNA};
    white-space: nowrap;
  }

  & a:hover {
    text-decoration: none;
    color: ${pallete.COLOR_BURNT_SIENNA};
    white-space: nowrap;
  }

  & .dropdown-toggle.show.nav-link {
    text-decoration: none;
    color: ${pallete.COLOR_BURNT_SIENNA};
  }

  & .dropdown-toggle.show.nav-link:hover {
    color: lightpink;
  }
`;

const NavHeader = styled.h2`
  margin-left: 30px;
  font-size: 20px;
  padding: 0px 0px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavLink = styled.li`
  & a {
    text-decoration: none;
    color: ${pallete.COLOR_BURNT_SIENNA};
  }

  & a:hover {
    color: lightpink;
  }
`;

const Divider = styled(NavDropdown.Divider)`
  height: 0;
  margin: 0.5rem 0;
  overflow: hidden;
  border-top: 1.2px solid black;
`;

// using & you need both classes with no space between them to work
/*
nav-item show dropdown
*/
const NaviDropDown = styled(NavDropdown)`
  a:after {
    margin-left: 8px;
  }

  & .dropdown-menu.show {
    background-color: ${pallete.COLOR_RED_MUNSELL};
    box-shadow: 2px 3px 8px black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .dropdown-item {
      display: block;
      width: 80%;
      padding: 0.25rem 1rem;
      clear: both;
      font-weight: 400;
      color: #1a1a1a;
      text-align: center;
      white-space: nowrap;
      background-color: transparent;
      border: 0;
    }

    & .dropdown-item:hover {
      background-color: pink;
    }
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
          D<i className='fa-brands fa-d-and-d fa-2xl'></i>D Dungeon Builder
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
            <NaviDropDown title={userInfo.name} id='userlinks'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/login'>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </LinkContainer>
            </NaviDropDown>
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
