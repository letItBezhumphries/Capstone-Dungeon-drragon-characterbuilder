import { styled } from 'styled-components';
import { Card, AccordionCollapse } from 'react-bootstrap';
import CollapsibleContent from './CollapsibleContent';
import ContextAwareToggle from './ContextAwareToggle';
import './Selector.css';

const Header = styled(Card.Header)`
  width: 100%;
  display: flex;
`;

const HeaderIcon = styled.div`
  background: 50% transparent no-repeat;
  background-size: 28px 28px;
  height: 32px;
  margin-right: 5px;
  width: 32px;
`;

const PrimaryHeading = styled.div`
  font-family: 'Roboto', 'Helvetica', 'sans-serif';
  font-size: 15px;
  font-weight: 600;
  line-height: 1.1;
  color: black;
  width: 100%;
`;

const HeadingContainer = styled.div`
  width: 88%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SecondaryHeading = styled.div`
  color: rgba(18, 24, 28, 0.639);
  display: flex;
  flex-wrap: wrap;
  font-family: Roboto, Helvetica, sans-serif;
  font-size: 11px;
  line-height: 1;
  margin-top: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const Selector = ({
  item,
  register,
  introData,
  characterLevel,
  isSpellSelector,
}) => {
  // console.log('in Selector item:', item);

  return (
    <Card
      className={
        item.choices === undefined
          ? 'selection-item'
          : item.choices
          ? 'selection-item-todo'
          : 'modal-selection-item'
      }
    >
      <Card.Header>
        <ContextAwareToggle
          eventKey={`${item.name}`}
          item={item}
          register={register}
          isModal={false}
          isOpen={{ icon: 'fa-solid fa-chevron-up', color: 'purple' }}
          isClosed={{ icon: 'fa-solid fa-chevron-down', color: 'purple' }}
        >
          <HeadingContainer>
            <PrimaryHeading>{item.name}</PrimaryHeading>
            <SecondaryHeading>
              {item.total_choices ? (
                <span>{item.total_choices} Choices &nbsp; &#8226; &nbsp;</span>
              ) : null}
              Level {item.level}
            </SecondaryHeading>
          </HeadingContainer>
        </ContextAwareToggle>
      </Card.Header>
      <AccordionCollapse eventKey={`${item.name}`}>
        <CollapsibleContent
          item={item}
          register={register}
          introData={introData}
          characterLevel={characterLevel}
        />
      </AccordionCollapse>
    </Card>
  );
};

export default Selector;
