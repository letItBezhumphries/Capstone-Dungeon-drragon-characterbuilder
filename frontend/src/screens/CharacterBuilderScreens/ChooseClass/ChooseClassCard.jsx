import React from 'react';
import Container from 'react-bootstrap/Container';
import PageIntro from '../../../components/PageIntro';
import PageList from '../../../components/PageList';
import Loader from '../../../components/Loader';
import { parseClassData } from '../../../utility/parseClassData';

const ChooseClassCard = ({ isModal, selection, isLoading, selectedClass }) => {
  let classSelection;
  if (!isLoading) {
    classSelection = parseClassData(selection);
    classSelection.imgSrc = selection.imgSrc;
    classSelection.index = selection.index;
    console.log('in CLASS CARD classSelection:', classSelection);
  }

  return (
    <Container className={isModal ? 'modal-content' : 'overview-container'}>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <PageIntro
            isRace={false}
            isModal={isModal}
            selection={classSelection}
            isLoading={isLoading}
            selectedClass={selectedClass}
          />
          {/* SummaryList */}

          <PageList
            isRace={false}
            isModal={isModal}
            selection={classSelection}
            isLoading={isLoading}
            selectedClass={selectedClass}
          />
        </>
      )}
    </Container>
  );
};

export default ChooseClassCard;
