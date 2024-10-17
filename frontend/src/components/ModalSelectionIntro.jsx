import { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
// import { useNavigation } from 'react-router-dom';

const ModalSelectionIntro = ({ isModal, selection }) => {
  const race = useSelector((state) => state.character.selected_race);

  let raceData;

  if (isModal) {
    raceData = selection;
  } else {
    raceData = race;
  }

  // console.log(
  //   'ModalSelectionIntro
  //- raceData:',
  //   raceData,
  //   'isModal:',
  //   isModal,
  //   'race:',
  //   race,
  //   'selection:',
  //   selection
  // );

  return (
    <Container fluid='true'>
      <Col className='confirmation-info'>
        <div
          className={
            !isModal ? 'confirmation-aside-flexcol' : 'confirmation-aside'
          }
        >
          <img src={raceData.imgSrc} className='confirmation-img' />
          {!isModal ? (
            <LinkContainer to='/character/chrace'>
              <button className='change-race-btn'>Change Race</button>
            </LinkContainer>
          ) : null}
        </div>
        <div className='confirmation-heading'>
          <h4>{raceData.name}</h4>
        </div>
        <p className='description'>{raceData.desc}</p>
        <p className='traitlist'>
          <strong>Race Traits:</strong>
          <span>
            {raceData.traitNames.length > 0
              ? `${raceData.traitNames.join(', ')}`
              : null}
          </span>
        </p>
      </Col>
    </Container>
  );
};

export default ModalSelectionIntro;
