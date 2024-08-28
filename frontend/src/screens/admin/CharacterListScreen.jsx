import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetBackendCharactersQuery,
  useCreateCharacterMutation,
  useDeleteCharacterMutation,
} from '../../services/backend';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CharacterListScreen = () => {
  const { data, isLoading, error, refetch } = useGetBackendCharactersQuery();

  const [deletecharacter, { isLoading: loadingDelete }] =
    useDeleteCharacterMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deletecharacter(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createcharacter, { isLoading: loadingCreate }] =
    useCreateCharacterMutation();

  const createcharacterHandler = async () => {
    if (window.confirm('Are you sure you want to create a new character?')) {
      try {
        await createcharacter();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Characters</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createcharacterHandler}>
            <FaPlus /> Create Character
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>GENDER</th>
                <th>RACE</th>
                <th>CLASS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.characters.map((character) => (
                <tr key={character._id}>
                  <td>{character._id}</td>
                  <td>{character.name}</td>
                  <td>${character.price}</td>
                  <td>{character.category}</td>
                  <td>{character.brand}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/character/${character._id}/edit`}
                      variant='light'
                      className='btn-sm mx-2'
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(character._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default CharacterListScreen;
