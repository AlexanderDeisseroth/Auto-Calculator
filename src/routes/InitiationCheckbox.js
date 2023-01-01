import App from "../App";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import React, { useState } from 'react';


function InitiationCheckbox({ num, setPoints, robotName }) {
    // return (<h2>Hello!</h2>)
    // const [initiationPoints, setInitiationPoints] = useState(App.initiationPoints);

    return (
        <FormControlLabel control={<Checkbox />} label={robotName} onChange={(condition) => {
            if (condition.target.checked === true) {
                { setPoints(num + 5) }
                // console.log({num} + 5);
            }
            else {
                { setPoints(num - 5) }
            }
        }} />
    )
}

export default InitiationCheckbox;