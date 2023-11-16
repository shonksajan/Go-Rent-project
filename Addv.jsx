import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Addv.css';

export default function Addv() {
  const [vehicleName, setVehicleName] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [Fuel, setFuel] = useState('');
  const [VehicleClass, setVehicleClass] = useState('');
  const [Enginecc, setEnginecc] = useState('');
  const [Chassisnumber, setChassisnumber] = useState('');
  const [rcdetails, setRcdetails] = useState('');
  const [carImage, setCarImage] = useState(null);
  const [insuranceImage, setInsuranceImage] = useState(null);
  const [pollutionCertificateImage, setPollutionCertificateImage] = useState(null);
  const [price, setprice] = useState('');
  

  const showSuccessMessage = () => {
    toast.success('Data inserted successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('vehicleName', vehicleName);
    formData.append('modelYear', modelYear);
    formData.append('Fuel', Fuel);
    formData.append('VehicleClass', VehicleClass);
    formData.append('Enginecc', Enginecc);
    formData.append('Chassisnumber', Chassisnumber);
    formData.append('rcdetails', rcdetails);
    formData.append('carImage', carImage);
    formData.append('insuranceImage', insuranceImage);
    formData.append('pollutionCertificateImage', pollutionCertificateImage);
    formData.append('price', price);
    
    axios
      .post('http://localhost:8081/addcars', formData)
      .then((data) => {
        console.log(data);
        setVehicleName('');
        setModelYear('');
        setFuel('');
        setVehicleClass('');
        setEnginecc('');
        setChassisnumber('');
        setRcdetails('');
        setCarImage(null);
        setInsuranceImage(null);
        setPollutionCertificateImage(null);
        setprice('');
        showSuccessMessage();
      });
  };

  return (
    <div className="addvdiv1">
      
      <section className="addvcon1">
        <header>ADD CAR</header>
        <form onSubmit={submitHandler} className="form">
          <div className="addv-input-box">
            <label htmlFor="vehicle_name">Vehicle Name:</label>
            <input
              type="text"
              id="vehicle_name"
              name="vehicle_name"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
              required
            />
          </div>
          <div className="addv-input-box">
            <label htmlFor="model_year">Model Year:</label>
            <input
              type="text"
              id="model_year"
              name="model_year"
              value={modelYear}
              onChange={(e) => setModelYear(e.target.value)}
              required
            />
          </div>
          <div className="addv-input-box">
            <label htmlFor="fuel">Fuel:</label>
            <input
              type="text"
              id="fuel"
              name="fuel"
              value={Fuel}
              onChange={(e) => setFuel(e.target.value)}
              required
            />
          </div>
          <div className="addv-input-box">
            <label htmlFor="vehicle_class">Vehicle Class:</label>
            <input
              type="text"
              id="vehicle_class"
              name="vehicle_class"
              value={VehicleClass}
              onChange={(e) => setVehicleClass(e.target.value)}
              required
            />
          </div>
          <div className="addv-input-box">
            <label htmlFor="Engine_cc">Engine CC:</label>
            <input
              type="number"
              id="Engine_cc"
              name="Engine_cc"
              value={Enginecc}
              onChange={(e) => setEnginecc(e.target.value)}
              required
            />
          </div>
          <div className="addv-input-box">
            <label htmlFor="price">price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => price(e.target.value)}
              required
            />
          </div>
          <div className="addv-input-box">
            <label htmlFor="chassis_number">Chassis number:</label>
            <input
              type="text"
              id="chassis_number"
              name="chassisnumber"
              value={Chassisnumber}
              onChange={(e) => setChassisnumber(e.target.value)}
              required
            />
          </div>
          <div className="addv-input-box">
            <label htmlFor="rc_details">RC Details:</label>
            <textarea
            rows="8" cols="60"
              type="text"
              id="rc_details"
              name="rc_details"
              
              value={rcdetails}
              onChange={(e) => setRcdetails(e.target.value)}
              required
            />
          </div>
          <div className="addv-input-box">
            <label htmlFor="car_image">Car Image:</label>
            <input
              type="file"
              id="car_image"
              name="car_image"
              onChange={(e) => setCarImage(e.target.files[0])}
              accept="image/*"
              required
            />
          </div>
          <div className="addv-input-box">
            <label htmlFor="insurance_image">Insurance Image:</label>
            <input
              type="file"
              id="insurance_image"
              name="insurance_image"
              onChange={(e) => setInsuranceImage(e.target.files[0])}
              accept="image/*"
              required
            />
          </div>
          <div className="addv-input-box">
            <label htmlFor="pollution_certificate_image">Pollution Certificate Image:</label>
            <input
              type="file"
              id="pollution_certificate_image"
              name="pollution_certificate_image"
              onChange={(e) => setPollutionCertificateImage(e.target.files[0])}
              accept="image/*"
              required
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
}