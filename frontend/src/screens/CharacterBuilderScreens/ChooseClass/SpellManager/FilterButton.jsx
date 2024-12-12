import { styled } from 'styled-components';
import { useState, useRef, useEffect } from 'react';

const FilterButtonOuter = styled.div`
  background: #96bf6b;
  color: #96bf6b;
  margin-bottom: 0.3125rem;
  margin-right: 0.3125rem;

  & :hover {
    box-shadow: 0 0 6px #395a16;
  }
`;

const Button = styled.button`
  background-color: #fff;
  border-color: #96bf6b;
  color: #96bf6b;
  width: 100%;
  min-width: 1.875rem;
  font-size: 0.875rem;
  gap: 0.375rem;
  padding: 0.313rem 0.75rem;
  align-items: center;
  border: 0.063rem solid;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  font-weight: 500;
  justify-content: center;
  letter-spacing: normal;
  line-height: 1.7333;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 0.25s;

  ${
    '' /* & :hover {
    box-shadow: 0 0 6px #395a16;
  } */
  }

  &:focus {
    outline: none;
  }
`;

const ButtonText = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: center;

  &:hover {
    box-shadow: none;
  }

  &:hover span {
    box-shadow: none;
  }
`;

const SmallText = styled.span`
  font-size: 0.4375rem;
  line-height: 1;
  margin-top: 0.3125rem;
`;

const SelectedFilterButtonOuter = styled.div`
  background: #96bf6b;
  border-color: #96bf6b;
  color: #fff;
  margin-bottom: 0.3125rem;
  margin-right: 0.3125rem;

  & :hover {
    box-shadow: 0 0 6px #395a16;
  }
`;

const SelectedButton = styled.button`
  background-color: #96bf6b;
  border-color: #96bf6b;
  color: #fff;
  width: 100%;
  min-width: 1.875rem;
  font-size: 0.875rem;
  gap: 0.375rem;
  padding: 0.313rem 0.75rem;
  align-items: center;
  border: 0.063rem solid;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  font-weight: 500;
  justify-content: center;
  letter-spacing: normal;
  line-height: 1.7333;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 0.25s;

  ${
    '' /* & :hover {
    box-shadow: 0 0 6px #395a16;
  } */
  }

  &:focus {
    outline: none;
  }
`;

const FilterButton = ({ level, text, click, activeFilterLevels }) => {
  const [isSelected, setIsSelected] = useState(false);

  console.log(
    'in FilterButton.jsx - activeFilterLevels:',
    activeFilterLevels,
    'isSelected:',
    isSelected
  );

  const handleFilterSelect = () => {
    setIsSelected((prevState) => !prevState);
    click(level);
  };

  return (
    <>
      {isSelected ? (
        <SelectedFilterButtonOuter>
          <SelectedButton onClick={handleFilterSelect} type='button'>
            {level === 0 ? (
              '- 0 -'
            ) : (
              <ButtonText>
                <span>{text.split('-')[0].slice(0, 1)}</span>
                <SmallText>{text.split('-')[0].slice(1)}</SmallText>
              </ButtonText>
            )}
          </SelectedButton>
        </SelectedFilterButtonOuter>
      ) : (
        <FilterButtonOuter>
          <Button onClick={handleFilterSelect} type='button'>
            {level === 0 ? (
              '- 0 -'
            ) : (
              <ButtonText>
                <span>{text.split('-')[0].slice(0, 1)}</span>
                <SmallText>{text.split('-')[0].slice(1)}</SmallText>
              </ButtonText>
            )}
          </Button>
        </FilterButtonOuter>
      )}
    </>
  );
};

export default FilterButton;
