import { useContext } from 'react';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { styled } from 'styled-components';

const IconBox = styled.div`
  cursor: pointer;
  height: 100%;
  margin-right: 15px;
  min-width: 26px;
  width: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CollapseButton = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1;
  height: 45px;
  font-size: 15px;
  font-weight: 700;
  padding-left: 10px;
`;

// is open is an object { icon: 'fa-solid fa-chevron-up', color: 'white' }

function ContextAwareToggle({
  children,
  eventKey,
  callback,
  item,
  isModal,
  isSpellSelector,
  isOpen,
  isClosed,
  isSpell,
}) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  let class_name;

  if (isModal) {
    class_name = 'collapse-modal-button';
  } else {
    if (item.choices) {
      class_name = 'collapse-button-todo';
    } else {
      class_name = 'collapse-button';
    }
  }

  const isCurrentEventKey = activeEventKey === eventKey;

  // console.log(
  //   'item in ContextAwareToggle:',
  //   class_name,
  //   'isCurrentEventKey:',
  //   isCurrentEventKey
  // );

  let content;

  if (isSpellSelector) {
    content = (
      <CollapseButton
        onClick={decoratedOnClick}
        style={
          isCurrentEventKey
            ? { borderLeft: '4px solid green', height: '45px' }
            : { border: 'none' }
        }
      >
        {children}
        <IconBox>
          {isCurrentEventKey ? (
            <i className={isOpen.icon} style={{ color: isOpen.color }}></i>
          ) : (
            <i className={isClosed.icon} style={{ color: isClosed.color }}></i>
          )}
        </IconBox>
      </CollapseButton>
    );
  } else {
    content = (
      <div className={class_name} onClick={decoratedOnClick}>
        {children}
        <div className='collapse-icon-box'>
          {isCurrentEventKey ? (
            <i className={isOpen.icon} style={{ color: isOpen.color }}></i>
          ) : (
            <i className={isClosed.icon} style={{ color: isClosed.color }}></i>
          )}
        </div>
      </div>
    );
  }

  return content;
}

export default ContextAwareToggle;
