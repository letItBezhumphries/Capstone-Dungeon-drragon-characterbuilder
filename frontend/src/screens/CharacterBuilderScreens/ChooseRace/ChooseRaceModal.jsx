import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useGetDataForRaceQuery } from '../../../services/races';
import { Container } from 'react-bootstrap';
import { parseRaceData } from '../../../utility/parseRaceData';
import Loader from '../../../components/Loader';
import {
  setFilteredRace,
  raceAdded,
} from '../../../slices/characterBuilderSlice';
import ModalSelectionIntro from '../../../components/ModalSelectionIntro';
import ModalSelectionList from '../../../components/ModalSelectionList';
import '../../../components/ConfirmationModal.css';

function ChooseRaceModal({
  show,
  onHide,
  handleClose,
  selection,
  onSelectionConfirm,
  onSelectionCancel,
  register,
}) {
  const dispatch = useDispatch();

  // console.log('ConfirmRace in Modal = true:', selection);

  const { data, isLoading, error } = useGetDataForRaceQuery(selection.index);

  /* 
    eventhandler that is fired when user clicks the confirm button in RaceModal 
    which 1. will parse the result of the rtk hook with the selected race passed to it.
    2. dispatch the setFilteredRace action to update the character slice state
    3. invokes the eventhandler passed down from parent ChooseRaceScreen component 
    onSelectionConfirmation and passes in the parsed data as an argument
  */
  const handleSelectionClick = () => {
    /* ! ALSO NEED to add redux action here to store selection in state */
    console.log('race data from api:', data);

    const raceData = parseRaceData({ ...selection, ...data });

    // console.log(
    //   'ChooseRaceModal.jsx - click event handler - raceData:',
    //   raceData
    // );

    // set filtered race in state
    dispatch(setFilteredRace(raceData));

    dispatch(raceAdded(raceData));

    onSelectionConfirm(raceData);
  };

  const handleCancelClick = () => {
    onSelectionCancel();
  };

  return (
    <>
      {!isLoading && show ? (
        <Modal
          backdrop='static'
          backdropClassName={'confirmation-backdrop'}
          keyboard={false}
          show={show}
          onHide={() => handleClose()}
          close={handleClose}
          fullscreen={true}
        >
          <Modal.Header className='confirmation-header'>
            <Modal.Title className='confirmation-title'>
              CONFIRM RACE
            </Modal.Title>
            <button className='close-btn' onClick={handleCancelClick}>
              <i
                className='fa-solid fa-x fa-2xl'
                style={{ color: 'white' }}
              ></i>
            </button>
          </Modal.Header>
          <Modal.Body>
            {!isLoading ? (
              <Container className='modal-content'>
                <ModalSelectionIntro
                  isModal={true}
                  selection={parseRaceData({ ...selection, ...data })}
                />
                <ModalSelectionList
                  isModal={true}
                  selection={parseRaceData({ ...selection, ...data })}
                  register={register}
                />
              </Container>
            ) : (
              <Loader />
            )}
          </Modal.Body>
          <Modal.Footer className='confirmation-footer'>
            <Button onClick={handleCancelClick} className='cancel-btn'>
              Cancel
            </Button>
            <Button onClick={handleSelectionClick} className='choose-btn'>
              Choose Race
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
}

export default ChooseRaceModal;
