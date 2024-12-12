import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useGetMonstersPageQuery } from '../../services/monsters';
import './MonstersScreen.css';

const MonstersScreen = () => {
  // const monstersResponse = useGetMonstersQuery();
  // const { data, error, isLoading } = useGetMonstersQuery();
  // const { loading, monsters, next, prev } = monstersList;

  const { data, error, isLoading } = useGetMonstersPageQuery(25);

  useEffect(() => {
    if (!isLoading) {
      console.log('the monsters in MonstersScreen..-> ', data);
    }
  }, [isLoading]);

  return (
    <div className='monsters-container'>
      {isLoading ? (
        <h3>is loading...</h3>
      ) : error ? (
        <div>{error.data.message || error.error}</div>
      ) : (
        <>
          <div>
            <h3>Search Available Monsters</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default MonstersScreen;
