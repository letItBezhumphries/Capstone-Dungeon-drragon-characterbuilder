import Container from 'react-bootstrap/Container';
import ModalSelectionIntro from '../../../components/ModalSelectionIntro';
import ModalSelectionList from '../../../components/ModalSelectionList';
import Loader from '../../../components/Loader';

const ConfirmRace = ({
  isModal,
  selection,
  isLoading,
  race,
  register,
  onFormReady,
}) => {
  let raceSelection;

  if (!isModal) {
    raceSelection = race;
  } else {
    raceSelection = selection;
  }
  // console.log(
  //   `ConfirmRace - in Modal = ${isModal} selection:`,
  //   selection,
  //   '\nrace:',
  //   race
  // );

  return (
    <Container className={isModal ? 'modal-content' : 'overview-container'}>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <ModalSelectionIntro isModal={isModal} selection={raceSelection} />
          <ModalSelectionList
            isModal={isModal}
            selection={raceSelection}
            register={register}
          />
        </>
      )}
    </Container>
  );
};

export default ConfirmRace;
