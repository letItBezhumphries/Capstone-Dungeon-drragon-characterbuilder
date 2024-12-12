import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { useGetBackendMonstersQuery } from '../services/backend';
import { useInitCharacterMutation } from '../services/backend';
import { useInitCreateCharacterMutation } from '../slices/charactersApiSlice';
import { useDispatch } from 'react-redux';
import { characterAddedToBuilder } from '../slices/characterBuilderSlice';
import {
  useGetDataForRaceQuery,
  useGetdnd5eRaceDataQuery,
} from '../services/races';
import {
  useGetClassDataQuery,
  useGetdnd5eClassDataQuery,
} from '../services/classes';
import { useGetSpellsForClassQuery } from '../services/classes';
import { toast } from 'react-toastify';

const HomeContainerOuter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 300px;
`;

const HomeContainerInner = styled.div`
  margin: 80px auto 0px;
  padding: 0px 0px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeadingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);
`;

const HeadingMain = styled.h1`
  color: #eb6739ff;
  font-size: 36px;
  margin: 0px;
  font-family: Roboto;
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  line-height: 43.2px;
  text-transform: uppercase;
  margin-bottom: 40px;
  text-align: center;
`;

const Subheading = styled.p`
  font-size: 16px;
  margin: 0px;
  letter-spacing: 1.15px;
  color: #eb6739ff;
  line-height: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  width: 100%;
  margin: 0px 0px;
  padding: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CreateCharacterCard = styled.div`
  border-radius: 8px;
  height: 100%;
  display: flex;
  width: 300px;
  flex-direction: column;
  justify-content: flex-start;
  border: 3px solid #ec193cff;
  cursor: pointer;

  & :hover {
    border-color: #ec193cff;
  }
`;

const CardImage = styled.img`
  height: 200px;
  width: 100%;
`;

const CardBody = styled.div`
  background-color: rgb(35, 43, 47);
  flex: 1 1 0%;
  border-top: 2px solid rgb(77, 79, 84);
  padding: 16px;
`;

const CardText = styled.div`
  margin: 0px;
  font-size: 14px;
  font-family: Roboto;
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.15px;
  line-height: 20.02px;
  color: rgb(196, 203, 206);
  margin-bottom: 30px;
`;

const CardTitle = styled.div`
  margin: 0px 0px 0.35em;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.15px;
  line-height: 24px;
  text-transform: uppercase;
  font-size: 20px;
  font-family: 'Roboto Condensed';
  font-weight: 700;
  color: rgb(236, 237, 238);
`;

const CardFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 8px;
  background-color: white;

  & p {
    margin: 0px;
    font-family: Roboto;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 1.55px;
    line-height: 24px;
    font-size: 12px;
    color: rgb(0, 0, 0);
    text-transform: uppercase;
    font-weight: 600;
  }

  & i {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.54);
    position: relative;
    top: -1px;
    margin-left: 8px;
  }
`;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [initCreateCharacter, { isLoading: loadingInitCreateCharacter }] =
    useInitCreateCharacterMutation();

  const { data, error, isLoading } = useGetClassDataQuery('barbarian');
  const {
    data: open5eRaceData,
    error: open5eRaceError,
    isLoading: open5eRaceIsLoading,
  } = useGetDataForRaceQuery('dwarf');

  const {
    data: dndRaceData,
    error: dndRaceError,
    isLoading: dndRaceIsLoading,
  } = useGetdnd5eRaceDataQuery('dwarf');

  const {
    data: dndClassData,
    error: dndClassError,
    isLoading: dndClassIsLoading,
  } = useGetdnd5eClassDataQuery('barbarian');

  // const { data, error, isLoading } = useGetSpellsForClassQuery('wizard');

  // const { data, isLoading, error } = useGetBackendMonstersQuery();
  // const { data, isLoading, error } = useGetDataForRaceQuery('dragonborn');

  /** BRING IN THE CHARACTERS */

  useEffect(() => {
    if (!isLoading) {
      console.log('in homeScreen open5e api CLASS query response:', data);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!open5eRaceIsLoading) {
      console.log(
        'in homeScreen open5e api RACE query response:',
        open5eRaceData
      );
    }
  }, [open5eRaceIsLoading]);

  useEffect(() => {
    if (!dndClassIsLoading) {
      console.log('in homeScreen DND5e - CLASS query response:', dndClassData);
    }
  }, [dndClassIsLoading]);

  useEffect(() => {
    if (!dndRaceIsLoading) {
      console.log('in homeScreen DND5e api RACE query:', dndRaceData);
    }
  }, [dndRaceIsLoading]);

  const createNewCharacterHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await initCreateCharacter().unwrap();

      if (!loadingInitCreateCharacter && res.userId) {
        console.log('dispatch to state');
        dispatch(characterAddedToBuilder({ _id: res._id, userId: res.userId }));
        console.log('location:', location);
        navigate('/character');
      }
      console.log('in createNewCharacterHandler -> res:', res);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <HomeContainerOuter id='home'>
      <HomeContainerInner>
        <HeadingContainer>
          <HeadingMain>Build Your Own Character</HeadingMain>
          <Subheading>
            Create a character using a step by step approach
          </Subheading>
        </HeadingContainer>
        <CardContainer>
          <CreateCharacterCard onClick={createNewCharacterHandler}>
            <CardImage src='/src/assets/stock/character_builder_card.jpg'></CardImage>
            <CardBody>
              <CardTitle>Standard</CardTitle>
              <CardText>
                Create a character using a step by step approach
              </CardText>
            </CardBody>
            <CardFooter>
              <p>
                START BUILDING
                <i className='fa-solid fa-chevron-right'></i>
              </p>
            </CardFooter>
          </CreateCharacterCard>
        </CardContainer>
      </HomeContainerInner>
    </HomeContainerOuter>
  );
};

export default HomeScreen;
