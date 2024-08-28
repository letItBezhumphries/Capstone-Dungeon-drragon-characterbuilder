import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetCharacterDetailsQuery,
  useUpdateCharacterMutation,
} from '../../services/backend';
import {
  characterClasses,
  characterGenders,
  characterRaces,
  characterAlignments,
} from '../../data/selectors';

const CharacterEditScreen = () => {
  const { id: charId } = useParams();

  const [name, setName] = useState('');
  const [gender, setGender] = useState(0);
  const [race, setRace] = useState('');
  const [classType, setClassType] = useState('');

  const {
    data: character,
    isLoading,
    refetch,
    error,
  } = useGetCharacterDetailsQuery(charId);

  const [updateCharacter, { isLoading: loadingUpdate }] =
    useUpdateCharacterMutation();

  const navigate = useNavigate();

  const handleRaceSelected = (e) => {
    setRace(e.target.value);
  };

  const handleGenderSelected = (e) => {
    setGender(e.target.value);
  };

  const handleClassTypeSelected = (e) => {
    setClassType(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateCharacter({
        charId,
        name,
        gender,
        race,
        classType,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Character updated');
      refetch();
      navigate('/profile');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (character) {
      setName(character.name);
      setGender(character.gender);
      setRace(character.race);
      setClassType(character.classType);
    }
  }, [character]);

  return (
    <>
      <Link to='/profile' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='race'>
              <Form.Label>Race</Form.Label>
              <select
                name='race'
                data-select-race
                className='select-race'
                onChange={handleRaceSelected}
              >
                <option value='--'>--</option>
                {characterRaces.map((r, idx) => (
                  <option key={idx} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group controlId='Gender'>
              <Form.Label>Gender</Form.Label>
              <select
                name='gender'
                data-select-gender
                className='select-gender'
                onChange={handleGenderSelected}
              >
                <option value='--'>--</option>
                {characterGenders.map((g, idx) => (
                  <option key={idx} value={g.type}>
                    {ab.type}
                  </option>
                ))}
              </select>
              {loadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId='class'>
              <Form.Label>Class</Form.Label>
              <select
                name='select-classType'
                data-select-classtype
                className='select-classType'
                onChange={handleClassTypeSelected}
              >
                <option value='--'>--</option>
                {characterClasses.map((ch, idx) => (
                  <option key={idx} value={ch.name}>
                    {ch.name}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CharacterEditScreen;
