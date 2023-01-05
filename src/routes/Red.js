import '../App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import FormGroup from '@mui/material/FormGroup';

import InitiationCheckbox from './InitiationCheckbox';

import { useState, useEffect } from 'react';
import PortPointsField from './PortPointsField';
import { useParams } from 'react-router-dom';



function Red() {
  const [initiationPoints, setInitiationPoints] = useState(0);
  const [lowerPortPoints, setLowerPortPoints] = useState({ 'robot1': 0, 'robot2': 0, 'robot3': 0 });
  const [outerPortPoints, setOuterPortPoints] = useState({ 'robot1': 0, 'robot2': 0, 'robot3': 0 });
  const [innerPortPoints, setInnerPortPoints] = useState({ 'robot1': 0, 'robot2': 0, 'robot3': 0 });

    let { matchId } = useParams();
    const [redTeams, setRedTeams] = useState([]);
    const [redTeamNumbers, setRedTeamNumbers] = useState([]);
    const apiKey = 'pcFgEEwOM2DzDUkIHEmJeptVHhUe5TZQz7KkJ2OphEtPjf0ezJUrAV1kGCnWzrmL'
    useEffect(() => {
        fetch('https://www.thebluealliance.com/api/v3/match/' + matchId, {
            headers: {
                'X-TBA-Auth-Key': apiKey
            }
        }).then(response => response.json()).then(data => {
            let tempRedTeams = [];
            let tempRedTeamNumbers = [];
            for (let i = 0; i < data['alliances']['red']['team_keys'].length; i++) {
                fetch('https://www.thebluealliance.com/api/v3/team/' + data['alliances']['red']['team_keys'][i], {
                    headers: {
                        'X-TBA-Auth-Key': apiKey
                    }
                }).then(response => response.json()).then(data => {
                    tempRedTeams.push(data['nickname']);
                    tempRedTeamNumbers.push(data['team_number'])
                    if (tempRedTeams.length === 3) {
                        setRedTeams(tempRedTeams);
                    }
                    if (tempRedTeamNumbers.length === 3) {
                        setRedTeamNumbers(tempRedTeamNumbers);
                    }
                }).catch(error => { console.log(error) })
            }
        }).catch(error => { console.log(error) });
    }, []);



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

              <InitiationCheckbox num={initiationPoints} setPoints={setInitiationPoints} robotName={redTeamNumbers[0]} />
              <InitiationCheckbox num={initiationPoints} setPoints={setInitiationPoints} robotName={redTeamNumbers[1]} />
              <InitiationCheckbox num={initiationPoints} setPoints={setInitiationPoints} robotName={redTeamNumbers[2]} />
            </FormGroup>
          </div>

          <h2>Balls Scored in Power Ports</h2><br />
          <h3>Robot {redTeamNumbers[0]} - {redTeams[0]}</h3>
          <PortPointsField portName='Lower Port' setPoints={setLowerPortPoints} pointWeight={2} points={lowerPortPoints} robot='robot1'></PortPointsField>
          <PortPointsField portName='Outer Port' setPoints={setOuterPortPoints} pointWeight={4} points={outerPortPoints} robot='robot1'></PortPointsField>
          <PortPointsField portName='Inner Port' setPoints={setInnerPortPoints} pointWeight={6} points={innerPortPoints} robot='robot1'></PortPointsField>

          <h3>Robot {redTeamNumbers[1]} - {redTeams[1]}</h3>
          <PortPointsField portName='Lower Port' setPoints={setLowerPortPoints} pointWeight={2} points={lowerPortPoints} robot='robot2'></PortPointsField>
          <PortPointsField portName='Outer Port' setPoints={setOuterPortPoints} pointWeight={4} points={outerPortPoints} robot='robot2'></PortPointsField>
          <PortPointsField portName='Inner Port' setPoints={setInnerPortPoints} pointWeight={6} points={innerPortPoints} robot='robot2'></PortPointsField>

          <h3>Robot {redTeamNumbers[2]} - {redTeams[2]}</h3>
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