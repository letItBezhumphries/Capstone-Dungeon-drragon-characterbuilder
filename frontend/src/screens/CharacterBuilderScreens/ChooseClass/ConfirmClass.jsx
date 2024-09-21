import React from 'react';
import Container from 'react-bootstrap/Container';
import PageIntro from '../../../components/PageIntro';
import PageList from '../../../components/PageList';
import Loader from '../../../components/Loader';
import SelectionOverview from '../../../components/SelectionOverview';
import { parseClassData } from '../../../utility/parseClassData';

const ConfirmClass = ({
  isModal,
  selection,
  isLoading,
  selectedClass,
  register,
}) => {
  let classSelection;
  if (isModal) {
    classSelection = parseClassData(selection);
    classSelection.imgSrc = selection.imgSrc;
    classSelection.index = selection.index;
    // console.log(
    //   `in ConfirmClass when the Modal is ${isModal} - classSelection:`,
    //   classSelection
    // );
  } else {
    classSelection = parseClassData(selectedClass);
    classSelection.imgSrc = selection.imgSrc;
    classSelection.index = selection.index;
    // console.log(
    //   `in ConfirmClass when the Modal is ${isModal} - classSelection:`,
    //   classSelection
    // );
  }

  return (
    <Container className={isModal ? 'modal-content' : 'overview-container'}>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <SelectionOverview
            isRace={false}
            isModal={isModal}
            selection={classSelection}
            isLoading={isLoading}
            selectedClass={selectedClass}
          />

          {/* <PageList
            isRace={false}
            isModal={isModal}
            selection={classSelection}
            isLoading={isLoading}
            selectedClass={selectedClass}
            register={register}
          /> */}
        </>
      )}
    </Container>
  );
};

export default ConfirmClass;
