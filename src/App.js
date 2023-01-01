import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blue from "./routes/Blue";
import Red from "./routes/Red";
import Root from "./routes/root";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root/>}/>
        <Route path='/blue' element={<Blue/>}/>
        <Route path='/red' element={<Red/>}/>
      </Routes>
    </BrowserRouter>
  );
}