// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { updateFormData } from '../../../slices/formSlice';
// import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
// import FilterOptionItem from '../../../components/FilterOptionItem';
// import CharacterNameForm from '../CharacterNameForm';
// import PageContainer from '../../../components/PageContainer';
// import StepFormWrapper from '../StepFormWrapper';
// import ChooseRaceModal from './ChooseRaceModal';

// import { characterRaces } from '../../../data/selectors';
// import './ChooseRaceScreen.css';

// const ChooseRaceScreen = () => {
//   const { register, handleSubmit } = useForm();
//   const formData = useSelector((state) => state.form.formData);
//   const [temporaryRace, setTemporaryRace] = useState({});
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [selectedRace, setSelectedRace] = useState({});
//   const dispatch = useDispatch();

//   console.log('state:', formData);

//   // closes the modal
//   const handleClose = () => setShowConfirmationModal(false);

//   /* sets up the ConfirmationModal to open with the race selected to view as a search filter of sorts
//   the state setter setTemporaryR
//   */
//   const handleRaceFilter = (race) => {
//     console.log('in handleRaceFilter -> race:', race);
//     let raceObj = characterRaces.find((r) => r.index === race);
//     setTemporaryRace({
//       name: raceObj.name,
//       index: raceObj.index,
//       imgSrc: raceObj.imgSrc,
//     });
//     setShowConfirmationModal(true);
//   };

//   const handleConfirmSelection = (selection) => {
//     // send the selection to the store selection for race
//     // console.log('in handleConfirmSelection:', selection);
//     // set the selectedRace
//     console.log('in handle FINAL Selection:', selection);

//     setSelectedRace({
//       name: selection.name,
//       index: selection.index,
//       imgSrc: selection.imgSrc,
//       ...selection,
//     });
//     // close the Confirmation Model
//     handleClose();
//   };

//   const onSubmit = (data) => {
//     dispatch(updateFormData(data));
//     // useNavigate('/character/chclass');
//   };

//   const handleCancelSelection = () => {
//     setShowConfirmationModal(false);
//   };

//   return (
//     <div id='chrace'>
//       <CharacterBuilderStepMenu step0 step1></CharacterBuilderStepMenu>
//       <StepFormWrapper>
//         <CharacterNameForm />
//       </StepFormWrapper>

//       {/* if there is a selectedRace.name property and we're not showing the confirmation modal then Return the PageContainer
//         which includes the SHOWS THE FINAL RACE FORM
//        */}
//       {selectedRace?.name && !showConfirmationModal ? (
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <StepFormWrapper>
//             <input
//               value={JSON.stringify(selectedRace)}
//               name='race'
//               {...register('race')}
//               style={{ display: 'none' }}
//             ></input>
//             <PageContainer
//               isModal={false}
//               isRace={true}
//               selectedRace={selectedRace}
//             />
//           </StepFormWrapper>
//         </form>
//       ) : (
//         <div className='filtering-container'>
//           {characterRaces.map((race, idx) => (
//             <FilterOptionItem
//               key={idx}
//               name={race.name}
//               index={race.index}
//               imgsrc={race.imgSrc}
//               onSelectOption={handleRaceFilter}
//               showConfirmationModal={showConfirmationModal}
//               optionSelected={temporaryRace}
//               isRace={true}
//             />
//           ))}
//         </div>
//       )}

//       {showConfirmationModal ? (
//         <ChooseRaceModal
//           show={showConfirmationModal}
//           onHide={handleClose}
//           isRace={true}
//           selection={temporaryRace}
//           onSelectionConfirm={handleConfirmSelection}
//           onSelectionCancel={handleCancelSelection}
//         />
//       ) : null}
//     </div>
//   );
// };

// export default ChooseRaceScreen;

// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { useGetDataForRaceQuery } from '../../../services/races';
// import PageContainer from '../../../components/PageContainer';
// import ConfirmRaceCard from './ConfirmRaceCard';
// import { parseRaceData } from '../../../utility/parseRaceData';
// import Loader from '../../../components/Loader';
// import { setFilteredRace } from '../../../slices/characterBuilderSlice';
// import '../../../components/ConfirmationModal.css';

// function ChooseRaceModal({
//   show,
//   onHide,
//   handleClose,
//   isRace,
//   selection,
//   onSelectionConfirm,
//   onSelectionCancel,
// }) {
//   // const dispatch = useDispatch();

//   const { data, isLoading, error } = useGetDataForRaceQuery(selection.index);

//   const handleSelectionClick = () => {
//     // create a new object with all properties included
//     /*  !! NEED TO HANDLE DIFFERENT SELECTION DEPENDING ON IF isRace is true or not */
//     /* ! ALSO NEED to add redux action here to store selection in state */

//     const raceData = parseRaceData({ ...selection, ...data });

//     console.log(
//       'in handleSelectionClick -> data:',
//       data,
//       'isLoading:',
//       isLoading,
//       'raceData:',
//       raceData
//     );

//     const selectionData = {
//       ...selection,
//       ...raceData,
//     };

//     onSelectionConfirm(selectionData);
//   };

//   const handleCancelClick = (selection) => {
//     onSelectionCancel(selection);
//   };

//   return (
//     <>
//       {!isLoading && show ? (
//         <Modal
//           backdrop='static'
//           backdropClassName={'confirmation-backdrop'}
//           // scrollable={true}
//           keyboard={false}
//           show={show}
//           onHide={() => handleClose()}
//           close={handleClose}
//           fullscreen={true}
//           // make fullscreen
//         >
//           <Modal.Header className='confirmation-header'>
//             <Modal.Title className='confirmation-title'>
//               CONFIRM RACE
//             </Modal.Title>
//             <button className='close-btn' onClick={handleCancelClick}>
//               <i
//                 className='fa-solid fa-x fa-2xl'
//                 style={{ color: 'white' }}
//               ></i>
//             </button>
//           </Modal.Header>
//           <Modal.Body className='modal-body'>
//             {!isLoading ? (
//               <PageContainer
//                 isModal={true}
//                 isRace={isRace}
//                 selection={{
//                   ...selection,
//                   ...data,
//                 }}
//                 isLoading={isLoading}
//               />
//             ) : (
//               <Loader />
//             )}
//           </Modal.Body>
//           <Modal.Footer className='confirmation-footer'>
//             <Button onClick={handleCancelClick} className='cancel-btn'>
//               Cancel
//             </Button>
//             <Button onClick={handleSelectionClick} className='choose-btn'>
//               Choose Race
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       ) : null}
//     </>
//   );
// }

// export default ChooseRaceModal;
