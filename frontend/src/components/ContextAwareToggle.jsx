import { useContext } from 'react';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

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
      <button
        type='button'
        className={
          !isModal && item.choices ? 'collapse-button-todo' : 'collapse-button'
        }
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
