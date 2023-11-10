import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './booking.css';
import axios from 'axios';



function Booking() {
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [carType, setCarType] = useState('');
  const [pickupPoint, setPickupPoint] = useState('');
  const [dropoffPoint, setDropoffPoint] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [adharFile, setAdharFile] = useState(null);
  
  const [needDriver, setNeedDriver] = useState('yes');
  const [drivingLicenseFile, setDrivingLicenseFile] = useState(null);

  const handlePickupDateChange = (e) => {
    setPickupDate(e.target.value);
    calculateNumberOfDays(e.target.value, dropoffDate);
  };

  const handleDropoffDateChange = (e) => {
    setDropoffDate(e.target.value);
    calculateNumberOfDays(pickupDate, e.target.value);
  };

  const calculateNumberOfDays = (pickupDate, dropoffDate) => {
    if (pickupDate && dropoffDate) {
      const startDate = new Date(pickupDate);
      const endDate = new Date(dropoffDate);
      const timeDifference = endDate - startDate;
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      setNumberOfDays(daysDifference + 1); 
    }
  };

  const navigate = useNavigate();
  const [isNotARobot, setIsNotARobot] = useState(false);
  const [showPaymentOption, setShowPaymentOption] = useState(false);
  const [selfDeclarationFile, setSelfDeclarationFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(contactNumber)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    if (
      fullname &&
      address &&
      pincode &&
      contactNumber &&
      carType &&
      pickupPoint &&
      dropoffPoint &&
      pickupDate &&
      dropoffDate &&
      numberOfDays &&
      adharFile &&
      selfDeclarationFile &&
      isNotARobot
    ) {
      if (needDriver === 'no' && !drivingLicenseFile) {
        alert('Please upload your driving license.');
      } else {
        // Create a new FormData object
        const formData = new FormData();

    //     // Append your form fields to the formData object
        formData.append('fullname', fullname);
        formData.append('address', address);
        formData.append('pincode', pincode);
        formData.append('contactNumber', contactNumber);
        formData.append('carType', carType);
        formData.append('pickupPoint', pickupPoint);
        formData.append('dropoffPoint', dropoffPoint);
        formData.append('pickupDate', pickupDate);
        formData.append('dropoffDate', dropoffDate);
        formData.append('numberOfDays', numberOfDays);
        formData.append('needDriver', needDriver);

        
        formData.append('adhar', adharFile);
        formData.append('declaration', selfDeclarationFile);
        if (needDriver === 'no') {
          formData.append('license', drivingLicenseFile);
        }
        console.log(formData.get('license'))
        
        axios.post('http://localhost:8081/booking', formData)
          .then((res) => {
            console.log(res);
            navigate('/Payment');
          })
          .catch((error) => {
            console.error('An error occurred:', error);
          }
          );
      }
    } 
    else {
      alert('Please fill out all mandatory fields.');
    }
  };

  
  

  return (
    <div className='container-booking'>
        <div className='booking-form'>
      <h2>Book your Ride!!</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />

        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label>Pincode:</label>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />

        <label>Contact Number:</label>
        <input
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />

        <label>Car Type:</label>
        <select
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
          required
        >
          <option value="">Select Car Type</option>
          <option value="compact">Compact</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
        </select>

        <label>Pickup Point:</label>
        <input
          type="text"
          value={pickupPoint}
          onChange={(e) => setPickupPoint(e.target.value)}
          required
        />

        <label>Drop-off Point:</label>
        <input
          type="text"
          value={dropoffPoint}
          onChange={(e) => setDropoffPoint(e.target.value)}
          required
        />

<label>Pickup Date:</label>
        <input
          type="date"
          value={pickupDate}
          onChange={handlePickupDateChange}
          required
        />

        <label>Drop-off Date:</label>
        <input
          type="date"
          value={dropoffDate}
          onChange={handleDropoffDateChange}
          required
        />

        <label>Number of Days:</label>
        <input
          type="number"
          value={numberOfDays}
          onChange={(e) => setNumberOfDays(e.target.value)}
          required
        />

        <label>Do you need a driver?</label>
        <div>
          <label>
            <input
              type="radio"
              name="needDriver"
              value="yes"
              checked={needDriver === 'yes'}
              onChange={() => setNeedDriver('yes')}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="needDriver"
              value="no"
              checked={needDriver === 'no'}
              onChange={() => setNeedDriver('no')}
            />
            No
          </label>
        </div>

        {needDriver === 'no' && (
          <div>
            <label>Upload Driving License (PDF only):</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setDrivingLicenseFile(e.target.files[0])}
              required
            />
          </div>
        )}

        <label>Upload Aadhar (PDF only):</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setAdharFile(e.target.files[0])}
          required
        />
        
        <label>Upload Self Declaration (PDF only):</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setSelfDeclarationFile(e.target.files[0])}
          required
        />
        <label>Sample Self Declaration Form:</label>
        <a
          href="https://drive.google.com/file/d/1Snqu1DB8Zu3oiAxwVLyVr_4xIPlENxBG/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
        >
    View Sample Form
  </a>
       

        <div>
          <label>
            <input
              type="checkbox"
              checked={isNotARobot}
              onChange={() => setIsNotARobot(!isNotARobot)}
            />
            I am not a Robot
          </label>
        </div>

        {isNotARobot && ( 
          <div>
            <button type="submit">Proceed to Payment</button>
          

        {/* <button type="submit">Book Now</button> */}
        </div>
        )}
      </form>
      </div>
      {/* <div className="poster">
      <img src="/images/ofr2.png" alt="ofr" />
  </div> */}
    </div>
  );
}

export default Booking;
