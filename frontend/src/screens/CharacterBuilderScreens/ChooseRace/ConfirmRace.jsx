// import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PageIntro from '../../../components/PageIntro';
import PageList from '../../../components/PageList';
import Loader from '../../../components/Loader';

const ConfirmRace = ({
  isModal,
  selection,
  isLoading,
  selectedRace,
  register,
  onFormReady,
}) => {
  // const [raceSelection, setRaceSelection] = useState({});
  // console.log('is race:', isRace, 'selection:', selection);

  let raceSelection;

  if (!isModal) {
    raceSelection = selectedRace;
  } else {
    raceSelection = selection;
  }

  // useEffect(() => {
  //   if (!isModal) {
  //     setRaceSelection({ ...selectedRace });
  //   } else {
  //     setRaceSelection({ ...selection });
  //   }
  // }, [isModal]);

  return (
    <Container className={isModal ? 'modal-content' : 'overview-container'}>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <PageIntro
            isRace={true}
            isModal={isModal}
            selection={raceSelection}
            isLoading={isLoading}
            selectedRace={selectedRace}
          />

          <PageList
            isRace={true}
            isModal={isModal}
            selection={raceSelection}
            isLoading={isLoading}
            selectedRace={selectedRace}
            register={register}
            onFormReady={onFormReady}
          />
        </>
      )}
    </Container>
  );
};

export default ConfirmRace;
