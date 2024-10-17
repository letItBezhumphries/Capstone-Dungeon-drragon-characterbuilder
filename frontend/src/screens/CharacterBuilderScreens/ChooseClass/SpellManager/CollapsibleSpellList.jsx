import { styled } from 'styled-components';
import ContextAwareToggle from '../../../../components/ContextAwareToggle';
import { AccordionCollapse, Card } from 'react-bootstrap';

const CollapsibleList = styled(Card)`
  padding: 0px 0px;
`;

const CollapsibleHeader = styled(Card.Header)`
  align-items: center;
  background: #f1f1f1;
  cursor: pointer;
  display: flex;
  padding: 0px 0px;
  min-height: 45px;
`;

const SpellListHeading = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1;
  font-size: 15px;
  font-weight: 700;
`;

const CollapsibleBody = styled(AccordionCollapse)`
  width: 100%;
  padding: 10px;
`;

const CollapsibleSpellList = (props) => {
  const { heading, eventKey, label, children } = props;
  return (
    <>
      <CollapsibleList>
        <CollapsibleHeader>
          <ContextAwareToggle
            isModal={false}
            eventKey={eventKey}
            isOpen={{ icon: 'fa-solid fa-minus fa-2xl', color: 'green' }}
            isClosed={{ icon: 'fa-solid fa-plus fa-2xl', color: 'green' }}
            isSpellSelector={true}
            item={{}}
          >
            <SpellListHeading>{heading}</SpellListHeading>
          </ContextAwareToggle>
        </CollapsibleHeader>
      </CollapsibleList>
      <CollapsibleBody eventKey={eventKey}>{children}</CollapsibleBody>
    </>
  );
};

export default CollapsibleSpellList;
