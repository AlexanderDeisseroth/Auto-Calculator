import '../App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



import FormGroup from '@mui/material/FormGroup';


import InitiationCheckbox from './InitiationCheckbox';

import { useEffect, useState } from 'react';
import PortPointsField from './PortPointsField';
import { useParams } from 'react-router-dom';



function Blue() {
    const [initiationPoints, setInitiationPoints] = useState(0);
    const [lowerPortPoints, setLowerPortPoints] = useState({ 'robot1': 0, 'robot2': 0, 'robot3': 0 });
    const [outerPortPoints, setOuterPortPoints] = useState({ 'robot1': 0, 'robot2': 0, 'robot3': 0 });
    const [innerPortPoints, setInnerPortPoints] = useState({ 'robot1': 0, 'robot2': 0, 'robot3': 0 });

    let { matchId } = useParams();
    const [blueTeams, setBlueTeams] = useState([]);
    const [blueTeamNumbers, setBlueTeamNumbers] = useState([]);
    const apiKey = 'pcFgEEwOM2DzDUkIHEmJeptVHhUe5TZQz7KkJ2OphEtPjf0ezJUrAV1kGCnWzrmL'
    useEffect(() => {
        fetch('https://www.thebluealliance.com/api/v3/match/' + matchId, {
            headers: {
                'X-TBA-Auth-Key': apiKey
            }
        }).then(response => response.json()).then(data => {
            let tempBlueTeams = [];
            let tempBlueTeamNumbers = [];
            for (let i = 0; i < data['alliances']['blue']['team_keys'].length; i++) {
                fetch('https://www.thebluealliance.com/api/v3/team/' + data['alliances']['blue']['team_keys'][i], {
                    headers: {
                        'X-TBA-Auth-Key': apiKey
                    }
                }).then(response => response.json()).then(data => {
                    tempBlueTeams.push(data['nickname']);
                    tempBlueTeamNumbers.push(data['team_number'])
                    if (tempBlueTeams.length === 3) {
                        setBlueTeams(tempBlueTeams);
                    }
                    if (tempBlueTeamNumbers.length === 3) {
                        setBlueTeamNumbers(tempBlueTeamNumbers);
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
                        <h1 style={{ color: 'blue' }}>Blue Team</h1>
                        <h2>Moved off Initiation Line</h2>
                        <FormGroup className='initiation-line'>

                            <InitiationCheckbox num={initiationPoints} setPoints={setInitiationPoints} robotName={blueTeamNumbers[0]} />
                            <InitiationCheckbox num={initiationPoints} setPoints={setInitiationPoints} robotName={blueTeamNumbers[1]} />
                            <InitiationCheckbox num={initiationPoints} setPoints={setInitiationPoints} robotName={blueTeamNumbers[2]} />
                        </FormGroup>
                    </div>

                    <h2>Balls Scored in Power Ports</h2><br />
                    <h3>Robot {blueTeamNumbers[0]} - {blueTeams[0]}</h3>
                    <PortPointsField portName='Lower Port' setPoints={setLowerPortPoints} pointWeight={2} points={lowerPortPoints} robot='robot1'></PortPointsField>
                    <PortPointsField portName='Outer Port' setPoints={setOuterPortPoints} pointWeight={4} points={outerPortPoints} robot='robot1'></PortPointsField>
                    <PortPointsField portName='Inner Port' setPoints={setInnerPortPoints} pointWeight={6} points={innerPortPoints} robot='robot1'></PortPointsField>

                    <h3>Robot {blueTeamNumbers[1]} - {blueTeams[1]}</h3>
                    <PortPointsField portName='Lower Port' setPoints={setLowerPortPoints} pointWeight={2} points={lowerPortPoints} robot='robot2'></PortPointsField>
                    <PortPointsField portName='Outer Port' setPoints={setOuterPortPoints} pointWeight={4} points={outerPortPoints} robot='robot2'></PortPointsField>
                    <PortPointsField portName='Inner Port' setPoints={setInnerPortPoints} pointWeight={6} points={innerPortPoints} robot='robot2'></PortPointsField>

                    <h3>Robot {blueTeamNumbers[2]} - {blueTeams[2]}</h3>
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

export default Blue;