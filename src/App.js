import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blue from "./routes/Blue";
import EventSelection from "./routes/EventSelection";
import Red from "./routes/Red";
import MatchSelection from "./routes/MatchSelection";
import TeamSelection from "./routes/TeamSelection";


export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EventSelection/>}/>
        <Route path='/match-selection/:eventId' element={<MatchSelection/>}/>
        <Route path='match-selection/:matchId/team-selection/' element={<TeamSelection/>}/>
        <Route path='/match-selection/:matchId/blue' element={<Blue/>}/>
        <Route path='/match-selection/:matchId/red' element={<Red/>}/>
      </Routes>
    </BrowserRouter>
  );
}