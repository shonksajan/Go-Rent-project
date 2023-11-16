import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateCar.css';

export default function UpdateCar() {
  const [vId, setId] = useState('');
  const [carData, setCarData] = useState(null);
  const [rcDetails, setRCDetails] = useState('');
  const [insuranceImage, setInsuranceImage] = useState(null);
  const [pollutionImage, setPollutionImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleRCDetailsChange = (e) => {
    setRCDetails(e.target.value);
  };

  const handleInsuranceImageChange = (e) => {
    setInsuranceImage(e.target.files[0]);
  };

  const handlePollutionImageChange = (e) => {
    setPollutionImage(e.target.files[0]);
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

  const updateRCDetails = () => {
    // Create a FormData object for file uploads
    const formData = new FormData();
    formData.append('rcdetails', rcDetails);
    if (insuranceImage) {
      formData.append('insuranceImage', insuranceImage);
    }
    if (pollutionImage) {
      formData.append('pollutionImage', pollutionImage);
    }

    // Make an API request to update the car details
    axios.put(`http://localhost:8081/updatecar/${vId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        // Clear the car data, ID, and input fields after a successful update
        setCarData(null);
        setId('');
        setRCDetails('');
        setInsuranceImage(null);
        setPollutionImage(null);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (isEditing && carData) {
      setRCDetails(carData.rcdetails);
    }
  }, [isEditing, carData]);

  return (
    <div className="update-car">
      <div className="up-container">
        <header>Update RC Details</header>
        <div className="input-box">
          <label htmlFor="id">Enter ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={vId}
            onChange={handleIdChange}
          />
          <button onClick={fetchCarData}>Retrieve Data</button>
        </div>
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
                  <th>Car Image</th>
                  <th>Insurance Image</th>
                  <th>Pollution Certificate Image</th>
                </tr>
                <tr>
                  <td>{carData.vId}</td>
                  <td>{carData.vehicleName}</td>
                  <td>{carData.modelYear}</td>
                  <td>{carData.Fuel}</td>
                  <td>{carData.VehicleClass}</td>
                  <td>{carData.Enginecc}</td>
                  <td>{carData.Chassisnumber}</td>
                  <td>
                    {isEditing ? (
                       <textarea
                      rows="8" cols="40"
                        type="text"
                        value={rcDetails}
                        onChange={handleRCDetailsChange}
                      />
                    ) : (
                      carData.rcdetails
                    )}
                  </td>
                  <td>
                    <img class="img2" src={`http://localhost:8081/uploads/car/${carData.vId}`} alt={carData.carImage} />
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleInsuranceImageChange}
                      />
                    ) : (
                      <img class="img2" src={`http://localhost:8081/uploads/insurance/${carData.vId}`} alt={carData.insuranceImage} />
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePollutionImageChange}
                      />
                    ) : (
                      <img class="img2" src={`http://localhost:8081/uploads/pollution/${carData.vId}`} alt={carData.pollutionCertificateImage} />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            {isEditing ? (
              <button onClick={updateRCDetails}>Save RC Details</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Edit RC Details</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
