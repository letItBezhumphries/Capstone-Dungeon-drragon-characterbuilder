import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { SelectRaceTrait, SelectRaceTraitGroup } from './SelectRaceTrait';
import ContextAwareToggle from './ContextAwareToggle';

import SelectionTable from './SelectionTable';
import './CollapsibleList.css';

const CollapsibleList = ({
  items,
  selection,
  isModal,
  isRace,
  register,
  onFormReady,
}) => {
  // console.log(
  //   `in CollapsibleList - when Modal is ${isModal} - ITEMS`,
  //   items,
  //   'isRace:',
  //   isRace
  // );

  const renderList = () => {
    if (isRace) {
      return items.map((item, idx) => (
        <Card
          key={idx}
          className={
            !isModal && item.choices === undefined
              ? 'selection-item'
              : !isModal && item.choices
              ? 'selection-item-todo'
              : 'modal-selection-item'
          }
        >
          <Card.Header className='selection-header'>
            <ContextAwareToggle
              eventKey={idx}
              item={item}
              register={register}
              isModal={isModal}
              isOpen={{ icon: 'fa-solid fa-chevron-up', color: 'purple' }}
              isClosed={{ icon: 'fa-solid fa-chevron-down', color: 'purple' }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span>{item.name}</span>
              </div>
            </ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey={idx}>
            <Card.Body>
              <div className='collapsible-content-container'>
                <p>{item.desc}</p>
                {item.table ? (
                  <>
                    <h5 style={{ marginTop: '30px', marginBottom: '20px' }}>
                      {item.name}
                    </h5>
                    <SelectionTable
                      tableHead={item.headCells}
                      tableCells={item.tableCells}
                    />
                  </>
                ) : null}
                <>
                  {!isModal && item.total_choices > 1 ? (
                    <div className='selection-container'>
                      <SelectRaceTraitGroup
                        item={item}
                        selection={selection}
                        register={register}
                        onFormReady={onFormReady}
                      />
                    </div>
                  ) : !isModal && item.total_choices === 1 ? (
                    <div className='selection-container'>
                      <SelectRaceTrait
                        item={item}
                        selection={selection}
                        register={register}
                        onFormReady={onFormReady}
                      />
                    </div>
                  ) : null}
                </>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ));
    } else {
      return items.map((item, idx) => (
        <Card key={idx}>
          <Card.Header>
            <ContextAwareToggle
              eventKey={idx}
              item={item}
              register={register}
              isModal={isModal}
              isOpen={{ icon: 'fa-solid fa-chevron-up', color: 'purple' }}
              isClosed={{ icon: 'fa-solid fa-chevron-down', color: 'purple' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{item.name}</span>
                <span style={{ fontSize: '12px' }}>
                  {!isRace ? `level ${item.level} ` : null}
                </span>
              </div>
            </ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey={idx}>
            <Card.Body>
              {item.armor ? (
                <p>
                  <strong>Armor:</strong>
                  {item.armor}
                </p>
              ) : null}
              {item.weapons ? (
                <p>
                  <strong>Weapons: </strong>
                  {item.weapons}
                </p>
              ) : null}
              {item.tools ? (
                <p>
                  <strong>Tools: </strong>
                  {item.tools.desc}
                </p>
              ) : null}
              {item.saving_throws ? (
                <p>
                  <strong>Saving Throws: </strong>
                  {item.saving_throws}
                </p>
              ) : null}
              {item.skills ? (
                <p>
                  <strong>Skills: </strong>
                  {item.skills.desc}
                </p>
              ) : null}
              {item.hit_die ? (
                <p>
                  <strong>Hit Die: </strong>
                  {item.hit_die}
                </p>
              ) : null}
              {item.hitpoints_at_1st_level ? (
                <p>
                  <strong>Hit Points at 1st Level: </strong>
                  {item.hitpoints_at_1st_level}
                </p>
              ) : null}
              {item.hitpoints_at_higher_levels ? (
                <p>
                  <strong>Hit Points at Higher Levels: </strong>
                  {item.hitpoints_at_higher_levels}
                </p>
              ) : null}
              {item.name === 'Equipment' ? (
                <div style={{ marginLeft: '10px' }}>
                  <p>{item.desc}</p>
                  <ul>
                    {item.choices.map((ch, idx) => (
                      <li key={idx} style={{ listStyleType: 'disc' }}>
                        {ch.text.replaceAll('*', '')}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {item.table ? (
                <>
                  <p></p>
                  <h5>{item.name}</h5>
                  <SelectionTable
                    tableHead={item.headCells}
                    tableCells={item.tableCells}
                  />
                </>
              ) : null}
              <div></div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ));
    }
  };

  return (
    <Accordion flush={true} className='collapsiblelist-container' alwaysOpen>
      {renderList()}
    </Accordion>
  );
};

export default CollapsibleList;
