import { styled } from 'styled-components';

const SpellIcon = styled.div`
  ${'' /* background-image: url('${(props) => props.background}'); */}
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 32px;
  margin-right: 5px;
  width: 32px;
`;

const SpellSchoolIcon = ({ school }) => {
  let imgsrc = `/src/assets/spells/${school.toLowerCase()}.png`;
  // return <SpellIcon background={imgsrc} />;
  return <SpellIcon style={{ backgroundImage: `url(${imgsrc})` }} />;
};

export default SpellSchoolIcon;
