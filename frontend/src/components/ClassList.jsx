import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import CollapsibleList from './CollapsibleList';

const ClassList = ({ isRace, isModal, selection, isLoading, selectedRace }) => {
  let classItems;
  if (!isLoading) {
    classItems = selection.features;
  }

  return (
    <Row className='full-width-row'>
      <Col className='full-width-col'>
        {isModal ? (
          <h3 className='secondary-title'>
            {isRace ? `${selection.name} Traits` : null}
          </h3>
        ) : null}

        <div className='secondary-detailslist'>
          {isRace && selection.traits.length > 0 ? (
            <CollapsibleList
              items={selection.traits}
              isModal={isModal}
              isLoading={isLoading}
              selection={selection}
              isRace={isRace}
            />
          ) : (
            <CollapsibleList
              items={classItems}
              isModal={isModal}
              isLoading={isLoading}
              isRace={isRace}
              selection={selection}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default ClassList;
