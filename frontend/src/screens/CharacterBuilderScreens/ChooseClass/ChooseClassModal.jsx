import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useGetClassDataQuery } from '../../../services/classes';
import ChooseClassCard from './ChooseClassCard';
import Loader from '../../../components/Loader';
import { setFilteredClass } from '../../../slices/characterBuilderSlice';

import '../../../components/ConfirmationModal.css';

function ChooseClassModal({
  show,
  onHide,
  handleClose,
  selection,
  selectedClass,
  onSelectionConfirm,
  onSelectionCancel,
}) {
  const [queryData, setQueryData] = useState({});
  // const dispatch = useDispatch();

  console.log('in confirmationModal selection:', selectedClass);

  const { data, isLoading, error } = useGetClassDataQuery(selection.index);

  useEffect(() => {
    if (selection?.name && !isLoading) {
      console.log('MODAL -> querydata:', data);

      console.log('in useEffect ConfirmModal - class data:', data);
      setQueryData(data);
    }
  }, [isLoading, data]);

  const handleSelectionClick = () => {
    // create a new object with all properties included
    /*  !! NEED TO HANDLE DIFFERENT SELECTION DEPENDING ON IF isRace is true or not */
    /* ! ALSO NEED to add redux action here to store selection in state */

    const selectionData = {
      ...selection,
      ...queryData,
    };

    console.log(
      'in ChooseClassModal-> selection handleSelectionCLick:',
      selection,
      '\n and here is queryData:',
      queryData
    );

    onSelectionConfirm(selectionData);
  };

  const handleCancelClick = (selection) => {
    onSelectionCancel(selection);
  };

  return (
    <>
      {show && isLoading ? (
        <Loader />
      ) : (
        <Modal
          backdrop='static'
          backdropClassName={'confirmation-backdrop'}
          scrollable={true}
          keyboard={false}
          show={show}
          onHide={() => handleClose()}
          close={handleClose}
          fullscreen={true}
          // make fullscreen
        >
          <Modal.Header className='confirmation-header'>
            <Modal.Title className='confirmation-title'>
              CONFIRM ADD CLASS
            </Modal.Title>
            <button className='close-btn' onClick={handleCancelClick}>
              <i
                className='fa-solid fa-x fa-2xl'
                style={{ color: 'white' }}
              ></i>
            </button>
          </Modal.Header>
          <Modal.Body className='modal-body'>
            {!isLoading ? (
              <ChooseClassCard
                isModal={true}
                selection={{ ...selection, ...data }}
                isLoading={isLoading}
                selectedClass={selectedClass}
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
              Add Class
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default ChooseClassModal;
