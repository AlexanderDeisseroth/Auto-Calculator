import '../App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import FormGroup from '@mui/material/FormGroup';

import InitiationCheckbox from './InitiationCheckbox';

import { useState } from 'react';
import PortPointsField from './PortPointsField';



function Red() {
  const [text, setText] = useState('');
  const [portPoints, setPortPoints] = useState(0);
  const [initiationPoints, setInitiationPoints] = useState(0);
  const [lowerPortPoints, setLowerPortPoints] = useState({ 'robot1': 0, 'robot2': 0, 'robot3': 0 });
  const [outerPortPoints, setOuterPortPoints] = useState({ 'robot1': 0, 'robot2': 0, 'robot3': 0 });
  const [innerPortPoints, setInnerPortPoints] = useState({ 'robot1': 0, 'robot2': 0, 'robot3': 0 });


  return (
    <div>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <center>
          <div >
            <h1 style={{color: 'red'}}>Red Team</h1>
            <h2>Moved off Initiation Line</h2>
            <FormGroup className='initiation-line'>

              <InitiationCheckbox num={initiationPoints} setPoints={setInitiationPoints} robotName="Robot 1" />
              <InitiationCheckbox num={initiationPoints} setPoints={setInitiationPoints} robotName="Robot 2" />
              <InitiationCheckbox num={initiationPoints} setPoints={setInitiationPoints} robotName="Robot 3" />
            </FormGroup>
          </div>

          <h2>Balls Scored in Power Ports</h2><br />
          <h3>Robot 1</h3>
          <PortPointsField portName='Lower Port' setPoints={setLowerPortPoints} pointWeight={2} points={lowerPortPoints} robot='robot1'></PortPointsField>
          <PortPointsField portName='Outer Port' setPoints={setOuterPortPoints} pointWeight={4} points={outerPortPoints} robot='robot1'></PortPointsField>
          <PortPointsField portName='Inner Port' setPoints={setInnerPortPoints} pointWeight={6} points={innerPortPoints} robot='robot1'></PortPointsField>

          <h3>Robot 2</h3>
          <PortPointsField portName='Lower Port' setPoints={setLowerPortPoints} pointWeight={2} points={lowerPortPoints} robot='robot2'></PortPointsField>
          <PortPointsField portName='Outer Port' setPoints={setOuterPortPoints} pointWeight={4} points={outerPortPoints} robot='robot2'></PortPointsField>
          <PortPointsField portName='Inner Port' setPoints={setInnerPortPoints} pointWeight={6} points={innerPortPoints} robot='robot2'></PortPointsField>

          <h3>Robot 3</h3>
          <PortPointsField portName='Lower Port' setPoints={setLowerPortPoints} pointWeight={2} points={lowerPortPoints} robot='robot3'></PortPointsField>
          <PortPointsField portName='Outer Port' setPoints={setOuterPortPoints} pointWeight={4} points={outerPortPoints} robot='robot3'></PortPointsField>
          <PortPointsField portName='Inner Port' setPoints={setInnerPortPoints} pointWeight={6} points={innerPortPoints} robot='robot3'></PortPointsField>

          <h2>Total Points in Auto</h2>
          <h1>{initiationPoints + lowerPortPoints.robot1 + lowerPortPoints.robot2 + lowerPortPoints.robot3 + outerPortPoints.robot1 + outerPortPoints.robot2 + outerPortPoints.robot3 + innerPortPoints.robot1 + innerPortPoints.robot2 + innerPortPoints.robot3}</h1>
        </center>
      </body>
    </div>
  );
}

export default Red;