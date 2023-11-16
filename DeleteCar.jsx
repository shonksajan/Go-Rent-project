import React, { useState } from 'react';
import axios from 'axios';
import './DeleteCar.css';

export default function DeleteCar() {
  const [vId, setId] = useState('');
  const [carData, setCarData] = useState(null);

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const fetchCarData = () => {
    // Make an API request to fetch car data based on the provided ID
    axios.get(`http://localhost:8081/getcar/${vId}`)
      .then((response) => {
        setCarData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const deleteCar = () => {
    // Make an API request to delete the car data based on the provided ID
    axios.delete(`http://localhost:8081/deletecar/${vId}`)
      .then(() => {
        // Clear the car data and ID after successful deletion
        setCarData(null);
        setId('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="delete-car">
      <div className="del-container">
        <header>Delete Car</header>
        <div className="del-input-box">
          <label htmlFor="id">Enter ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={vId}
            onChange={handleIdChange}
          />
        </div>
        <button onClick={fetchCarData}>Retrieve Data</button>
        {carData && (
          <div className="car-details">
            <h2>Car Details</h2>
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Vehicle Name</th>
                  <th>Model Year</th>
                  <th>Fuel</th>
                  <th>Vehicle Class</th>
                  <th>Engine CC</th>
                  <th>Chassis Number</th>
                  <th>RC Details</th>
                </tr>
                <tr>
                  <td>{carData.vId}</td>
                  <td>{carData.vehicleName}</td>
                  <td>{carData.modelYear}</td>
                  <td>{carData.Fuel}</td>
                  <td>{carData.VehicleClass}</td>
                  <td>{carData.Enginecc}</td>
                  <td>{carData.Chassisnumber}</td>
                  <td>{carData.rcdetails}</td>
                </tr>
              </tbody>
            </table>
            <button onClick={deleteCar}>Delete Car</button>
          </div>
        )}
      </div>
    </div>
  );
}
