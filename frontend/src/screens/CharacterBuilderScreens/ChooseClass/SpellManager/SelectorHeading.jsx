import { styled } from 'styled-components';
import { AccordionHeader, Card } from 'react-bootstrap';
import ContextAwareToggle from '../../../../components/ContextAwareToggle';

const SelectionHeader = styled(Card.Header)`
  border: none;
  width: 100%;
  padding: 0 0 !important;
  margin: 0 0;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.1;
`;

const FilterHeader = styled(AccordionHeader)`
  border: none;
  width: 100%;
  height: 100%;
  padding: 0 0 !important;
  margin: 0 0;

  & button,
  & button:focus {
    border: none;
    outline: none;
    display: flex;
    font-size: 15px;
    font-weight: 700;
    padding: 0px 0px;
    height: 100%;
    background-color: transparent !important;

    & i {
      margin-left: 40px;
    }
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SelectorHeading = (props) => {
  const { item, selection, isModal, isRace, eventKey, children, isSpell } =
    props;
  return (
    <SelectionHeader>
      <ContextAwareToggle
        eventKey={eventKey}
        item={item}
        isModal={isModal}
        selection={selection}
        isOpen={{ icon: 'fa-solid fa-chevron-up', color: 'purple' }}
        isClosed={{ icon: 'fa-solid fa-chevron-down', color: 'purple' }}
        isSpell={isSpell}
      >
        <HeadingContainer>{children}</HeadingContainer>
      </ContextAwareToggle>
    </SelectionHeader>
  );
};

export const FilterSelector = (props) => {
  const { item, selection, isModal, eventKey, children, isFilter } = props;
  return (
    <FilterHeader>
      <div>{children}</div>
      <ContextAwareToggle
        eventKey={eventKey}
        item={item}
        isModal={isModal}
        selection={selection}
        isOpen={{ icon: 'fa-solid fa-chevron-up', color: '#96bf6b' }}
        isClosed={{ icon: 'fa-solid fa-chevron-down', color: '#96bf6b' }}
        isFilter={isFilter}
      ></ContextAwareToggle>
    </FilterHeader>
  );
};

export default SelectorHeading;
