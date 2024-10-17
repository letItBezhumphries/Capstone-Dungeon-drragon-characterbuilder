import { Accordion, Card } from 'react-bootstrap';
import CollapsibleHeading from './CollapsibleHeading';
import CollapsibleContent from './CollapsibleContent';
import './CollapsibleList.css';

const ModalCollapsibleFeatures = ({
  items,
  selection,
  isModal,
  onFormReady,
  register,
}) => {
  // console.log(
  //   `in ModalCollapsibleFeatures - when Modal is ${isModal} - ITEMS`,
  //   items
  // );

  const renderList = () => {
    return items.map((item, idx) => (
      <Card key={idx}>
        <CollapsibleHeading
          eventKey={idx}
          item={item}
          selection={selection}
          isModal={true}
        />

        <Accordion.Collapse eventKey={idx}>
          <CollapsibleContent
            item={item}
            introData={selection}
            isModal={true}
            register={register}
          />
        </Accordion.Collapse>
      </Card>
    ));
  };

  return (
    <Accordion flush={true} className='collapsiblelist-container' alwaysOpen>
      {renderList()}
    </Accordion>
  );
};

export default ModalCollapsibleFeatures;
