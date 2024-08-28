import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useGetDataForRaceQuery } from '../../../services/races';
import PageContainer from '../../../components/PageContainer';
import { parseRaceData } from '../../../utility/parseRaceData';
import { getTableSelectOptions } from '../../../utility/parseTableString';
import Loader from '../../../components/Loader';
import { setFilteredRace } from '../../../slices/characterBuilderSlice';

import '../../../components/ConfirmationModal.css';

function ChooseRaceModal({
  show,
  onHide,
  handleClose,
  isRace,
  selection,
  onSelectionConfirm,
  onSelectionCancel,
}) {
  const [raceDescription, setRaceDescription] = useState('');
  const [raceTraitsData, setRaceTraitsData] = useState('');
  const [traitNames, setTraitNames] = useState([]);
  const [traits, setTraits] = useState([]);

  // const dispatch = useDispatch();

  // console.log('in confirmation RaceModal selection:', selection);
  // console.log('data in ConfirmationModal:', data);

  const { data, isLoading, error } = useGetDataForRaceQuery(selection.index);

  useEffect(() => {
    if (!isLoading) {
      setRaceDescription(data.desc.slice(2));
      setRaceTraitsData(data.traits);
      let selectedRaceTraits = [];
      let raceTraitNames = [];
      let parsedTraits = data.traits
        .split(/\*\*\_/)
        .filter((str) => str.length > 0);
      parsedTraits.forEach((str, index) => {
        if (selection.index === 'dragonborn') {
          if (index > 0) {
            if (index === 1) {
              let name = str.split('._**')[0];
              let description = str.split('._**')[1];
              let table = parsedTraits[0].split('**')[2];
              let parsedTableStr = getTableSelectOptions(table);
              console.log('tableOptions:', parsedTableStr);
              if (!raceTraitNames.includes(name)) {
                raceTraitNames.push(name);
                selectedRaceTraits.push({
                  name: name,
                  desc: description,
                  table: table,
                  isChoice: true,
                  choices: parsedTableStr.tableOptions,
                  headCells: parsedTableStr.headCells,
                  tableCells: parsedTableStr.tableCells,
                });
              }
              // its greater than 1
            } else {
              let name = str.split('._**')[0];
              let description = str.split('._**')[1];
              if (!raceTraitNames.includes(name)) {
                raceTraitNames.push(name);
                selectedRaceTraits.push({ name: name, desc: description });
              }
            }
          }
        } else {
          // otherwise its not a dragonborn and you can push the name and trait obj
          let name = str.split('._**')[0];
          let description = str.split('._**')[1];
          if (!raceTraitNames.includes(name)) {
            raceTraitNames.push(name);
            // if the word 'choice' is found in the description then we need to set up choices to select in the overview page
            if (description.split(' ').indexOf('choice:') !== -1) {
              let choices = description
                .split(':')[1]
                .split(/,|or/g)
                .filter((str) => str !== ' ')
                .join(',');
              console.log('description with choice:', choices.split(','));
              selectedRaceTraits.push({
                name: name,
                desc: description,
                isChoice: true,
                choices: choices.split(','),
              });
            } else {
              selectedRaceTraits.push({ name: name, desc: description });
            }
          }
        }
      });
      setTraitNames([...raceTraitNames]);
      setTraits([...selectedRaceTraits]);
    }
  }, [isLoading]);

  const handleSelectionClick = () => {
    // create a new object with all properties included
    /*  !! NEED TO HANDLE DIFFERENT SELECTION DEPENDING ON IF isRace is true or not */
    /* ! ALSO NEED to add redux action here to store selection in state */

    const raceData = parseRaceData({ ...selection, ...data });

    console.log(
      'in handleSelectionClick -> data:',
      data,
      'isLoading:',
      isLoading,
      'raceData:',
      raceData
    );

    const selectionData = {
      ...selection,
      ...raceData,
    };

    onSelectionConfirm(selectionData);
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
              CONFIRM RACE
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
              <PageContainer
                isModal={true}
                isRace={isRace}
                selection={{
                  ...selection,
                  ...data,
                }}
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
