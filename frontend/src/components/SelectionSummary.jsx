import { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import FormRow from './FormRow';

const SelectionSummary = ({
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

  return (
    <div>
      {isRace ? (
        <FormRow>
          {isModal ? (
            <>
              <Col className='confirmation-info'>
                <div className='confirmation-aside'>
                  <img
                    src={selectedRace ? selectedRace.imgSrc : selection.imgSrc}
                    className='confirmation-img'
                  />
                </div>
                <div className='form-page-header'>
                  {selectedRace ? raceData.name : selection.name}
                </div>
                <p className='description'>{introData.desc}</p>
                <p className='traitlist'>
                  <strong>{isRace ? `Racial Traits:` : null}</strong>
                  <span>
                    {selectedRace && selectedRace.traitNames.length > 0
                      ? `${selectedRace.traitNames.join(', ')}`
                      : null}
                  </span>
                </p>
              </Col>
            </>
          ) : (
            <>
              <Col className='selection-info'>
                <div className='form-page-header'>
                  {selectedRace ? raceData.name : selection.name}
                </div>
                <p className='description'>{introData.desc}</p>
                <p className='traitlist'>
                  <strong>{isRace ? `Racial Traits:` : null}</strong>
                  <span>
                    {selectedRace && selectedRace.traitNames.length > 0
                      ? `${selectedRace.traitNames.join(', ')}`
                      : null}
                  </span>
                </p>
              </Col>
              <Col className='selection-aside'>
                <img
                  src={selectedRace ? selectedRace.imgSrc : selection.imgSrc}
                  className={isModal ? 'confirmation-img' : 'selection-img'}
                />
                {/* MIGHT NEED TO ADD redux action here */}
                <LinkContainer to='/character/chrace'>
                  <button className='change-race-btn'>
                    {isRace ? 'Change Race' : 'Change Class'}
                  </button>
                </LinkContainer>
              </Col>
            </>
          )}
        </FormRow>
      ) : (
        <FormRow>
          {isModal ? (
            <>
              <Col className='confirmation-info'>
                <div className='confirmation-aside'>
                  <img
                    src={introData ? introData.imgSrc : selection.imgSrc}
                    className='confirmation-img'
                  />
                </div>
                <div className='form-page-header'>
                  {introData ? introData.name : selection.name}
                </div>
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
            </>
          ) : (
            <>
              <Col>
                <div>Character Level: 1</div>
                <div>
                  <strong>Max Hit Points:</strong>
                </div>
              </Col>
            </>
          )}
        </FormRow>
      )}
    </div>
  );
};

export default SelectionSummary;
