import { useState, useEffect } from 'react';

// import { useSelector, useDispatch } from 'react-redux';

const Select = ({ isRace, register, item, selection, onBlur, onFormReady }) => {
  const defaultOption =
    item.name !== 'Proficiencies'
      ? `Choose a ${selection.name}'s ${item.name}`
      : `Choose a ${selection.name}'s skill`;
  // const [selectedSkills, setSelectedSkills] = useState([]);
  // const [totalChoices, setTotalChoices] = useState(0);
  const [selectionValue, setSelectionValue] = useState(defaultOption);
  // const [skillChoices, setSkillChoices] = useState([]);

  console.log('in Select - item:', item);

  const onSelectOption = (e) => {
    e.preventDefault();
    setSelectionValue(e.target.value.trim());
    onFormReady(true);
  };

  const renderOptions = (item) => {
    return item.choices.map((choice, idx) => {
      return (
        <option key={idx} value={choice}>
          {choice
            .trim()
            .split(' ')
            .map((ch) => ch[0].toUpperCase() + ch.slice(1))
            .join(' ')}
        </option>
      );
    });
  };

  return (
    <select
      name={item.name}
      onChange={onSelectOption}
      onBlur={onBlur}
      style={
        item.choices
          ? { border: '2px solid dodgerblue' }
          : { border: '2px solid lightgrey' }
      }
      className='select-trait-option'
      {...register(item.name)}
    >
      <option>- {defaultOption} -</option>
      {renderOptions(item)}
    </select>
  );
};

export default Select;
