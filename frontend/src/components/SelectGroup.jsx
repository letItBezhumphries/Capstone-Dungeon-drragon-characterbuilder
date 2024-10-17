import {
  SelectSkill,
  SelectToolProficiency,
  SelectAbilityScores,
  SelectExpertiseSkills,
  SelectClassFeatureOptions,
} from './Select';
import { styled } from 'styled-components';

const GroupContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;

  & select {
    margin-top: 10px;
  }
`;

export const SelectProficiencyGroup = ({ register, item, introData }) => {
  // console.log(
  //   'in SelectProficiencyGroup - item:',
  //   item,
  //   'item.name:',
  //   item.name
  // );

  const handleOptionSelected = function (option) {
    console.log(
      'in SelectProficiencyGroup - handleOptionSelected - option:',
      option
    );
  };

  let selections;

  if (item.name === 'skills') {
    selections = Array.from({ length: item.total_choices }).map((_, idx) => (
      <SelectSkill
        key={idx}
        onSelect={handleOptionSelected}
        register={register}
        selection={introData}
        item={item}
        selectIdx={idx}
      />
    ));
  } else if (item.name === 'Tool Proficiency') {
    selections = Array.from({ length: item.total_choices }).map((_, idx) => (
      <SelectToolProficiency
        key={idx}
        onSelect={handleOptionSelected}
        register={register}
        selection={introData}
        item={item}
        selectIdx={idx}
      />
    ));
  }
  return <GroupContainer>{selections}</GroupContainer>;
};

export const SelectClassFeatureGroup = ({ register, item, introData }) => {
  // console.log('in SelectClassFeatureGroup - item:', item);

  const handleOptionSelected = function (option) {
    console.log(
      'in SelectClassFeatureGroup - handleOptionSelected - option:',
      option
    );
  };

  let selections;

  if (item.name === 'Expertise') {
    selections = Array.from({ length: item.total_choices }).map((_, idx) => (
      <SelectExpertiseSkills
        key={idx}
        onSelect={handleOptionSelected}
        register={register}
        selection={introData}
        item={item}
        selectIdx={idx}
      />
    ));
  } else if (item.name === 'Ability Score Improvement') {
    selections = Array.from({ length: item.total_choices }).map((_, idx) => (
      <SelectAbilityScores
        key={idx}
        onSelect={handleOptionSelected}
        register={register}
        selection={introData}
        item={item}
        selectIdx={idx}
      />
    ));
  } else {
    selections = Array.from({ length: item.total_choices }).map((_, idx) => (
      <SelectClassFeatureOptions
        key={idx}
        onSelect={handleOptionSelected}
        register={register}
        selection={introData}
        item={item}
        selectIdx={idx}
      />
    ));
  }

  return <GroupContainer>{selections}</GroupContainer>;
};
