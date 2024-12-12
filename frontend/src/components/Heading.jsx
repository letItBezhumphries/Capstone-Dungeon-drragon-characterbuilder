import React from 'react';
import { styled } from 'styled-components';

export const MainHeading = styled.h3`
  margin-bottom: 20px;
  font-family: 'Roboto' 'sans-serif';
  font-size: 24px;
  font-weight: 400;
`;

const Heading = ({ text, classType, elem }) => {
  return (
    <>
      {!elem ? (
        <h3 className={classType}>{text}</h3>
      ) : (
        <elem className={classType}>{text}</elem>
      )}
    </>
  );
};

export default Heading;
