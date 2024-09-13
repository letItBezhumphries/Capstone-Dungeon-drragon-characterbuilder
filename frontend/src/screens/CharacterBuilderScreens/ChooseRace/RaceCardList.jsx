import { Row, Col } from 'react-bootstrap';
import CollapsibleList from '../../../components/CollapsibleList';

const RaceCardList = ({ isModal, selection, isLoading, selectedRace }) => {
  console.log('in RaceCardList, selection:', selection);

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
              isModal={true}
              isLoading={isLoading}
              selection={selection}
              isRace={true}
            />
          ) : (
            <CollapsibleList
              items={selectedRace.traits}
              isModal={false}
              isLoading={isLoading}
              isRace={true}
              selection={selection}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default RaceCardList;
