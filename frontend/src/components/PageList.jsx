import { Row, Col } from 'react-bootstrap';
import CollapsibleList from './CollapsibleList';

const PageList = ({
  isRace,
  isModal,
  selection,
  isLoading,
  selectedRace,
  selectedClass,
}) => {
  console.log(
    'in PageLIst, selection:',
    selection,
    'selectedClass:',
    selectedClass,
    'selectedRace:',
    selectedRace
  );

  let listItems;
  if (isRace) {
    listItems = selection.items;
  } else {
    listItems = selection.features;
  }

  return (
    <Row className='full-width-row'>
      <Col className='full-width-col'>
        {isModal ? (
          <h3 className='secondary-title'>{`${selection.name} Traits`}</h3>
        ) : null}

        <div className='secondary-detailslist'>
          {isModal ? (
            <CollapsibleList
              items={selection.traits}
              isModal={isModal}
              isLoading={isLoading}
              selection={selection}
              isRace={isRace}
            />
          ) : (
            <CollapsibleList
              items={selectedRace.traits}
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

export default PageList;
