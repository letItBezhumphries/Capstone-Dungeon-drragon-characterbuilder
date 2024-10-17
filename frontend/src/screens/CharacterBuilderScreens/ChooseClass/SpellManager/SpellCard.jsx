import { styled } from 'styled-components';
import { Button } from './SpellSelector';

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
  flex-wrap: no-wrap;
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

const SpellDescription = styled.div`
  border-top: 1px solid #eaeaea;
  margin-top: 10px;
  padding-top: 10px;

  & ${SpellInfoItem} {
    margin-top: 10px;
  }
`;

// const SpellTags = styled.div`
//   border-top: 1px solid #eaeaea;
//   display: flex;
//   margin-top: 10px;
//   padding-top: 10px;
// `;

const SpellActions = styled.div`
  border-top: 1px solid #f1f1f1;
  display: flex;
  justify-content: center;
  margin: 10px 0 0;
  padding-top: 10px;
`;

const SpellCard = ({ item, register, characterLevel, eventKey, selection }) => {
  return (
    <div>
      <SpellDetailsHeader>
        {item.school} &#8226; {item.level}
      </SpellDetailsHeader>
      <SpellPropertiesContainer>
        <SpellInfoItem>
          <PropertyLabel>Casting Time:</PropertyLabel>
          <PropertyValue>{item.casting_time}</PropertyValue>
        </SpellInfoItem>
        <SpellInfoItem>
          <PropertyLabel>Range/Area:</PropertyLabel>
          <PropertyValue>{item.range}</PropertyValue>
        </SpellInfoItem>
        <SpellInfoItem>
          <PropertyLabel>Components:</PropertyLabel>
          <PropertyValue>
            {item.components}
            {item.material.length > 0 ? <span> ({item.material})</span> : null}
          </PropertyValue>
        </SpellInfoItem>
        <SpellInfoItem>
          <PropertyLabel>Duration:</PropertyLabel>
          <PropertyValue>
            {item.requires_concentration ? 'Concentration, ' : null}
            {item.duration}
          </PropertyValue>
        </SpellInfoItem>
        <SpellInfoItem>
          <PropertyLabel>Source:</PropertyLabel>
          <PropertyValue>
            <span>Player's Handbook (2014), </span>
            pg {item.page.split(' ')[1]}
          </PropertyValue>
        </SpellInfoItem>
        <SpellDescription>
          {item.desc}
          {item.higher_level ? (
            <SpellInfoItem>
              <PropertyLabel>At Higher Levels:</PropertyLabel>
              <PropertyValue>{item.higher_level}</PropertyValue>
            </SpellInfoItem>
          ) : null}
        </SpellDescription>
        {/* <SpellTags>
          <div>Tags:</div>
        </SpellTags> */}
      </SpellPropertiesContainer>
      <SpellActions>
        <Button>LEARN</Button>
      </SpellActions>
    </div>
  );
};

export default SpellCard;
