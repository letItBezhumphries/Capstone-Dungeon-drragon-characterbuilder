import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import ClassOverview from './ClassOverview';
import ModalCollapsibleFeatures from '../../../components/ModalCollapsibleFeatures';
import { parseClassData } from '../../../utility/parseClassData';
import { styled } from 'styled-components';

const OverviewContainer = styled(Container)`
  ${'' /* background-color: orange; */}
  width: 100%;
  padding: 0px 0px;
  margin: 0px 0px;
`;

const ConfirmClass = ({
  isModal,
  selection,
  isLoading,
  selectedClass,
  register,
}) => {
  let classSelection;
  let listItems;
  if (isModal) {
    classSelection = parseClassData(selection);
    classSelection.imgSrc = selection.imgSrc;
    classSelection.index = selection.index;
    listItems = [
      classSelection.hit_points,
      classSelection.proficiencies,
      classSelection.equipment,
      ...classSelection.features,
    ];
    // console.log(
    //   `in ConfirmClass when the Modal is ${isModal} - classSelection:`,
    //   classSelection,
    //   'selection:',
    //   selection
    // );
  } else {
    classSelection = parseClassData(selectedClass);
    classSelection.imgSrc = selection.imgSrc;
    classSelection.index = selection.index;
    // listItems = classSelection.traits;
    // console.log(
    //   `in ConfirmClass when the Modal is ${isModal} - classSelection:`,
    //   classSelection,
    //   'selectedClass:',
    //   selectedClass
    // );
  }

  return (
    <OverviewContainer>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <ClassOverview
            isRace={false}
            isModal={isModal}
            selection={classSelection}
            register={register}
          />
          {isModal ? (
            <Row className='full-width-row'>
              <Col className='full-width-col'>
                <ModalCollapsibleFeatures
                  items={listItems}
                  selection={classSelection}
                  isModal={true}
                  register={register}
                />
              </Col>
            </Row>
          ) : null}
          <input
            value={JSON.stringify(classSelection)}
            name='class'
            {...register('class_type')}
            style={{ display: 'none' }}
          ></input>
        </>
      )}
    </OverviewContainer>
  );
};

export default ConfirmClass;
