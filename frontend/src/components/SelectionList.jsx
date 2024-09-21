import { Row, Col } from 'react-bootstrap';
import CollapsibleList from './CollapsibleList';
import { useSelector } from 'react-redux';

const SelectionList = ({ isRace, isModal, selection, isLoading, register }) => {
  const filteredRace = useSelector((state) => state.character.race_filter);
  const filteredClass = useSelector((state) => state.character.class_filter);

  // console.log(`in SelectionList, when Modal is ${isModal} - selection:`, selection);

  let listItems;
  if (isRace) {
    if (isModal) {
      listItems = selection.traits;
    } else {
      listItems = filteredRace.traits;
    }
  } else {
    if (isModal) {
      listItems = [
        ...selection.features,
        { ...selection.proficiencies, name: 'Proficiencies' },
        { ...selection.hit_points, name: 'Hit Points' },
      ];

      if (selection?.equipment) {
        listItems.push({ ...selection.equipment, name: 'Equipment' });
      }

      if (selection?.spellcasting) {
        listItems.push({ ...selection.spellcasting, name: 'Spellcasting' });
      }

      console.log(
        'in SelectionList in Modal - listitems:',
        listItems,
        '\n selection:',
        selection
      );
    } else {
      listItems = [
        ...filteredClass.features,
        { ...filteredClass.proficiencies, name: 'Proficiencies' },
        { ...filteredClass.hit_points, name: 'Hit Points' },
      ];

      // if (filteredClass?.equipment) {
      //   listItems.push({ ...filteredClass.equipment, name: 'Equipment' });
      // }

      if (filteredClass?.spellcasting) {
        listItems.push({ ...filteredClass.spellcasting, name: 'Spellcasting' });
      }
      console.log(
        'in SelectionList NOT in Modal - listitems:',
        listItems,
        '\n filteredClass:',
        filteredClass
      );
    }
  }

  console.log('in SelectionList - listitems:', listItems);

  return (
    <Row className='full-width-row'>
      <Col className='full-width-col'>
        <div className='secondary-detailslist'>
          {isModal ? (
            <CollapsibleList
              items={listItems}
              isModal={isModal}
              isLoading={isLoading}
              selection={selection}
              isRace={isRace}
            />
          ) : (
            <CollapsibleList
              items={listItems}
              isModal={isModal}
              isLoading={isLoading}
              isRace={isRace}
              selection={selection}
              register={register}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default SelectionList;
