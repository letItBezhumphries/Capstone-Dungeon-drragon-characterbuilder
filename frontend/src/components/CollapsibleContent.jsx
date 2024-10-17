import React from 'react';
import { Card } from 'react-bootstrap';
import { styled } from 'styled-components';
import { SelectProficiencyGroup, SelectClassFeatureGroup } from './SelectGroup';
import { SelectClassFeature } from './Select';

const CardBody = styled(Card.Body)`
  font-size: 14px;
  line-height: 1.7;
  min-height: 200px;
  padding: 0 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
`;

const ContentSection = styled.div`
  margin-bottom: 10px;
`;

const ContentList = styled.ul`
  margin-top: 10px;
  margin-left: 10px;
`;

const ListItem = styled.p`
  font-size: 14px;
  font-weight: 300;
  margin: 0 0 2px;
  padding: 0 0;
  width: 100%;
`;

const Title = styled.span`
  font-weight: 600;
  font-family: 'Roboto Condensed';
  font-size: 14px;
  margin-right: 5px;
`;

const Description = styled.div`
  background-color: plum;
  margin-bottom: 20px;
`;

const CollapsibleContent = ({
  item,
  register,
  introData,
  isModal,
  characterLevel,
}) => {
  // console.log('in CollapsibleContent - item:', item);

  let content;
  if (item.name === 'Hit Points') {
    content = (
      <ContentWrapper>
        <ListItem>
          <Title>Hit Dice:</Title>
          {item.hit_die} per {introData.name} level
        </ListItem>
        <ListItem>
          <Title>Hit Points at 1st Level:</Title>
          {item.hitpoints_at_1st_level}
        </ListItem>
        <ListItem>
          <Title>Hit Points at Higher Levels:</Title>
          {item.hitpoints_at_higher_levels}
        </ListItem>
      </ContentWrapper>
    );
  } else if (item.name === 'Proficiencies') {
    content = (
      <ContentWrapper>
        <ListItem>
          <Title>Armor:&nbsp;</Title>
          {item.armor}
        </ListItem>
        <ListItem>
          <Title>Weapons:&nbsp;</Title>
          {item.weapons}
        </ListItem>
        <ListItem>
          <Title>Tools:&nbsp;</Title>
          {item.tools.desc}
        </ListItem>
        <ListItem>
          <Title>Saving Throws:&nbsp;</Title>
          {item.saving_throws}
        </ListItem>
        <ListItem>
          <Title>Skills:&nbsp;</Title>
          {item.skills.desc}
        </ListItem>
        {!isModal ? (
          <>
            {item.choices.map((group, idx) => (
              <SelectProficiencyGroup
                item={group}
                key={idx}
                register={register}
                introData={introData}
                characterLevel={characterLevel}
              />
            ))}
          </>
        ) : null}
      </ContentWrapper>
    );
  } else if (item.name === 'Equipment') {
    content = (
      <ContentWrapper>
        <Description>{item.desc}</Description>
        <ContentList>
          {item.choices.map((ch, idx) => (
            <li key={idx} style={{ listStyleType: 'disc' }}>
              {ch.text.replaceAll('*', '')}
            </li>
          ))}
        </ContentList>
      </ContentWrapper>
    );
  } else if (item.name === 'Spellcasting') {
    let spellCastingSections = item.desc.split('\n').filter((s) => s !== '');
    // console.log('spellcasting:', spellCastingSections);
    content = (
      <ContentWrapper>
        {spellCastingSections.map((sect, idx) => (
          <ContentSection key={idx}>
            <Title>{sect.split('-')[0]} - </Title>
            <ListItem>{sect.split('-')[1]}</ListItem>
          </ContentSection>
        ))}
      </ContentWrapper>
    );
  } else {
    content = (
      <ContentWrapper>
        <Description>{item.desc}</Description>
        {!isModal && item.total_choices > 1 ? (
          <SelectClassFeatureGroup
            item={item}
            register={register}
            introData={introData}
            characterLevel={characterLevel}
          />
        ) : !isModal && item.total_choices === 1 ? (
          <SelectClassFeature
            item={item}
            selection={introData}
            register={register}
            characterLevel={characterLevel}
          />
        ) : null}
      </ContentWrapper>
    );
  }
  return <CardBody>{content}</CardBody>;
};

export default CollapsibleContent;
