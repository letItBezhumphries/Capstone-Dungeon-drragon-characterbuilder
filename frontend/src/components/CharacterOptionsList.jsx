import { styled } from 'styled-components';
import CharacterOption from './CharacterOption';

const OptionsContainer = styled.div`
  margin: 0 auto;
  width: 85%;
`;

const CharacterOptionsList = ({
  options,
  onSelectOption,
  showConfirmationModal,
  optionSelected,
}) => {
  console.log('in CharacterOptionsList.jsx -> options:', options);

  return (
    <OptionsContainer>
      {options.map((opt, idx) => (
        <CharacterOption
          key={idx}
          // name={opt.name}
          // index={opt.index}
          // imgsrc={opt.imgSrc}
          option={opt}
          onSelectOption={onSelectOption}
          showConfirmationModal={showConfirmationModal}
          optionSelected={optionSelected}
          isRace={true}
        />
      ))}
    </OptionsContainer>
  );
};

export default CharacterOptionsList;
