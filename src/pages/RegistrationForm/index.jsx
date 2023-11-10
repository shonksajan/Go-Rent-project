

import "./registerform.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState({
   
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    password: "", 
    confirmPassword: "", 
   
    carName: "",
    carModel: "",
    seats: "",
    licensePlate: "",
    chassisNumber: "",

  
    insurance: null,
    pollutionCertificate: null,
    drivingLicense: null,

   
    accountNumber: "",
    accountName: "",
    ifscCode: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState(""); 
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "confirmPassword") {
      // Check if password and confirm password match
      if (formData.password !== value) {
        setPasswordError("Passwords do not match.");
      } else {
        setPasswordError("");
      }
    }

    if (type === "email") {
      
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(value)) {
        setEmailError("Enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
    if (name === "password") {
      
      if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters long.");
      } else {
      
        const letterRegex = /[A-Za-z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*]/; 
  
        if (!letterRegex.test(value) || !numberRegex.test(value) || !specialCharRegex.test(value)) {
          setPasswordError("Password must include at least one letter, one number, and one special character.");
        } else {
          setPasswordError("");
        }
      }
    }
    if (name === "phone") {
     
      const phoneRegex = /^\d{10}$/; 
      if (!phoneRegex.test(value)) {
        setPhoneError("Enter a valid 10-digit phone number.");
      } else {
        setPhoneError("");
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) {
      
      return;
    }

    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(
        "http://localhost:8081/register/taxi-driver",                          
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",                                              
          },
        }
      );

      if (response.status === 200) {
        console.log("Registration successfull");
        navigate('/taxi-driver-login');
      } else {
        
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  console.log(formData.drivingLicense)

  return (
    
    <div className="regform-ctn">
      
      <div className="regform">
        <form onSubmit={handleSubmit}  >
          <h1 className="main-head">REGISTER</h1>
          {/* Driver Details */}
          <div className="driver">
            <h3>Driver Details</h3>
            <div className="form-group">
              <label>
                First Name:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Last Name:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Phone:<span className="required">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {phoneError && <div className="error-message">{phoneError}</div>}
            </div>
            <div className="form-group">
              <label>
                Address:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Email:<span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>
            <div className="form-group">
        <label>
          Password:<span className="required">*</span>
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>
          Confirm Password:<span className="required">*</span>
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {passwordError && <div className="error-message">{passwordError}</div>}
      </div>
          </div>

          {/* Car Details */}
          <div className="car">
            <h3>Car Details</h3>
            <div className="form-group">
              <label>
                Car Name:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="carName"
                value={formData.carName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Car Model:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Number of Seats:<span className="required">*</span>
              </label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                License Plate Number:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Chassis Number:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="chassisNumber"
                value={formData.chassisNumber}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="form-group">
              <label>
                Upload Image:
                <span className="required">*</span>
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                required
              />
            </div> */}
          </div>


          <div className="form-group">
  <label>
    Additional Image:<span className="required">*</span>
  </label>
  <input
    type="file"
    name="additionalImage"
    onChange={handleChange}
    required
  />
</div>


          {/* Uploaded Documents */}
          <div className="documents">
            <h3>Upload Documents</h3>
            <div className="form-group">
              <label>
                Insurance:<span className="required">*</span>
              </label>
              <input
                type="file"
                name="insurance"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Pollution Certificate:<span className="required">*</span>
              </label>
              <input
                type="file"
                name="pollutionCertificate"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Driver's Driving License:
                <span className="required">*</span>
              </label>
              <input
                type="file"
                name="drivingLicense"
                onChange={handleChange}
                required
              />
            </div>
            
          </div>

          {/* Bank Account Details */}
          <div className="bank">
            <h3>Bank Account Details</h3>
            <div className="form-group">
              <label>
                Account Number:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Account Name:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                IFSC Code:<span className="required">*</span>
              </label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

        
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;