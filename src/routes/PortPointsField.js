import App from "../App";
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import React, { useState } from 'react';

function PortPointsField({ portName, setPoints, pointWeight, robot, points }) {

    return (
        <TextField id='text-field' label={portName} variant='outlined' margin='normal' type='number' onChange={(text) => {
            console.log(points);
            var temp = { ...points };
            console.log(temp);
            console.log(temp[robot]);

            if (text.target.value != '') {
                temp[robot] = parseInt(text.target.value) * pointWeight

            }
            else {
                temp[robot] = 0

            }
            { setPoints(temp) }
            console.log(points);
        }} />
    )
}

export default PortPointsField;