import { styled } from 'styled-components';

const NavLink = styled.a`
  text-decoration: none;
`;

const NavText = styled.div`
  box-sizing: border-box;
  color: #fff;
  height: 100%;
  font-size: 12px;
  max-width: 0;
  overflow: hidden;
  text-align: center;
  text-transform: uppercase;
  transition: all 0.2s;
`;

const NavIcon = styled.div`
  align-items: center;
  display: flex;
  height: 35px;
  justify-content: center;
  width: 35px;
  color: #fff;
`;

// top: 245px;
const ButtonContainerPrev = styled.div`
  top: 175px;
  width: 15%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0px;
  right: 50%;
`;

const ButtonContainerNext = styled.div`
  top: 175px;
  width: 15%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0px;
  left: 50%;
`;

// top: 245px;
const NavButton = styled.button`
  align-items: center;
  background-color: #1c9aef;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  opacity: 0.6;
  position: fixed;
  transition: all 0.2s;
  top: 245px;
  border: none;
  padding: 8px;

  &:hover,
  &:focus {
    border: none;
    opacity: 1;
  }
  &:hover ${NavText} {
    ${'' /* margin-left: 10px; */}
    max-width: 200px;
    font-family: 'Roboto Condensed';
    font-size: 16px;
  }
  &:hover ${NavIcon} {
    max-width: 200px;
  }
`;

const DisabledNavButton = styled(NavButton)`
  background-color: lightgrey;
  align-items: center;
  color: #777;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  opacity: 0.4;
  position: fixed;
  transition: all 0.2s;
  top: 245px;
  border: none;

  &:hover ${NavText} {
    color: #777;
  }

  &:hover,
  &:focus {
    border: none;
    opacity: 1;
  }
  &:hover ${NavText} {
    margin-right: 10px;
    max-width: 200px;
  }
  &:hover ${NavIcon} {
    max-width: 200px;
  }
`;

const Button = ({ step, icon, color, text, disabled, type, click }) => {
  return (
    <>
      {step === 'Prev' ? (
        <ButtonContainerPrev>
          {disabled ? (
            <DisabledNavButton type={type} disabled={true}>
              <NavIcon>
                <i className={icon} style={{ color: '#777' }} />
              </NavIcon>
              <NavText>{text}</NavText>
            </DisabledNavButton>
          ) : (
            <NavButton type={type} onClick={click}>
              <NavIcon>
                <i className={icon} style={{ color: color }}></i>
              </NavIcon>
              <NavText>{text}</NavText>
            </NavButton>
          )}
        </ButtonContainerPrev>
      ) : (
        <ButtonContainerNext>
          {disabled ? (
            <DisabledNavButton type={type} disabled={true}>
              <NavText>{text}</NavText>
              <NavIcon>
                <i className={icon} style={{ color: '#777' }}></i>
              </NavIcon>
            </DisabledNavButton>
          ) : (
            <NavButton type={type}>
              <NavText>{text}</NavText>
              <NavIcon>
                <i className={icon} style={{ color: color }}></i>
              </NavIcon>
            </NavButton>
          )}
        </ButtonContainerNext>
      )}
    </>
  );
};

export default Button;
