import { Button, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'

export default function TeamSelection(){
    let {matchId} = useParams();
    const [redTeams, setRedTeams] = useState([]);
    const [blueTeams, setBlueTeams] = useState([]);
    const apiKey = 'pcFgEEwOM2DzDUkIHEmJeptVHhUe5TZQz7KkJ2OphEtPjf0ezJUrAV1kGCnWzrmL'
    useEffect(() => {
        fetch('https://www.thebluealliance.com/api/v3/match/' + matchId, {
            headers: {
                'X-TBA-Auth-Key': apiKey
            }
        }).then(response => response.json()).then(data => {
            let tempBlueTeams = [];
            let tempRedTeams = [];
            for (let i=0; i<data['alliances']['blue']['team_keys'].length; i++){
                fetch('https://www.thebluealliance.com/api/v3/team/' + data['alliances']['blue']['team_keys'][i], {headers: {
                    'X-TBA-Auth-Key': apiKey
                }}).then(response => response.json()).then(data => {
                    tempBlueTeams.push(data['nickname']);
                    console.log(tempBlueTeams);
                    if (tempBlueTeams.length === 3){
                        setBlueTeams(tempBlueTeams);
                    }
                }).catch(error => {console.log(error)})
            }
            for (let i=0; i<data['alliances']['red']['team_keys'].length; i++){
                fetch('https://www.thebluealliance.com/api/v3/team/' + data['alliances']['red']['team_keys'][i], {headers: {
                    'X-TBA-Auth-Key': apiKey
                }}).then(response => response.json()).then(data => {
                    tempRedTeams.push(data['nickname']);
                    console.log(tempRedTeams);
                    if (tempRedTeams.length === 3){
                        setRedTeams(tempRedTeams);
                    }
                }).catch(error => {console.log(error)})
            }
        }).catch(error => {console.log(error)});
    }, []);
    return(
        <div>
            <center>
            <div id="header">
            <h1>Auto Calculator</h1>
            <h2>Match: {matchId}</h2>
            <Button variant="outlined" href="blue">Blue Alliance</Button>
            <p>Blue Teams:</p>
            {blueTeams.map((team) => {
                return(
                <ListItemText primary={team}/>
                )
            })}
            <Button variant="outlined" color="error" href="red">Red Alliance</Button>
            <p>Red Teams:</p>
            {redTeams.map((team) => {
                return(
                <ListItemText primary={team}/>
                )
            })}
            </div>
            </center>
        </div>
    );
}