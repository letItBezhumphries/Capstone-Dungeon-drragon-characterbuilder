import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  useGetClassDataQuery,
  useGetSpellsForClassQuery,
} from '../../../services/classes';
import ConfirmClass from './ConfirmClass';
import Loader from '../../../components/Loader';
import { parseClassData } from '../../../utility/parseClassData';
import {
  setFilteredClass,
  classAdded,
} from '../../../slices/characterBuilderSlice';
import '../../../components/ConfirmationModal.css';

function ChooseClassModal({
  show,
  onHide,
  handleClose,
  selection,
  selectedClass,
  onSelectionConfirm,
  onSelectionCancel,
  register,
}) {
  const [queryData, setQueryData] = useState({});
  const dispatch = useDispatch();

  // console.log('in ClassModal selectedClass:', selectedClass);

  const { data, isLoading, error } = useGetClassDataQuery(selection.index);

  const {
    data: spellsData,
    isLoading: spellsIsloading,
    error: spellsError,
  } = useGetSpellsForClassQuery(selection.index);

  useEffect(() => {
    if (selection?.name && !isLoading) {
      // console.log('MODAL -> querydata:', data);

      // console.log('in useEffect ConfirmModal - class data:', data);
      setQueryData(data);
    }
  }, [isLoading, data]);

  const handleSelectionClick = () => {
    // create a new object with all properties included
    /*  !! NEED TO HANDLE DIFFERENT SELECTION DEPENDING ON IF isRace is true or not */
    /* ! ALSO NEED to add redux action here to store selection in state */

    if (!spellsIsloading && spellsData.count > 0) {
      // console.log('spellsData:', spellsData);
      const classData = parseClassData({
        ...selection,
        ...queryData,
        spells: spellsData.results,
      });

      const selectionData = {
        ...selection,
        ...queryData,
        spells: spellsData.results,
      };

      dispatch(
        classAdded({ ...selection, ...classData, spells: spellsData.results })
      );

      dispatch(
        setFilteredClass({
          ...selection,
          ...classData,
          spells: spellsData.results,
        })
      );

      onSelectionConfirm(selectionData);
    } else {
      const classData = parseClassData({ ...selection, ...queryData });

      const selectionData = {
        ...selection,
        ...queryData,
      };

      dispatch(classAdded({ ...selection, ...classData }));

      dispatch(setFilteredClass({ ...selection, ...classData }));

      onSelectionConfirm(selectionData);
    }
    // const classData = parseClassData({ ...selection, ...queryData });

    // const selectionData = {
    //   ...selection,
    //   ...queryData,
    // };

    // dispatch(setFilteredClass({ ...selection, ...classData }));

    // onSelectionConfirm(selectionData);
  };

  const handleCancelClick = () => {
    onSelectionCancel();
  };

  return (
    <>
      {show && isLoading ? (
        <Loader />
      ) : (
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
              <ConfirmClass
                isModal={true}
                selection={{ ...selection, ...data }}
                isLoading={isLoading}
                selectedClass={selectedClass}
                register={register}
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
