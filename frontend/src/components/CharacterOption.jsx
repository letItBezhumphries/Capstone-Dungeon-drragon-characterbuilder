import { styled } from 'styled-components';
import { useEffect, useRef } from 'react';

const SelectionContainer = styled.div`
  align-items: center;
  background-color: #fff;
  border: 1px solid #dedede;
  border-radius: 10px;
  display: flex;
  min-height: 53px;
  padding: 10px;
  margin-top: 5px;

  img {
    height: 40px;
    width: 40px;
    border-radius: 4px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const SelectionDetails = styled.details`
  margin-top: 5px;
  padding: 0px 0px;
  background-color: #fff;
  border-radius: 10px;

  summary {
    width: 100%;
    min-height: 53px;
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid black;

    img {
      height: 40px;
      width: 40px;
      border-radius: 4px;
      margin-right: 15px;
    }

    div {
      display: flex;
      padding: 0px 0px;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      h3 {
        display: flex;
        padding: 0px 0px;
        margin: 0px 0px;
        height: 100%;
        width: 100%;
        align-items: center;
        font-size: 18px;

        p {
          align-self: center;
          padding: 0px 0px;
          margin: 0px 0px;
          height: 100%;
          text-transform: uppercase;
          letter-spacing: 1.1px;
          margin-right: 5px;
        }
        span {
          padding: 0px 0px;
          margin: 0px 0px;
          color: #75838b;
        }
      }

      div {
        height: 24px;
        width: 24px;
      }
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

const SubracesContainer = styled.div`
  background-color: orange;
  padding: 30px;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const OptionHeading = styled.h3`
  flex: 1 1;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 1.1px;
  margin-bottom: 4px;
`;

const Subheading = styled.span`
  color: #75838b;
  font-size: 12px;
  font-weight: 400;
`;

const IconBox = styled.div`
  height: 24px;
  width: 24px;
`;

const CharacterOption = ({
  option,
  onSelectOption,
  isRace,
  optionSelected,
}) => {
  const { imgSrc, name, index, text, description, subraces } = option;
  const detailsRef = useRef(null);

  let optionElem;

  const handleSelectionClick = () => {
    onSelectOption(index);
  };

  if (!subraces) {
    optionElem = (
      <SelectionContainer onClick={handleSelectionClick}>
        <img
          src={imgSrc}
          alt={
            isRace
              ? `depiction of the race of ${name}`
              : `depiction of a ${name} class character`
          }
        />
        <OptionHeading>
          <Title>{name}</Title>
          {isRace ? (
            <Subheading>{!text ? "Player's Handbook (2014)" : null}</Subheading>
          ) : null}
        </OptionHeading>
        <IconBox>
          {optionSelected ? (
            <i className='fa-solid fa-chevron-down'></i>
          ) : (
            <i className='fa-solid fa-chevron-right'></i>
          )}
        </IconBox>
      </SelectionContainer>
    );
  } else {
    console.log('subraces:', subraces[0]);
    optionElem = (
      <SelectionDetails ref={detailsRef}>
        <summary>
          <img
            src={imgSrc}
            alt={
              isRace
                ? `depiction of the race of ${name}`
                : `depiction of a ${name} class character`
            }
          />
          <div>
            <h3>
              <p>{name}</p>
              <span>{`(${subraces.length})`}</span>
            </h3>
            <div>
              {optionSelected ? (
                <i className='fa-solid fa-chevron-down'></i>
              ) : (
                <i className='fa-solid fa-chevron-up'></i>
              )}
            </div>
          </div>
        </summary>
        <SubracesContainer>
          {subraces.map((subrace, idx) => {
            return (
              <CharacterOption
                key={idx}
                option={subrace}
                onSelectOption={onSelectOption}
                isRace={true}
                optionSelected={optionSelected}
              />
            );
          })}
        </SubracesContainer>
      </SelectionDetails>
    );
  }

  return optionElem;
};

export default CharacterOption;
