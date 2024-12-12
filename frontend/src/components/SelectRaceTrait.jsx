import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  racebasedSkillsUpdated,
  racebasedAbilityBonusUpdated,
} from '../slices/characterBuilderSlice';

export const SelectRaceTrait = ({ item, selection, register, onFormReady }) => {
  console.log('in SelectRaceTrait - selection:', selection, 'item:', item);
  const defaultOption =
    item.name === undefined
      ? '- Choose an Option -'
      : `- Choose a ${selection.name}'s ${item.name} -`;

  const [selectionValue, setSelectionValue] = useState('');

  const handleSelection = (e) => {
    setSelectionValue(e.target.value);
    onFormReady(true);
  };

  const renderTraitOptions = (item) => {
    return item.choices.map((choice, idx) => {
      return (
        <option key={idx} index={idx} value={choice}>
          {choice}
        </option>
      );
    });
  };

  return (
    <select
      name={item.name}
      defaultValue={defaultOption}
      onChange={handleSelection}
      className='select-trait-option'
      {...register(item.name)}
    >
      <option>{defaultOption}</option>
      {renderTraitOptions(item)}
    </select>
  );
};

export const SelectRaceTraitOption = ({
  item,
  selection,
  register,
  selectIdx,
}) => {
  const dispatch = useDispatch();
  const selectName = `${item.name}-${selectIdx}`;
  const selectedChoices = useSelector(
    (state) => state.character.race_skills_selected
  );
  const optionsAvailable = useSelector(
    (state) => state.character.race_skillOptions_available
  );
  const [currentOptions, setCurrentOptions] = useState(optionsAvailable);
  const [selectionValue, setSelectionValue] = useState('');
  const [hasSelection, setHasSelection] = useState(false);

  // console.log(
  //   'in SelectRaceTraitOption - selection:',
  //   selection,
  //   'item:',
  //   item,
  //   'optionsAvailable:',
  //   optionsAvailable
  // );

  const defaultOption =
    item.name === undefined
      ? '- Choose an Option -'
      : `- Choose a ${selection.name}'s ${item.name} -`;

  const handleSelection = (e) => {
    const capturedValue = e.target.value;
    console.log('in handleSelect of SelectRaceTraitOption.jsx:', capturedValue);
    setSelectionValue(capturedValue);
    setHasSelection((prevState) => !prevState);
    dispatch(
      racebasedSkillsUpdated({
        skill: capturedValue,
        total_choices: item.total_choices,
        index: selectIdx,
      })
    );
  };

  useEffect(() => {
    console.log(
      `in ${selectName} - useEffect redux state -> selectedChoices:`,
      selectedChoices,
      'optionsAvailable:',
      optionsAvailable,
      'hasSelection:',
      hasSelection,
      'selectionValue:',
      selectionValue
    );

    if (!hasSelection && selectedChoices.length > 0) {
      setCurrentOptions(optionsAvailable);
    }
  }, [hasSelection, selectedChoices]);

  return (
    <select
      name={selectName}
      defaultValue={defaultOption}
      onChangeCapture={handleSelection}
      className='select-trait-option'
      {...register(selectName)}
    >
      <option>{defaultOption}</option>
      {currentOptions.map((opt, idx) => {
        return (
          <option key={idx} index={idx} value={opt}>
            {opt}
          </option>
        );
      })}
    </select>
  );
};

export const SelectAbilityScoreOption = ({
  item,
  selection,
  register,
  selectIdx,
}) => {
  const dispatch = useDispatch();
  const selectedChoices = useSelector(
    (state) => state.character.ability_bonus_selected
  );
  const optionsAvailable = useSelector(
    (state) => state.character.ability_bonusOptions_available
  );
  const selectName = `${item.name}-${selectIdx}`;

  const [currentOptions, setCurrentOptions] = useState(optionsAvailable);
  const [selectionValue, setSelectionValue] = useState('');
  const [hasSelection, setHasSelection] = useState(false);

  const defaultOption =
    item.name === undefined
      ? '- Choose an Option -'
      : `- Choose a ${selection.name}'s ${item.name} -`;

  const handleSelection = (e) => {
    const capturedValue = e.target.value;
    // console.log(
    //   'in handleSelect of SelectAbilityScoreOption.jsx:',
    //   capturedValue
    // );
    setSelectionValue(capturedValue);
    setHasSelection((prevState) => !prevState);
    dispatch(
      racebasedAbilityBonusUpdated({
        ability: capturedValue,
        total_choices: item.total_choices,
        index: selectIdx,
      })
    );
  };

  useEffect(() => {
    // console.log(
    //   `in ${selectName} - useEffect redux state -> selectedChoices:`,
    //   selectedChoices,
    //   'optionsAvailable:',
    //   optionsAvailable,
    //   'hasSelection:',
    //   hasSelection,
    //   'selectionValue:',
    //   selectionValue
    // );
    if (!hasSelection && selectedChoices.length > 0) {
      // console.log(
      //   `in ${selectName} - useEffect redux state NEED TO RESET OPTIONS-> selectedChoices:`,
      //   selectedChoices,
      //   'optionsAvailable:',
      //   optionsAvailable,
      //   'hasSelection:',
      //   hasSelection
      // );
      setCurrentOptions(optionsAvailable);
    }
  }, [hasSelection, selectedChoices]);

  return (
    <select
      name={selectName}
      defaultValue={defaultOption}
      onChangeCapture={handleSelection}
      className='select-trait-option'
      {...register(selectName)}
    >
      <option>{defaultOption}</option>
      {currentOptions.map((opt, idx) => {
        return (
          <option key={idx} index={idx} value={opt}>
            {opt}
          </option>
        );
      })}
    </select>
  );
};

export const SelectRaceTraitGroup = ({ item, selection, register }) => {
  // console.log('In SelectRaceTraitGroup - selection:', selection, 'item:', item);

  let selections;

  if (selection.name === 'Half-Elf' && item.name === 'Ability Score Increase') {
    selections = Array.from({ length: item.total_choices }).map((_, idx) => (
      <SelectAbilityScoreOption
        key={idx}
        register={register}
        selection={selection}
        item={item}
        selectIdx={idx}
      />
    ));
  } else {
    selections = Array.from({ length: item.total_choices }).map((_, idx) => (
      <SelectRaceTraitOption
        key={idx}
        register={register}
        selection={selection}
        item={item}
        selectIdx={idx}
      />
    ));
  }

  return <div>{selections}</div>;
};
