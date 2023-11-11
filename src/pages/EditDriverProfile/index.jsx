// EditDriverProfile.js
import "./EditDriverProfile.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

function EditDriverProfile() {
  const { id } = useParams();
  const nav = useNavigate();
  const [driverData, setDriverData] = useState({});
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8081/api/driver/${id}`).then((response) => {
      setDriverData(response.data[0]); 
      setEditedData(response.data[0]);// Assuming the driver's data is the first element of the array
    });
    
   
  }, [id]);

  console.log(editedData)
 

  const handleEdit = () => {
     setEditedData(driverData);
    if (!editedData.firstName) {
      // Display an error message or handle the validation error here
      console.error("First Name is required.");
      return;
    }

    axios
      .post(`http://localhost:8081/api/driver/update/${id}`, editedData)
      .then((response) => {
        console.log("Server response:", response.data);
        // After the update is successful, navigate back to the driver profile page
        nav(`/driverprofile/${id}`);
      })
      .catch((error) => {
        console.error("Error updating driver profile:", error);
        // Handle the error appropriately, e.g., show an error message
      });
  };

 


  return (
    <div className="container1">
      <h2 className="edithead">EDIT PROFILE</h2>
      <Form>
        <div className="form-item2">
          <label>First Name:</label>
          <Input
            value={editedData.firstName || driverData.firstName}
            onChange={(e) =>
              setEditedData({ ...editedData, firstName: e.target.value })
            }
          />
        </div>
        <div className="form-item2">
          <label>Last Name:</label>
          <Input
            value={editedData.lastName || driverData.lastName}
            onChange={(e) =>
              setEditedData({ ...editedData, lastName: e.target.value })
            }
          />
        </div>
        <div className="form-item2">
          <label>Address:</label>
          <Input
            value={editedData.address || driverData.address}
            onChange={(e) =>
              setEditedData({ ...editedData, address: e.target.value })
            }
          />
        </div>
        <div className="form-item2">
          <label>Email:</label>
          <Input
            value={editedData.email || driverData.email}
            onChange={(e) =>
              setEditedData({ ...editedData, email: e.target.value })
            }
          />
        </div>
        <div className="form-item2">
          <label>Phone:</label>
          <Input
            value={editedData.phone || driverData.phone}
            onChange={(e) =>
              setEditedData({ ...editedData, phone: e.target.value })
            }
          />
        </div>
        <div className="form-item2">
          <label>Car Name:</label>
          <Input
            value={editedData.carName || driverData.carName}
            onChange={(e) =>
              setEditedData({ ...editedData, carName: e.target.value })
            }
          />
        </div>
        <div className="form-item2">
          <label>Car Model:</label>
          <Input
            value={editedData.carModel || driverData.carModel}
            onChange={(e) =>
              setEditedData({ ...editedData, carModel: e.target.value })
            }
          />
        </div>
        <div className="form-item2">
          <label>Seats:</label>
          <Input
            value={editedData.seats || driverData.seats}
            onChange={(e) =>
              setEditedData({ ...editedData, seats: e.target.value })
            }
          />
        </div>
        <div className="form-item2">
          <label>Rate:</label>
          <Input
            value={editedData.rate || driverData.rate}
            onChange={(e) =>
              setEditedData({ ...editedData, rate: e.target.value })
            }
          />
        </div>
        <div className="form-item2">
          <label>License Plate:</label>
          <Input
            value={editedData.licensePlate || driverData.licensePlate}
            onChange={(e) =>
              setEditedData({ ...editedData, licensePlate: e.target.value })
            }
          />
        </div>
        <div className="form-item2">
          <label>Chassis Number:</label>
          <Input
            value={editedData.chassisNumber || driverData.chassisNumber}
            onChange={(e) =>
              setEditedData({ ...editedData, chassisNumber: e.target.value })
            }
          />
        </div>
        <div className="form-item2">
          <label>Account Number:</label>
          <Input
            value={editedData.accountNumber || driverData.accountNumber}
            onChange={(e) =>
              setEditedData({ ...editedData, accountNumber: e.target.value })
            }
          />
        </div>
        <div className="form-item2">
          <label>Account Name:</label>
          <Input
            value={editedData.accountName || driverData.accountName}
            onChange={(e) =>
              setEditedData({ ...editedData, accountName: e.target.value })
            }
          />
        </div>
        <div className="form-item2">
          <label>IFSC Code:</label>
          <Input
            value={editedData.ifscCode || driverData.ifscCode}
            onChange={(e) =>
              setEditedData({ ...editedData, ifscCode: e.target.value })
            }
          />
        </div>
        <Button className="btn5" type="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
}

export default EditDriverProfile;
