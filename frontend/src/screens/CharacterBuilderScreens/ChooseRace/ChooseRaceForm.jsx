import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PageIntro from '../../../components/PageIntro';
import PageList from '../../../components/PageList';
import Loader from '../../../components/Loader';
import { parseRaceData } from '../../../utility/parseRaceData';

const ChooseRaceForm = ({ selection, isLoading, selectedRace }) => {
  // console.log('is race:', isRace, 'selection:', selection);
  let raceSelection;
  if (!isLoading && !selectedRace) {
    raceSelection = parseRaceData(selection);
    console.log('in chooseRaceForm:', raceSelection);
  }

  return (
    <Container className='overview-container'>
      {isLoading ? <Loader></Loader> : <form>FINAL CHOOSE RACE</form>}
    </Container>
  );
};

export default ChooseRaceForm;
