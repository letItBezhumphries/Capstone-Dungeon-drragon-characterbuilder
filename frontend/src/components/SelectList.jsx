import { useState, useEffect } from 'react';
import Select from './Select';
// import { useSelector, useDispatch } from 'react-redux';

function renderSelectList(item) {}

const SelectList = ({ register, item, selection, onBlur, onFormReady }) => {
  console.log('in SelectList - item:', item);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [totalChoices, setTotalChoices] = useState(0);
  const [skillChoices, setSkillChoices] = useState([]);

  useEffect(() => {
    // if (item.name === 'Proficiencies') {
    // }
  }, [item]);
  return <div>SelectList</div>;
};

export default SelectList;
