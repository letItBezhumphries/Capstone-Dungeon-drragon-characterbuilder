import { styled } from 'styled-components';
import Card from 'react-bootstrap/Card';
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

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CollapsibleHeading = (props) => {
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

export default CollapsibleHeading;
