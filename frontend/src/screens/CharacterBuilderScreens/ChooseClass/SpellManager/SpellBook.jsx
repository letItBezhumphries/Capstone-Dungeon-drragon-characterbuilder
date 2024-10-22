import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import CollapsibleSpellList from './CollapsibleSpellList';

// Wizard only?
const SpellBook = () => {
  return (
    <CollapsibleSpellList heading='Spell Book' eventKey='2'>
      <div>SpellBook</div>
    </CollapsibleSpellList>
  );
};

export default SpellBook;
