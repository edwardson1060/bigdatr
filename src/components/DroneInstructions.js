import React, { useState } from 'react';
import axios from 'axios';

const DroneInstructions = () => {
  const [instructions, setInstructions] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4001/instruct-drone?instructions=${instructions}`);
      setResults(response?.data?.billboards); // Assuming the response data structure
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Enter drone instructions"
          required
        />
        <button type="submit">Send Instructions</button>
      </form>
      <div>
        <h2>Billboards Found:</h2>
        <ul>
          {results.map((billboard) => (
            <li key={billboard.id} style={{display: 'flex', flexDirection: 'column'}}>
              <div><h1>{billboard.advertiser}</h1></div>
              <div style={{marginBottom: '5px'}}><i>{billboard.billboardText}</i></div>
              <div><img src={billboard.image} /></div>
              <div><b>Address:</b> {billboard.address}</div>
              <div><b>Photos Taken:</b> {billboard.photosTaken}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DroneInstructions;