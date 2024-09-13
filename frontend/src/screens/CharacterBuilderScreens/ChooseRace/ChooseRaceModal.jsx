import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useGetDataForRaceQuery } from '../../../services/races';
import PageContainer from '../../../components/PageContainer';
import { parseRaceData } from '../../../utility/parseRaceData';
import Loader from '../../../components/Loader';
import { setFilteredRace } from '../../../slices/characterBuilderSlice';
import '../../../components/ConfirmationModal.css';

function ChooseRaceModal({
  show,
  onHide,
  handleClose,
  selection,
  onSelectionConfirm,
  onSelectionCancel,
}) {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetDataForRaceQuery(selection.index);

  const handleSelectionClick = () => {
    // create a new object with all properties included
    /*  !! NEED TO HANDLE DIFFERENT SELECTION DEPENDING ON IF isRace is true or not */
    /* ! ALSO NEED to add redux action here to store selection in state */

    const raceData = parseRaceData({ ...selection, ...data });

    // set filtered race in state
    dispatch(setFilteredRace(raceData));

    onSelectionConfirm(raceData);
  };

  const handleCancelClick = (selection) => {
    onSelectionCancel(selection);
  };

  return (
    <>
      {!isLoading && show ? (
        <Modal
          backdrop='static'
          backdropClassName={'confirmation-backdrop'}
          // scrollable={true}
          keyboard={false}
          show={show}
          onHide={() => handleClose()}
          close={handleClose}
          fullscreen={true}
          // make fullscreen
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
              <PageContainer
                isModal={true}
                isRace={true}
                selection={parseRaceData({ ...selection, ...data })}
                isLoading={isLoading}
              />
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
