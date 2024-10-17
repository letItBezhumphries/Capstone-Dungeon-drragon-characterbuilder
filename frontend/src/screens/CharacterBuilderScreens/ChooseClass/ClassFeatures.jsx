import React from 'react';
import { Accordion } from 'react-bootstrap';
import { styled } from 'styled-components';
import Selector from '../../../components/Selector';

const ClassFeaturesContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  padding: 0 0;
`;

const CollapsibleFeatures = styled(Accordion)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ClassFeatures = ({ items, introData, register, characterLevel }) => {
  // console.log('in ClassFeatures - items:', items);
  return (
    <ClassFeaturesContainer>
      <CollapsibleFeatures flush='true'>
        {items.map((item, idx) => (
          <Selector
            key={idx}
            item={item}
            register={register}
            introData={introData}
            characterLevel={characterLevel}
          />
        ))}
      </CollapsibleFeatures>
    </ClassFeaturesContainer>
  );
};

export default ClassFeatures;
