import { Row, Col } from 'react-bootstrap';
import CollapsibleList from './CollapsibleList';
import { useSelector } from 'react-redux';

const ModalSelectionList = ({ isModal, selection, register }) => {
  const race = useSelector((state) => state.character.selected_race);

  let raceData;
  let listItems;
  if (isModal) {
    listItems = selection.traits;
    raceData = selection;
  } else {
    listItems = race.traits;
    raceData = race;
  }

  // console.log(
  //   `in ModalSelectionLIst, when Modal: ${isModal} - selection:`,
  //   selection,
  //   '\nlistitems:',
  //   listItems
  // );

  return (
    <Row className='full-width-row'>
      <Col className='full-width-col'>
        {isModal ? (
          <h3 className='secondary-title'>{`${selection.name} Traits`}</h3>
        ) : null}

        <div className='secondary-detailslist'>
          {isModal ? (
            <CollapsibleList
              items={listItems}
              isModal={true}
              selection={raceData}
              isRace={true}
            />
          ) : (
            <CollapsibleList
              items={listItems}
              isModal={false}
              isRace={true}
              selection={raceData}
              register={register}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default ModalSelectionList;
