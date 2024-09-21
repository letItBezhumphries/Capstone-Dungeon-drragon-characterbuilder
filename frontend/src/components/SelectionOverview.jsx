import { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import FormContainer from './FormContainer';
import { Col, Row, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CollapsibleMenu from './CollapsibleMenu';
import HitpointsManager from './HitpointsManager';
import FormRow from './FormRow';
import FormColumn from './FormColumn';
import { styled } from 'styled-components';

import { Link } from 'react-router-dom';
import { Form } from 'react-hook-form';
// import { useNavigation } from 'react-router-dom';

const ClassContentContainer = styled('div')`
  width: 100%;
  padding: 0 0;
  margin: 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;

const ClassContentImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border: 3px solid black;
`;

const ClassContentSubheading = styled.div`
  font-size: 24px;
  font-weight: 700;
  font-family: 'Roboto Condensed', 'Roboto', 'Helvetica';
  color: black;
`;

const ClassContentLabel = styled.span`
  font-size: 15px;
  color: black;
  font-weight: 700;
  margin-right: 10px;
  flex: stretch;
`;

const LevelSelect = styled.select`
  height: auto;
  width: 50px;
  background-color: hsla(0, 0%, 100%, 0.75);
  border: 1px solid #d8dde3;
  border-radius: 0;
  box-shadow: inset 0 0 4px 0 rgba(139, 178, 199, 0.48);
  margin-right: 10px;
  padding: 4px;
`;

const SelectionOverview = ({
  isRace,
  isModal,
  selection,
  isLoading,
  selectedRace,
  selectedClass,
}) => {
  const [raceData, setRaceData] = useState({});
  const [currentLevel, setCurrentLevel] = useState(1);
  const filteredRace = useSelector((state) => state.character.race_filter);
  const filteredClass = useSelector((state) => state.character.class_filter);
  const levelsArray = Array(20)
    .join()
    .split(',')
    .map(
      function (a) {
        return this.i++;
      },
      { i: 1 }
    );

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

  const handleChangeCharacterLevel = (e) => {
    setCurrentLevel(e.target.value);
  };

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
      `PageIntro - is in Modal:${isModal} - introData:`,
      introData,
      '\nraceData:',
      raceData
    );
  }, [raceData]);

  const tabs = [{ title: 'Class Features', items: introData }];

  return (
    <div>
      {isRace ? (
        <FormContainer>
          <Col className='confirmation-info'>
            <div
              className={
                !isModal ? 'confirmation-aside-flexcol' : 'confirmation-aside'
              }
            >
              <img src={introData.imgSrc} className='confirmation-img' />
              {!isModal ? (
                <LinkContainer to='/character/chrace'>
                  <button className='change-race-btn'>Change Race</button>
                </LinkContainer>
              ) : null}
            </div>
            <div className='confirmation-heading'>
              <h4>{introData.name}</h4>
            </div>
            <p className='description'>{introData.desc}</p>
            <p className='traitlist'>
              <strong>{isRace ? `Racial Traits: ` : null}</strong>
              <span>
                {introData.traitNames.length > 0
                  ? `${introData.traitNames.join(', ')}`
                  : null}
              </span>
            </p>
          </Col>
        </FormContainer>
      ) : (
        <FormContainer>
          {isModal ? (
            <Col className='confirmation-info'>
              <div
                className={
                  !isModal ? 'confirmation-aside-flexcol' : 'confirmation-aside'
                }
              >
                <img src={introData.imgSrc} className='confirmation-img' />
              </div>
              <div className='confirmation-heading'>
                <h4>{introData.name}</h4>
              </div>
              <p className='description'>{introData.primary_desc}</p>
              <div className='confirmation-summarylist'>
                <p>
                  Hit Die:<span>{introData.hit_points.hit_die}</span>
                </p>
                <p>
                  Primary Ability:<span>{introData.primary_ability}</span>
                </p>
                <p>
                  Saves:<span>{introData.proficiencies.saving_throws}</span>
                </p>
              </div>
            </Col>
          ) : (
            <Container className='class-primary-container' fluid='true'>
              <FormRow>
                <FormColumn>
                  <ClassContentContainer>
                    <h2>Character Level: {currentLevel}</h2>
                  </ClassContentContainer>
                </FormColumn>
                <FormColumn>
                  <ClassContentContainer>
                    <HitpointsManager
                      characterLevel={currentLevel}
                      introData={introData}
                    />
                  </ClassContentContainer>
                </FormColumn>
              </FormRow>
              <Row fluid='true'>
                <FormColumn>
                  <ClassContentContainer>
                    <ClassContentImg src={introData.imgSrc} />
                    <ClassContentSubheading>
                      {introData.name}
                    </ClassContentSubheading>
                  </ClassContentContainer>
                </FormColumn>
                <FormColumn>
                  <ClassContentContainer>
                    <ClassContentLabel>Level</ClassContentLabel>
                    <LevelSelect
                      name='level'
                      id='level-filter'
                      onChange={handleChangeCharacterLevel}
                      value={currentLevel}
                    >
                      {levelsArray.map((lv, i) => (
                        <option key={i} value={lv}>
                          {lv}
                        </option>
                      ))}
                    </LevelSelect>
                    <div>
                      <i className='fa-solid fa-x'></i>
                    </div>
                  </ClassContentContainer>
                </FormColumn>
              </Row>
              <CollapsibleMenu
                tabs={tabs}
                isModal={isModal}
                isRace={isRace}
                introData={introData}
                characterLevel={currentLevel}
              />
            </Container>
          )}
        </FormContainer>
      )}
    </div>
  );
};

export default SelectionOverview;
