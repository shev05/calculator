import React, { useState } from 'react';
import './App.css';
import { ClockFace } from './ui/clockFace';
import { ButtonCalculator } from './ui/buttonCalculator';

function App() {
  const [clockFace, setClockFace] = useState<string>('')
  return (
    <div className="App">
      <ClockFace clockFace = {clockFace}/>
      <ButtonCalculator setClockFace = {setClockFace} clockFace={clockFace}/>
    </div>
  );
}

export default App;
