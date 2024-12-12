import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Button, RemoveButton, DisabledButton } from './SpellSelector';
import {
  SpellAddedToast,
  SpellRemovedToast,
} from '../../../../components/Toast';

const SpellDetailsHeader = styled.div`
  font-style: italic;
`;

const SpellPropertiesContainer = styled.div`
  border-top: 1px solid #eaeaea;
  margin-top: 10px;
  padding-top: 10px;

  &:first-child {
    margin-top: 0;
  }
`;

const SpellInfoItem = styled.div`
  margin: 0.375rem 0;
  display: flex;
`;

const PropertyLabel = styled.p`
  color: #12181c;
  font-weight: 700;
  margin: 0px 5px 0px 0px;
  font-size: 0.813rem;
  line-height: 1.3;
  opacity: 0.9;
`;

const PropertyValue = styled.p`
  font-weight: 300;
  margin: 0px 0px;
  font-size: 0.813rem;
  line-height: 1.3;

  & span {
    font-style: italic;
  }
`;

const DescriptionSection = styled.div`
  border-top: 1px solid #eaeaea;
  margin-top: 10px;
  padding-top: 10px;
`;

const Description = styled.p`
  & strong {
    margin-right: 10px;
  }
`;

const SpellActions = styled.div`
  border-top: 1px solid #f1f1f1;
  display: flex;
  justify-content: center;
  margin: 10px 0 0;
  padding-top: 10px;
`;

const SpellCard = ({
  spell,
  register,
  characterLevel,
  eventKey,
  selection,
  learnClick,
  removeClick,
  hasBeenSelected,
  handleSelection,
  isDisabled,
}) => {
  const onLearnBtnClick = () => {
    learnClick(spell);
    handleSelection(hasBeenSelected);
    SpellAddedToast(spell.name, selection.name);
  };

  const onRemoveBtnClick = () => {
    removeClick(spell);
    handleSelection(hasBeenSelected);
    SpellRemovedToast(spell.name, selection.name);
  };

  return (
    <div>
      <SpellDetailsHeader>
        {spell.school} {spell.level}
      </SpellDetailsHeader>
      <SpellPropertiesContainer>
        <SpellInfoItem>
          <PropertyLabel>Casting Time:</PropertyLabel>
          <PropertyValue>{spell.casting_time}</PropertyValue>
        </SpellInfoItem>
        <SpellInfoItem>
          <PropertyLabel>Range/Area:</PropertyLabel>
          <PropertyValue>{spell.range}</PropertyValue>
        </SpellInfoItem>
        <SpellInfoItem>
          <PropertyLabel>Components:</PropertyLabel>
          <PropertyValue>
            {spell.components}
            {spell.material.length > 0 ? (
              <span> ({spell.material})</span>
            ) : null}
          </PropertyValue>
        </SpellInfoItem>
        <SpellInfoItem>
          <PropertyLabel>Duration:</PropertyLabel>
          <PropertyValue>
            {spell.requires_concentration ? 'Concentration, ' : null}
            {spell.duration}
          </PropertyValue>
        </SpellInfoItem>
        <SpellInfoItem>
          <PropertyLabel>Source:</PropertyLabel>
          <PropertyValue>
            <span>Player's Handbook (2014), </span>
            pg {spell.page.split(' ')[1]}
          </PropertyValue>
        </SpellInfoItem>
        <DescriptionSection>
          <Description>{spell.desc}</Description>
          {spell.higher_level ? (
            <Description>
              <em>
                <strong>At Higher Levels:</strong>
              </em>
              {spell.higher_level}
            </Description>
          ) : null}
        </DescriptionSection>
      </SpellPropertiesContainer>
      <SpellActions>
        {hasBeenSelected ? (
          <RemoveButton onClick={onRemoveBtnClick}>
            <i className='fa-solid fa-x'></i>
            Remove
          </RemoveButton>
        ) : isDisabled ? (
          <DisabledButton>LEARN</DisabledButton>
        ) : (
          <Button onClick={onLearnBtnClick}>LEARN</Button>
        )}
      </SpellActions>
    </div>
  );
};

export default SpellCard;
