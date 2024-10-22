import { useEffect, useState } from 'react';
import { useGetSpellsForClassQuery } from '../../../services/classes';
import { LinkContainer } from 'react-router-bootstrap';
import { Col, Row, Container } from 'react-bootstrap';
import { setSpellsAvailableForClass } from '../../../slices/characterBuilderSlice';
import { useSelector, useDispatch } from 'react-redux';
import CollapsibleMenu from '../../../components/CollapsibleMenu';
import HitpointsManager from '../../../components/HitpointsManager';
import FormRow from '../../../components/FormRow';
import FormColumn from '../../../components/FormColumn';
import { styled } from 'styled-components';
import Loader from '../../../components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigation } from 'react-router-dom';

const ClassSectionContainer = styled('div')`
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

const ClassSecondarySection = styled(Row)`
  width: 100%;
  margin: 0px 0px;
  padding: 0px 0px;
`;

// 17.5px 24px 700 400 Roboto Roboto Condensed
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

const ClassOverview = ({ isRace, isModal, selection, register }) => {
  const dispatch = useDispatch();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [filteredItems, setFilteredItems] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [spellsAvailable, setSpellsAvailable] = useState([]);
  const classSelection = useSelector((state) => state.character.selected_class);

  const { data, error, isLoading } = useGetSpellsForClassQuery(selection.index);

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

  if (isModal) {
    introData = selection;
  } else {
    introData = classSelection;
  }

  const handleChangeCharacterLevel = (e) => {
    setCurrentLevel(e.target.value);
  };

  useEffect(() => {
    console.log(
      `ClassOverview - useEffect #1 - is in Modal:${isModal} - introData:`,
      introData,
      `\ncurrentLevel:`,
      currentLevel,
      '\ndata:',
      data
    );

    let filteredFeatures = introData.features.filter(
      (feat) => feat.level <= currentLevel
    );

    if (!isLoading && data.count > 0) {
      console.log('SETTING UP FOR SPELL TABS');
      let availableSpells = data.results.filter(
        (spell) => spell.spell_level <= currentLevel
      );

      // populate the features with spell choices
      const featuresWithPopulatedSpells = filteredFeatures.map((feat) => {
        if (feat.subtype === 'spells') {
          return {
            choices: [...availableSpells],
            ...feat,
          };
        }
        return feat;
      });

      setSpellsAvailable([...availableSpells]);
      setFilteredItems([...featuresWithPopulatedSpells]);
      setTabs([
        {
          label: 'Class Features',
          items: [
            introData.hit_points,
            introData.proficiencies,
            ...featuresWithPopulatedSpells,
          ],
        },
        { label: 'Spells', items: availableSpells },
      ]);
    } else {
      setTabs([
        {
          label: 'Class Features',
          items: [
            introData.hit_points,
            introData.proficiencies,
            ...filteredFeatures,
          ],
        },
      ]);
    }
  }, [isLoading, data, currentLevel]);

  return (
    <div>
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
              <ClassSectionContainer>
                <h2>Character Level: {currentLevel}</h2>
              </ClassSectionContainer>
            </FormColumn>
            <FormColumn>
              <ClassSectionContainer>
                <HitpointsManager
                  characterLevel={currentLevel}
                  introData={introData}
                />
              </ClassSectionContainer>
            </FormColumn>
          </FormRow>
          <ClassSecondarySection>
            <FormColumn>
              <ClassSectionContainer>
                <ClassContentImg src={introData.imgSrc} />
                <ClassContentSubheading>
                  {introData.name}
                </ClassContentSubheading>
              </ClassSectionContainer>
            </FormColumn>
            <FormColumn>
              <ClassSectionContainer>
                <ClassContentLabel>Level</ClassContentLabel>
                <LevelSelect
                  name='level'
                  id='level-filter'
                  onChange={handleChangeCharacterLevel}
                  value={currentLevel}
                  // {...register('level')}
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
              </ClassSectionContainer>
            </FormColumn>
          </ClassSecondarySection>
          {isLoading ? (
            <Loader></Loader>
          ) : data && tabs.length ? (
            <CollapsibleMenu
              tabs={tabs}
              introData={introData}
              characterLevel={currentLevel}
              register={register}
              isLoading={isLoading}
            />
          ) : null}
        </Container>
      )}
      <ToastContainer />
    </div>
  );
};

export default ClassOverview;
