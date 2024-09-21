{
  /* <Row className='class-manager-row' fluid>
                <Col>
                  <img src={introData.imgSrc} />
                  <div>{introData.name}</div>
                </Col>
                <Col>
                  <div>
                    <span>Level</span>
                    <select
                      name='level'
                      id='level-filter'
                      onChange={handleChangeCharacterLevel}
                      value={currentLevel}
                    >
                      {renderLevelOptions()}
                    </select>
                    <div>
                      <i className='fa-solid fa-x'></i>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row></Row> */
}

// const PageIntro = ({
//   isRace,
//   isModal,
//   selection,
//   isLoading,
//   selectedRace,
//   selectedClass,
// }) => {
//   const [raceData, setRaceData] = useState({});
//   const filteredRace = useSelector((state) => state.character.race_filter);
//   const filteredClass = useSelector((state) => state.character.class_filter);

//   let introData;
//   if (isRace) {
//     if (isModal) {
//       introData = selection;
//     } else {
//       introData = filteredRace;
//     }
//   } else {
//     if (isModal) {
//       introData = selection;
//     } else {
//       introData = filteredClass;
//     }
//   }

//   // console.log('in PageIntro -> selection:', selection);
//   useEffect(() => {
//     if (selectedRace?.name && !isModal) {
//       console.log('in useEffect ', selectedRace);
//       setRaceData({ ...selectedRace });
//     } else {
//       setRaceData({ ...selectedClass });
//     }
//   }, [selectedRace]);

//   useEffect(() => {
//     console.log(
//       `PageIntro - is in Modal:${isModal} - introData:`,
//       introData,
//       '\nraceData:',
//       raceData
//     );
//   }, [raceData]);

//   return (
//     <div>
//       {isRace ? (
//         <Container fluid>
//           <Col className='confirmation-info'>
//             <div
//               className={
//                 !isModal ? 'confirmation-aside-flexcol' : 'confirmation-aside'
//               }
//             >
//               <img src={introData.imgSrc} className='confirmation-img' />
//               {!isModal ? (
//                 <LinkContainer to='/character/chrace'>
//                   <button className='change-race-btn'>Change Race</button>
//                 </LinkContainer>
//               ) : null}
//             </div>
//             <div className='confirmation-heading'>
//               <h4>{introData.name}</h4>
//             </div>
//             <p className='description'>{introData.desc}</p>
//             <p className='traitlist'>
//               <strong>{isRace ? `Racial Traits: ` : null}</strong>
//               <span>
//                 {introData.traitNames.length > 0
//                   ? `${introData.traitNames.join(', ')}`
//                   : null}
//               </span>
//             </p>
//           </Col>
//         </Container>
//       ) : (
//         <>
//           {isModal ? (
//             <Container fluid>
//               <Col className='confirmation-info'>
//                 <div className='confirmation-aside'>
//                   <img src={introData.imgSrc} className='confirmation-img' />
//                 </div>
//                 <div className='confirmation-heading'>{introData.name}</div>
//                 <p className='description'>{introData.desc}</p>
//                 <div className='confirmation-details'>
//                   <p>
//                     Hit Die:
//                     <span>{selection.hit_points.hit_die}</span>
//                   </p>
//                   <p>
//                     Primary Ability:
//                     <span>{selection.primary_ability}</span>
//                   </p>
//                   <p>
//                     Saves:
//                     <span>{selection.proficiencies.saving_throws}</span>
//                   </p>
//                 </div>
//               </Col>
//             </Container>
//           ) : (
//             <Container fluid>NOT IN MODAL</Container>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

/*
{
  isModal ? (
    <Col className='confirmation-info'>
      <div className='confirmation-aside'>
        <img src={introData.imgSrc} className='confirmation-img' />
      </div>
      <div className='confirmation-heading'>{introData.name}</div>
      <p className='description'>{introData.desc}</p>
      <div className='confirmation-details'>
        <p>
          Hit Die:
          <span>{selection.hit_points.hit_die}</span>
        </p>
        <p>
          Primary Ability:
          <span>{selection.primary_ability}</span>
        </p>
        <p>
          Saves:
          <span>{selection.proficiencies.saving_throws}</span>
        </p>
      </div> 
    </Col>
  ) : (
    <>
      <Col>
        <div>Character Level: 1</div>
        <div>
          <strong>Max Hit Points:</strong>
        </div>
      </Col>
    </>
  );
}
*/

// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateFormData } from '../../../slices/formSlice';
// import { useNavigate } from 'react-router-dom';
// import CharacterBuilderStepMenu from '../CharacterBuilderStepMenu';
// import ChooseClassModal from './ChooseClassModal';
// import FilterOptionItem from '../../../components/FilterOptionItem';
// import CharacterNameForm from '../CharacterNameForm';
// // import PageContainer from '../../../components/PageContainer';
// import StepFormWrapper from '../StepFormWrapper';
// import ConfirmClass from './ConfirmClass';
// import {
//   setFilteredClass,
//   clearFilteredClass,
// } from '../../../slices/characterBuilderSlice';
// import { characterClasses } from '../../../data/selectors';

// // import { useGetClassDataQuery } from '../../../services/classes';

// const ChooseClassScreen = () => {
//   const { register, handleSubmit } = useForm();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const formData = useSelector((state) => state.form.formData);

//   console.log('in ChooseClassScreen -> formData:', formData);

//   const [temporaryClass, setTemporaryClass] = useState({});
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [selectedClass, setSelectedClass] = useState({});
//   const [showSelectionForm, setShowSelectionForm] = useState(false);

//   // closes Modal
//   const handleClose = () => setShowConfirmationModal(false);

//   /* manages state that reveals the class modal and sets the class filter state */
//   const handleClassFilterSelect = (classType) => {
//     // console.log('in handleClassFilterSelect -> class:', classType);
//     let classObj = characterClasses.find((c) => c.index === classType);
//     setTemporaryClass({
//       name: classObj.name,
//       index: classObj.index,
//       imgSrc: classObj.imgSrc,
//     });
//     setShowConfirmationModal(true);
//   };

//   /* event handler that is fired in the class confirm modal when user clicks the confirm button
//     this handler accepts a selection argument which it pass to the setFilteredClass action from character slice
//     to set the confirmed class_type for the character, and then closes the modal
//   */
//   const handleConfirmSelection = (selection) => {
//     // send the selection to the store selection for class
//     console.log('in handleConfirmSelection:', selection);
//     // set the selectedRace
//     setSelectedClass({
//       name: selection.name,
//       index: selection.index,
//       imgSrc: selection.imgSrc,
//       ...selection,
//     });

//     setShowSelectionForm(true);
//     // close the Confirmation Model
//     handleClose();
//   };

//   const handleCancelSelection = () => {
//     dispatch(clearFilteredClass());
//     setShowConfirmationModal(false);
//   };

//   const onSubmit = (data) => {
//     dispatch(updateFormData(data));

//     //  navigate('/character/chabilities');
//   };

//   return (
//     <div id='chclass'>
//       <CharacterBuilderStepMenu step0 step1 step2></CharacterBuilderStepMenu>

//       <StepFormWrapper>
//         <CharacterNameForm />
//       </StepFormWrapper>

//       {showConfirmationModal ? (
//         <ChooseClassModal
//           show={showConfirmationModal}
//           onHide={handleClose}
//           isRace={false}
//           selection={temporaryClass}
//           onSelectionConfirm={handleConfirmSelection}
//           onSelectionCancel={handleCancelSelection}
//         />
//       ) : !showConfirmationModal && selectedClass?.name ? (
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <StepFormWrapper>
//             <input
//               value={JSON.stringify(selectedClass)}
//               name='class'
//               {...register('class_type')}
//               style={{ display: 'none' }}
//             ></input>
//             <ConfirmClass
//               isModal={false}
//               isRace={false}
//               selectedClass={selectedClass}
//               selection={temporaryClass}
//             />
//           </StepFormWrapper>
//         </form>
//       ) : (
//         <div className='filtering-container'>
//           {characterClasses.map((cls, idx) => (
//             <FilterOptionItem
//               key={cls.index}
//               name={cls.name}
//               index={cls.index}
//               imgsrc={cls.imgSrc}
//               showConfirmationModal={showConfirmationModal}
//               onSelectOption={handleClassFilterSelect}
//               optionSelected={temporaryClass}
//               isRace={false}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChooseClassScreen;
