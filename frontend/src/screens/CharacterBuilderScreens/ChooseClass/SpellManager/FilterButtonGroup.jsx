import { useRef } from 'react';
import { styled } from 'styled-components';
import { getSpellFilterList } from '../../../../utility/getSpellFilterList';

const StyledAccordionBody = styled.div`
  width: 100%;
  padding: 0px 0px;
  margin: 0px 0px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;
`;

const FilterButton = styled.div`
  margin-bottom: 0.3125rem;
  margin-right: 0.3125rem;
`;

const Button = styled.div`
  background-color: #fff;
  border-color: #96bf6b;
  color: #96bf6b;
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

  & :hover {
    box-shadow: 0 0 2px #395a16;
  }
`;

const ButtonText = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: center;
`;

const SmallText = styled.span`
  font-size: 0.4375rem;
  line-height: 1;
  margin-top: 0.3125rem;
`;

const FilterButtonGroup = ({ spellLevelFilter, levels, click }) => {
  let spellLevels = getSpellFilterList(levels);

  console.log(
    'in FilterButtonGroup.jsx -> spellLevels:',
    spellLevels,
    'levels:',
    levels
  );

  const handleFilterSelect = (e) => {
    console.log(
      'in FilterButtonGroup.jsx handleFilterSelect -> e.target.value',
      e.target.value
    );
  };

  return (
    <StyledAccordionBody>
      {spellLevels.map((l, idx) => (
        <FilterButton key={idx}>
          <Button value={l.level} onClick={handleFilterSelect}>
            {l.level === 0 ? (
              '- 0 -'
            ) : (
              <ButtonText>
                <span>{l.text.split('-')[0].slice(0, 1)}</span>
                <SmallText>{l.text.split('-')[0].slice(1)}</SmallText>
              </ButtonText>
            )}
          </Button>
        </FilterButton>
      ))}
    </StyledAccordionBody>
  );
};

export default FilterButtonGroup;
