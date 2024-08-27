import { useContext } from 'react';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { Badge } from 'react-bootstrap';

function ContextAwareToggle({ children, eventKey, callback, item, isModal }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  // console.log('item in ContextAwareToggle:', item);

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <>
      {!isModal && item.choices ? (
        <Badge className='select-alert-badge' bg='primary'>
          !
        </Badge>
      ) : null}
      <button
        type='button'
        className='collapse-button'
        style={{
          backgroundColor: isCurrentEventKey ? 'yellow' : 'green',
          color: isCurrentEventKey ? 'white' : 'black',
        }}
        onClick={decoratedOnClick}
      >
        {children}
        {isCurrentEventKey ? (
          <i className='fa-solid fa-chevron-up' style={{ fill: 'yellow' }}></i>
        ) : (
          <i
            className='fa-solid fa-chevron-down'
            style={{ fill: 'purple' }}
          ></i>
        )}
      </button>
    </>
  );
}

export default ContextAwareToggle;
