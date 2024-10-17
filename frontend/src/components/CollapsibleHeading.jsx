import React from 'react';
import Card from 'react-bootstrap/Card';
import ContextAwareToggle from './ContextAwareToggle';

const CollapsibleHeading = ({
  item,
  selection,
  isModal,
  isRace,
  eventKey,
  label,
}) => {
  return (
    <Card.Header className='selection-header'>
      <ContextAwareToggle
        eventKey={eventKey}
        item={item}
        isModal={isModal}
        selection={selection}
        isOpen={{ icon: 'fa-solid fa-chevron-up', color: 'green' }}
        isClosed={{ icon: 'fa-solid fa-chevron-down', color: 'purple' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>{item.name}</span>
          <span style={{ fontSize: '12px' }}>level {item.level}</span>
        </div>
      </ContextAwareToggle>
    </Card.Header>
  );
};

export default CollapsibleHeading;
