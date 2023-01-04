import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function EventSelection() {
    const [eventKey, setEventKey] = useState('');
    return (
        <div>
            <Grid container alignItems="center" justifyContent="center" direction="column" spacing={2}>
                <Grid item>
                    <h1>Auto Calculator for Infinite Recharge</h1>
                </Grid>
                <Grid item>
                    <h2>Enter an Event Key</h2>
                </Grid>
                <Grid item xs={3}>
                    <TextField variant="standard" label="Event Key" onChange={(text) => { setEventKey(text.target.value) }}></TextField>
                </Grid>
                <Grid item>
                    <Button variant="contained" href={"/match-selection/"+eventKey}>Find Matches</Button>
                </Grid>

            </Grid>
        </div>
    )
}