import React from 'react';
import DroneInstructions from './components/DroneInstructions';
import BillboardDetails from './components/BillboardDetails';

const App = () => {
  return (
    <div>
      <h1>Drone Challenge App</h1>
      <DroneInstructions />
      <BillboardDetails />
    </div>
  );
};

export default App;