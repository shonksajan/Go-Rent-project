import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewcars.css';

export default function Taxidrivers() {
  const [taxidrivers, settaxidrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8081/taxidrivers')
      .then((response) => {
        settaxidrivers(response.data);
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
        <header>Taxi Drivers list</header>
        <table className="styled-table">
          <thead>
            <tr>
              <th scope="col">First name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">email</th>
              <th scope="col">Carname</th>
              <th scope="col">CarModel</th>
              <th scope="col">Seats</th>
              <th scope="col">licensePlate</th>
              <th scope="col">ChassisNumber</th>
              <th scope="col">accountNumber</th>
              <th scope="col">Account Name</th>
              <th scope="col">IFSCCode</th>
            </tr>
          </thead>
          <tbody>
            {taxidrivers.map((taxidrivers) => (
              <tr >
                <td>{taxidrivers.firstName}</td>
                <td>{taxidrivers.lastName}</td>
                <td>{taxidrivers.phone}</td>
                <td>{taxidrivers.address}</td>
                <td>{taxidrivers.email}</td>
                <td>{taxidrivers.carName}</td>
                <td>{taxidrivers.carModel}</td>
                <td>{taxidrivers.seats}</td>
                <td>{taxidrivers.licensePlate}</td>
                <td>{taxidrivers.chassisNumber}</td>
                <td>{taxidrivers.accountNumber}</td>
                <td>{taxidrivers.accountName}</td>
                <td>{taxidrivers.ifscCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </table>
    </div>
  );
}
