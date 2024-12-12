import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  skillsUpdated,
  toolsUpdated,
  selectClassFeature,
  selectClassFeatureOptions,
  asiUpdated,
  expertiseSkillsUpdated,
} from '../slices/characterBuilderSlice';

export const SelectSkill = ({
  register,
  item,
  selection,
  selectIdx,
  onSelect,
}) => {
  const dispatch = useDispatch();
  const selectedChoices = useSelector(
    (state) => state.character.skills_selected
  );
  const optionsAvailable = useSelector(
    (state) => state.character.skill_options_available
  );
  const [currentOptions, setCurrentOptions] = useState(optionsAvailable);
  const [selectionValue, setSelectionValue] = useState('');
  const [hasSelection, setHasSelection] = useState(false);

  const nameLength = item.name.length - 1;
  const shortenedName = item.name.slice(0, nameLength);
  const selectName =
    item.total_choices > 1 ? `${item.name}-${selectIdx}` : item.name;
  const defaultOption =
    item.name === undefined
      ? '- Choose an Option -'
      : `- Choose a ${selection.name}'s ${shortenedName} -`;

  const handleSelection = function (e) {
    const capturedValue = e.target.value;
    // console.log('in handleSelect of Select2.jsx:', capturedValue);
    setSelectionValue(capturedValue);
    setHasSelection((prevState) => !prevState);
    onSelect(capturedValue);
    dispatch(
      skillsUpdated({
        skill: capturedValue,
        total_choices: item.total_choices,
      })
    );
  };

  useEffect(() => {
    if (!hasSelection && selectedChoices.length > 0) {
      setCurrentOptions(optionsAvailable);
    }

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
  }, [hasSelection, selectedChoices]);

  return (
    <select
      name={selectName}
      defaultValue={defaultOption}
      // onChange={handleSelection}
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

export const SelectToolProficiency = ({
  register,
  item,
  selection,
  selectIdx,
  onSelect,
}) => {
  const dispatch = useDispatch();
  const selectedChoices = useSelector(
    (state) => state.character.tools_selected
  );
  const toolsAvailable = useSelector(
    (state) => state.character.tool_options_available
  );
  const [currentOptions, setCurrentOptions] = useState(toolsAvailable);
  const [selectionValue, setSelectionValue] = useState('');
  const [hasSelection, setHasSelection] = useState(false);

  const nameLength = item.name.length - 1;
  const subnameLength = item.subname ? item.subname.length - 1 : null;
  const shortenedName =
    subnameLength !== null
      ? item.subname.slice(0, subnameLength)
      : item.name.slice(0, nameLength);
  const selectName =
    item.total_choices > 1 ? `${item.name}-${selectIdx}` : item.name;
  const defaultOption =
    item.name === undefined
      ? '- Choose an Option -'
      : `- Choose a ${selection.name}'s ${shortenedName} -`;

  const handleSelection = function (e) {
    const capturedValue = e.target.value;
    // console.log('in handleSelect of Select2.jsx:', capturedValue);
    setSelectionValue(capturedValue);
    setHasSelection((prevState) => !prevState);
    onSelect(capturedValue);
    dispatch(
      toolsUpdated({
        tool: capturedValue,
        total_choices: item.total_choices,
      })
    );
  };

  useEffect(() => {
    if (!hasSelection && selectedChoices.length > 0) {
      setCurrentOptions(toolsAvailable);
    }

    // console.log(
    //   `in ${selectName} - useEffect redux state -> selectedChoices:`,
    //   selectedChoices,
    //   'toolsAvailable:',
    //   toolsAvailable,
    //   'hasSelection:',
    //   hasSelection,
    //   'selectionValue:',
    //   selectionValue
    // );
  }, [hasSelection, selectedChoices]);

  // console.log('in SelectToolProficiency:', currentOptions);

  return (
    <select
      name={selectName}
      defaultValue={defaultOption}
      // onChange={handleSelection}
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

export const SelectClassFeatureOptions = ({
  register,
  item,
  selection,
  selectIdx,
  onSelect,
}) => {
  const dispatch = useDispatch();
  const character = useSelector((state) => state.character);
  let selected;

  if (item.name === 'Favored Enemy') {
    selected = character.favored_enemy_selected;
  } else {
    selected = character.natural_explorer_selected;
  }

  const [currentOptions, setCurrentOptions] = useState(item.choices);
  const [selectionValue, setSelectionValue] = useState('');
  const [hasSelection, setHasSelection] = useState(false);

  const nameLength = item.name.length - 1;
  const subnameLength = item.subname ? item.subname.length - 1 : null;
  const shortenedName =
    subnameLength !== null
      ? item.subname.slice(0, subnameLength)
      : item.name.slice(0, nameLength);
  const selectName =
    item.total_choices > 1 ? `${item.name}-${selectIdx}` : item.name;
  const defaultOption =
    item.name === undefined
      ? '- Choose an Option -'
      : `- Choose a ${selection.name}'s ${shortenedName} -`;

  const handleSelection = function (e) {
    const capturedValue = e.target.value;
    // console.log(
    //   'in handleSelection of SelectClassFeatureOptions - capturedValue:',
    //   capturedValue
    // );
    setSelectionValue(capturedValue);
    setHasSelection((prevState) => !prevState);
    onSelect(capturedValue);
    dispatch(
      selectClassFeatureOptions({
        featureName: item.name,
        selection: capturedValue,
      })
    );
  };

  console.log('selected:', selected);

  return (
    <select
      name={selectName}
      defaultValue={defaultOption}
      // onChange={handleSelection}
      onChangeCapture={handleSelection}
      className='select-trait-option'
      {...register(selectName)}
    >
      <option>{defaultOption}</option>

      {currentOptions.map((opt, idx) => {
        return (
          <option
            key={idx}
            index={idx}
            value={opt}
            style={
              selected.indexOf(opt) !== -1
                ? {
                    display: 'none',
                  }
                : { display: 'block' }
            }
          >
            {opt}
          </option>
        );
      })}
    </select>
  );
};

export const SelectClassFeature = ({ register, item, selection }) => {
  const dispatch = useDispatch();

  // console.log('in SelectClassFeature - item:', item, 'selection:', selection);
  let options;
  if (item.name === 'Fighting Style') {
    options = item.choices.map((choice) => choice.name);
  } else {
    options = item.choices;
  }

  const [currentOptions, setCurrentOptions] = useState(options);
  const [selectionValue, setSelectionValue] = useState('');

  const nameLength = item.name.length - 1;
  const subnameLength = item.subname ? item.subname.length - 1 : null;
  const shortenedName =
    subnameLength !== null
      ? item.subname.slice(0, subnameLength)
      : item.name.slice(0, nameLength);
  const defaultOption =
    item.name === undefined
      ? '- Choose an Option -'
      : `- Choose a ${selection.name}'s ${shortenedName} -`;

  const handleSelection = function (e) {
    const capturedValue = e.target.value;
    // console.log('in handleSelect of Select2.jsx:', capturedValue);
    setSelectionValue(capturedValue);
    dispatch(
      selectClassFeature({ featureName: item.name, selection: capturedValue })
    );
  };

  // console.log(
  //   'in SelectClassFeature - item:',
  //   item,
  //   'currentOptions:',
  //   currentOptions
  // );

  return (
    <select
      name={item.name}
      defaultValue={defaultOption}
      // onChange={handleSelection}
      onChangeCapture={handleSelection}
      className='select-trait-option'
      {...register(item.name)}
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

export const SelectExpertiseSkills = ({
  register,
  item,
  selection,
  onSelect,
  selectIdx,
}) => {
  const dispatch = useDispatch();
  const selectedChoices = useSelector(
    (state) => state.character.expertise_selected
  );
  const optionsAvailable = useSelector(
    (state) => state.character.expertise_available
  );
  const [currentOptions, setCurrentOptions] = useState(optionsAvailable);
  const [selectionValue, setSelectionValue] = useState('');
  const [hasSelection, setHasSelection] = useState(false);

  const nameLength = item.name.length - 1;
  const subnameLength = item.subname ? item.subname.length - 1 : null;
  const shortenedName =
    subnameLength !== null
      ? item.subname.slice(0, subnameLength)
      : item.name.slice(0, nameLength);
  const selectName =
    item.total_choices > 1 ? `${item.name}-${selectIdx}` : item.name;
  const defaultOption =
    item.name === undefined
      ? '- Choose an Option -'
      : `- Choose a ${selection.name}'s ${shortenedName} -`;

  const handleSelection = function (e) {
    const capturedValue = e.target.value;
    // console.log('in handleSelect of Select2.jsx:', capturedValue);
    setSelectionValue(capturedValue);
    setHasSelection((prevState) => !prevState);
    onSelect(capturedValue);
    dispatch(
      expertiseSkillsUpdated({
        skill: capturedValue,
        total_choices: item.total_choices,
      })
    );
  };

  useEffect(() => {
    if (!hasSelection && selectedChoices.length > 0) {
      setCurrentOptions(optionsAvailable);
    }

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
  }, [hasSelection, selectedChoices]);

  return (
    <select
      name={selectName}
      defaultValue={defaultOption}
      // onChange={handleSelection}
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

export const SelectAbilityScores = ({
  register,
  item,
  selection,
  onSelect,
  selectIdx,
}) => {
  const dispatch = useDispatch();
  const selectedChoices = useSelector((state) => state.character.asi_selected);
  const optionsAvailable = useSelector(
    (state) => state.character.asi_options_available
  );
  const [currentOptions, setCurrentOptions] = useState(optionsAvailable);
  const [selectionValue, setSelectionValue] = useState('');
  const [hasSelection, setHasSelection] = useState(false);

  const nameLength = item.name.length - 1;
  const subnameLength = item.subname ? item.subname.length - 1 : null;
  const shortenedName =
    subnameLength !== null
      ? item.subname.slice(0, subnameLength)
      : item.name.slice(0, nameLength);
  const selectName =
    item.total_choices > 1 ? `${item.name}-${selectIdx}` : item.name;
  const defaultOption =
    item.name === undefined
      ? '- Choose an Option -'
      : `- Choose a ${selection.name}'s ${shortenedName} -`;

  const handleSelection = function (e) {
    const capturedValue = e.target.value;
    // console.log('in handleSelect of Select2.jsx:', capturedValue);
    setSelectionValue(capturedValue);
    setHasSelection((prevState) => !prevState);
    onSelect(capturedValue);
    dispatch(
      asiUpdated({
        ability: capturedValue,
        total_choices: item.total_choices,
      })
    );
  };

  useEffect(() => {
    if (!hasSelection && selectedChoices.length > 0) {
      setCurrentOptions(optionsAvailable);
    }

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
  }, [hasSelection, selectedChoices]);

  return (
    <select
      name={selectName}
      defaultValue={defaultOption}
      // onChange={handleSelection}
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
