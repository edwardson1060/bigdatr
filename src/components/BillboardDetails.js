import React, { useState } from 'react';
import axios from 'axios';

const BillboardDetails = () => {
  const [billboardId, setBillboardId] = useState('');
  const [billboard, setBillboard] = useState(null);

  const fetchBillboardDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/get-billboard?id=${billboardId}`);
      console.log(response?.data?.billboard)
      setBillboard(response?.data?.billboard);
    } catch (error) {
      console.error("Error fetching details", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={billboardId}
        onChange={(e) => setBillboardId(e.target.value)}
        placeholder="Enter Billboard ID"
        required
      />
      <button onClick={fetchBillboardDetails}>Get Billboard Details</button>
      {billboard && (
        <div style={{marginLeft: '10px'}}>
          <h2>Billboard Details:</h2>
          <div key={billboard.id} style={{display: 'flex', flexDirection: 'column'}}>
            <div><h1>{billboard.advertiser}</h1></div>
            <div style={{marginBottom: '5px'}}><i>{billboard.billboardText}</i></div>
            <div><img src={billboard.image} /></div>
            <div><b>Address:</b> {billboard.address}</div>
            <div><b>Photos Taken:</b> {billboard.photosTaken}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillboardDetails;