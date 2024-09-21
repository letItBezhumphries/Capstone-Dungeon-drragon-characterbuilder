import { useState, useEffect } from 'react';
import { Col, Button } from 'react-bootstrap';
import { styled } from 'styled-components';

const ManagerPane = styled(Col)`
  max-width: 70%;
  width: 400px;
  padding: 10px;
  border-radius: 3px;
  align-items: center;
  background: #fff;
  border: 1px solid #e1e1e1;
  display: flex;
  justify-content: space-between;
`;

const ManagerButton = styled(Button)`
  background-color: #1c9aef;
  color: #fff;
  font-size: 10px;
  padding: 9px 15px;
  text-transform: uppercase;
  border: 1px solid transparent;
  word-break: none;
`;

const Label = styled('span')`
  font-weight: 700;
  margin-right: 7px;
  font-size: 12px;
  color: black;
`;

const HitpointsManager = ({ characterLevel, introData }) => {
  const [hitPoints, setHitPoints] = useState(
    parseInt(introData.hit_points.hitpoints_at_1st_level.split(' +')[0])
  );
  const [hitDie, setHitDie] = useState(introData.hit_points.hit_die);

  const hitPointIncrease = parseInt(
    introData.hit_points.hitpoints_at_higher_levels.split('(or ')[1]
  );

  useEffect(() => {
    if (characterLevel > 1) {
      let multiplier = characterLevel - 1;
      let increase = hitPointIncrease * multiplier;
      let hp =
        parseInt(introData.hit_points.hitpoints_at_1st_level.split(' +')[0]) +
        increase;
      setHitPoints(hp);
      let hd = `${characterLevel}` + hitDie.slice(1);
      setHitDie(hd);
    }
    // setHitPoints((prevState) => prevState + hitPointIncrease);
  }, [characterLevel]);

  return (
    <ManagerPane>
      <div className='class-hp-manager-summary'>
        <div className='hp-summaryitem'>
          <Label>Max Hit Points:</Label>
          <span>{hitPoints}</span>
        </div>
        <div className='hp-summaryitem'>
          <Label>Hit Dice:</Label>
          <span>{hitDie}</span>
        </div>
      </div>
      <ManagerButton>manage hp</ManagerButton>
    </ManagerPane>
  );
};

export default HitpointsManager;
