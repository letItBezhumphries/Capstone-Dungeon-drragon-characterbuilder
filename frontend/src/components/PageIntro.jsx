import { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import FormContainer from './FormContainer';
import { Row, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
// import { useNavigation } from 'react-router-dom';

const PageIntro = ({
  isRace,
  isModal,
  selection,
  isLoading,
  selectedRace,
  selectedClass,
}) => {
  const [raceData, setRaceData] = useState({});
  const filteredRace = useSelector((state) => state.character.race_filter);
  const filteredClass = useSelector((state) => state.character.class_filter);

  let introData;
  if (isRace) {
    if (isModal) {
      introData = selection;
    } else {
      introData = filteredRace;
    }
  } else {
    if (isModal) {
      introData = selection;
    } else {
      introData = filteredClass;
    }
  }

  // console.log('in PageIntro -> selection:', selection);
  useEffect(() => {
    if (selectedRace?.name && !isModal) {
      console.log('in useEffect ', selectedRace);
      setRaceData({ ...selectedRace });
    } else {
      setRaceData({ ...selectedClass });
    }
  }, [selectedRace]);

  useEffect(() => {
    console.log(
      `PageIntro - isRace is ${isRace} - is in Modal:${isModal} - introData:`,
      introData,
      '\nraceData:',
      raceData,
      '\nselectedClass:',
      selectedClass
    );
  }, [raceData]);

  return (
    <>
      <Row className={isModal ? 'confirmation-primary' : 'overview-primary'}>
        <Col
          xs={'auto'}
          md={8}
          className={isModal ? 'confirmation-info' : 'selection-info'}
        >
          <div className='form-page-header'>
            {selectedRace ? raceData.name : selection.name}
          </div>
          <p className='description'>
            {selectedRace && isRace
              ? raceData.desc
              : !isRace
              ? selection.primary_desc
              : selection.desc}
          </p>
          {!isModal ? (
            <p className='traitlist'>
              <strong>{isRace ? `Racial Traits:` : null}</strong>
              <span>
                {selectedRace && selectedRace.traitNames.length > 0
                  ? `${selectedRace.traitNames.join(', ')}`
                  : null}
              </span>
            </p>
          ) : null}
        </Col>
        <Col
          xs={'auto'}
          md={2}
          className={isModal ? 'confirmation-aside' : 'selection-aside'}
        >
          <img
            src={selectedRace ? selectedRace.imgSrc : selection.imgSrc}
            className={isModal ? 'confirmation-img' : 'selection-img'}
          />
          {/* MIGHT NEED TO ADD redux action here */}
          {!isModal ? (
            <LinkContainer to='/character/chrace'>
              <button className='change-race-btn'>
                {isRace ? 'Change Race' : 'Change Class'}
              </button>
            </LinkContainer>
          ) : null}
        </Col>
      </Row>
      {isModal ? (
        <Row className='full-width-row'>
          <Col className='full-width-col'>
            <div
              className={
                isModal ? 'confirmation-summarylist' : 'selection-summarylist'
              }
            >
              {!isRace && isModal ? (
                <>
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
                </>
              ) : null}
            </div>
          </Col>
        </Row>
      ) : null}
    </>
  );
};

export default PageIntro;
