import React from 'react';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Col, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetBackendCharactersQuery } from '../../services/backend';
import './ProfileScreen.css';

const ProfileScreen = () => {
  const { isLoading, data: characters, error } = useGetBackendCharactersQuery();

  if (!isLoading) {
    console.log('Char:', characters);
  }

  return (
    <div className='profile'>
      <Col md={9}>
        <h2>Characters from across the realm</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>GENDER</th>
                <th>NAME</th>
                <th>RACE</th>
                <th>CLASS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {characters.map((character) => (
                <tr key={character._id}>
                  <td>{character._id}</td>
                  <td>{character.gender}</td>
                  <td>{character.name}</td>
                  <td>{character.race}</td>
                  <td>{character.class_type}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/profile/character/${character._id}/edit`}
                      className='btn-sm'
                      variant='light'
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </div>
  );
};

export default ProfileScreen;
