import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewcars.css';

export default function Viewcars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8081/viewcars')
      .then((response) => {
        setCars(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bac">
      <table className="responsive-table">
        <header>View Cars</header>
        <table className="styled-table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Vehicle Name</th>
              <th scope="col">Model Year</th>
              <th scope="col">Fuel</th>
              <th scope="col">Vehicle Class</th>
              <th scope="col">Engine CC</th>
              <th scope="col">Chassis Number</th>
              <th scope="col">RC Details</th>
              <th scope="col">Car Image</th>
              <th scope="col">Insurance Image</th>
              <th scope="col">Pollution Certificate Image</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.vId}>
                <td>{car.vId}</td>
                <td>{car.vehicleName}</td>
                <td>{car.modelYear}</td>
                <td>{car.Fuel}</td>
                <td>{car.vehicleClass}</td>
                <td>{car.Enginecc}</td>
                <td>{car.Chassisnumber}</td>
                <td>{car.rcdetails}</td>
                <td>
                <img className="img2" src={`http://localhost:8081/uploads/car/${car.vId}`} alt={car.carImage} />

                </td>
                <td>
                  <img  class="img2" src={`http://localhost:8081/uploads/insurance/${car.vId}`} alt={car.insuranceImage} />
                  
                </td>
                <td>
                  <img class="img2" src={`http://localhost:8081/uploads/pollution/${car.vId}`} alt={car.pollutionCertificateImage} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </table>
    </div>
  );
}
