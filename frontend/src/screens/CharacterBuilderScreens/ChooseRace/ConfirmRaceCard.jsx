import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RaceCardIntro from './RaceCardIntro';
import RaceCardList from './RaceCardList';
import Loader from '../../../components/Loader';

const ConfirmRaceCard = ({ isModal, selection, isLoading, selectedRace }) => {
  const [raceData, setRaceData] = useState({});
  // console.log('in PageIntro -> selection:', selection);
  useEffect(() => {
    if (selectedRace?.name && !isModal) {
      console.log('in useEffect ', selectedRace);
      setRaceData({ ...selectedRace });
    } else {
      setRaceData({ ...selection });
    }
  }, [selectedRace]);

  return (
    <Container className={isModal ? 'modal-content' : 'overview-container'}>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <RaceCardIntro
            isModal={isModal}
            selection={raceData}
            isLoading={isLoading}
          />
          {/* SummaryList */}
          <Row className='full-width-row'>
            <Col className='full-width-col'>
              <div
                className={
                  isModal ? 'confirmation-summarylist' : 'selection-summarylist'
                }
              >
                <p>
                  Race Traits:
                  <span>
                    {selection.traitNames.length > 0
                      ? `${selection.traitNames.join(', ')}`
                      : null}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          <RaceCardList
            isModal={isModal}
            selection={selection}
            isLoading={isLoading}
          />
        </>
      )}
    </Container>
  );
};

export default ConfirmRaceCard;
