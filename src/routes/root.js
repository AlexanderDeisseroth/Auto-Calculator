import { Button } from "@mui/material";
import {Link} from 'react-router-dom'

export default function Root(){
    return(
        <div>
            <center>
            <div id="header">
            <h1>Auto Calculator</h1>
            <Link to='blue'><Button variant="outlined" >Blue Team</Button></Link>
            <Link to='red'><Button variant="outlined" color="error">Red Team</Button></Link>
            </div>
            </center>
        </div>
    );
}