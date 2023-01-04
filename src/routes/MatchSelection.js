import { ListItemButton, ListItemText, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


export default function MatchSelection() {
    let { eventId } = useParams();
    const [apiUrl, setApiUrl] = useState('https://www.thebluealliance.com/api/v3/event/' + eventId + '/matches/keys');
    const [apiKey, setApiKey] = useState('pcFgEEwOM2DzDUkIHEmJeptVHhUe5TZQz7KkJ2OphEtPjf0ezJUrAV1kGCnWzrmL');
    const [matchData, setMatchData] = useState({});

    const [qualifyingMatches, setQualifyingMatches] = useState([]);
    const [quarterFinals, setQuarterFinals] = useState([]);
    const [semiFinals, setSemiFinals] = useState([]);
    const [finals, setFinals] = useState([]);

    const [eventName, setEventName] = useState('');

    useEffect(() => {
        fetch(apiUrl, {
            headers: {
                'X-TBA-Auth-Key': apiKey
            }
        }).then(response => response.json()).then(data => {
            let tempQms = [];
            let tempQfs = [];
            let tempSfs = [];
            let tempFs = [];
            for (let i = 0; i < data.length; i++) {
                let matchType = data[i].slice(eventId.length + 1, eventId.length + 3);
                console.log(matchType)
                if (matchType === 'qm') {
                    tempQms.push(data[i]);
                } else if (matchType === 'qf') {
                    tempQfs.push(data[i]);
                } else if (matchType === 'sf') {
                    tempSfs.push(data[i]);
                } else {
                    tempFs.push(data[i])
                }
            }
            let temp = 0;
            for (let i = 0; i < tempQms.length; i++) {
                for (let j = i + 1; j < tempQms.length; j++) {
                    if (parseInt(tempQms[j].slice(eventId.length + 3)) < parseInt(tempQms[i].slice(eventId.length + 3))) {
                        temp = tempQms[j];
                        tempQms[j] = tempQms[i];
                        tempQms[i] = temp;
                    }
                }
            }
            setQualifyingMatches(tempQms);
            setQuarterFinals(tempQfs);
            setSemiFinals(tempSfs);
            setFinals(tempFs);

        }).catch(error => { console.log(error) });

        fetch('https://www.thebluealliance.com/api/v3/event/' + eventId, {
            headers: {
                'X-TBA-Auth-Key': apiKey
            }
        }).then(response => response.json()).then(data => {
            setEventName(data['name'])
        }).catch(error => { console.log(error) });
    }, []);






    return (
        <div>
            <Grid container alignItems="center" justifyContent="center" direction="column" spacing={2}>
                <h1>{eventName}</h1>
                <h2>Qualifying Matches</h2>
                <Grid item>
                    {qualifyingMatches.map((match) => {
                        return (
                            <ListItemButton component='a' href={match + '/team-selection'}>
                                <ListItemText primary={'QM ' + match.slice(eventId.length + 3)} />
                            </ListItemButton>
                        )
                    })}
                </Grid>
                <h2>Quarter Finals</h2>
                <Grid item>
                    {quarterFinals.map((match) => {
                        return (
                            <ListItemButton component='a' href={match + '/team-selection'}>
                                <ListItemText primary={'QF '+match.slice(eventId.length + 3, eventId.length + 4) + ' '+ match.slice(eventId.length + 4)} />
                            </ListItemButton>
                        )
                    })}
                </Grid>
                <h2>Semi Finals</h2>
                <Grid item>
                    {semiFinals.map((match) => {
                        return (
                            <ListItemButton component='a' href={match +'/team-selection'}>
                                <ListItemText primary={'SF '+match.slice(eventId.length + 3, eventId.length + 4) + ' '+ match.slice(eventId.length + 4)} />
                            </ListItemButton>
                        )
                    })}
                </Grid>
                <h2>Finals</h2>
                <Grid item>
                    {finals.map((match) => {
                        return (
                            <ListItemButton component='a' href={match +'/team-selection'}>
                                <ListItemText primary={'F '+match.slice(eventId.length + 3, eventId.length + 4) + match.slice(eventId.length + 4)} />
                            </ListItemButton>
                        )
                    })}
                </Grid>
            </Grid>
        </div>
    );
}