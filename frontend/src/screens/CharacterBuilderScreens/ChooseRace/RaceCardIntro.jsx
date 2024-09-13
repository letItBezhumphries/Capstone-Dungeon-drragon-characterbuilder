import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col } from 'react-bootstrap';

const RaceCardIntro = ({ isModal, selection, isLoading }) => {
  return (
    <>
      <Row className={isModal ? 'confirmation-primary' : 'overview-primary'}>
        <Col
          xs={'auto'}
          md={8}
          className={isModal ? 'confirmation-info' : 'selection-info'}
        >
          <div className='form-page-header'>
            {selectedRace ? raceData.name : selection.name}
          </div>
          <p className='description'>
            {!isLoading ? selection.desc : 'NEED TO PUT LOADER'}
          </p>
          {!isModal ? (
            <p className='traitlist'>
              <strong>{isRace ? `Race Traits:` : null}</strong>
              <span>
                {selection.traitNames.length > 0
                  ? `${selection.traitNames.join(', ')}`
                  : null}
              </span>
            </p>
          ) : null}
        </Col>
        <Col
          xs={'auto'}
          md={2}
          className={isModal ? 'confirmation-aside' : 'selection-aside'}
        >
          <img
            src={selection.imgSrc}
            className={isModal ? 'confirmation-img' : 'selection-img'}
          />
          {/* MIGHT NEED TO ADD redux action here */}
          {!isModal ? (
            <LinkContainer to='/character/chrace'>
              <button className='change-race-btn'>Change Race</button>
            </LinkContainer>
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default RaceCardIntro;
