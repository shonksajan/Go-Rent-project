
import "./welcome.css";
import { EditOutlined } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { useEffect,useState } from "react";
import { useParams} from "react-router-dom";
// import { useHistory } from "react-router-dom";

import { useNavigate } from "react-router-dom";
function DriverProfile() {
  const nav = useNavigate();

  const [data,setData] = useState([]);
  const {id} = useParams(); 
  console.log(id);
  useEffect(()=>{
    axios.get(`http://localhost:8081/api/driver/${id}`).then((response)=>{setData(response.data)});
  },[])
  const editProfile = () => {
    // Redirect to the EditDriverProfile form when the "Edit Profile" button is clicked
    nav(`/editdriver/${id}`);
  };
  const download=(type)=>{
   
    nav(`/download/${type}`);
  }
 
  console.log(data);


  return (

    <div className="main">
  {Array.isArray(data) ? (
   data?.map((el) => {
    return (
      <>
      <div key={el.id}>
        <div className="p-info">
          <div className="pr-details">
            <div>
              <h4>{el.firstName + " " + el.lastName}</h4>
              <p className="dr">Driver</p>


            </div>
        
          
            {/* <p>{el.Phone}</p>
            <p>{el.address}</p>
            <p>{el.email}</p> */}
          </div>
          <div className="driver-details">
            <div className="head-flex">
              <h4 className="v-info">Driver Details</h4>
              <div>
              <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={editProfile}
      />
              </div>
            </div>
            <div className="flex">
              <div className="titles">
                <p>First Name</p>
                <p>Last Name</p>
                <p>Address</p>
                <p>Email</p>
                <p>Phone </p>
              </div>
              <div className="dr-d">
                <p>{el.firstName}</p>
                <p>{el.lastName}</p>
                <p>{el.address}</p>
                <p>{el.email}</p>
                <p>{el.phone}</p>
              </div>
            </div>
          </div>

          <div className="car-details">
            <div className="head-flex">
              <h4 className="v-info">Vehicle Information</h4>
              <div>
              <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={editProfile}
      />
              </div>
            </div>
            <div className="flex">
              <div className="titles">
                <p>Car name</p>
                <p>Car model</p>
                <p>Seats</p>
                <p>License plate</p>
                <p>Chassis number</p>
              </div>
              <div className="c-data">
                <p>{el.carName}</p>
                <p>{el.carModel}</p>
                <p>{el.seats}</p>
                <p>{el.licensePlate}</p>
                <p>{el.chassisNumber}</p>
              </div>
            </div>
          </div>
          <div className="card2">
          <div className="acc-details">
            <div className="head-flex">
              <h4 className="v-info">Account Information</h4>
              <div>
              <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={editProfile}
      />
              </div>
            </div>
            <div className="flex">
              <div className="titles">
                <p>Account number</p>
                <p>Account name</p>
                <p>IFSC code</p>
              </div>
              <div className="acc-d">
                <p>{el.accountNumber}</p>
                <p>{el.accountName}</p>
                <p>{el.ifscCode}</p>
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>
      </>
    );
  })
  ) : (
    <p>Loading data...</p>
  )}

      <div className="certi">
        <div className="card">
          <h6>
            Certificates{" "}
            <img
              className="verified"
              src="https://cdn-icons-png.flaticon.com/512/7641/7641727.png"
            />
          </h6>
          <div className="insurance">
            <h6>Insurance</h6>
            <Button
              type="primary"
              shape="circle"
              icon={<DownloadOutlined />}
              size={10}
              onClick={()=>{download('insurance')}}
            />
          </div>

          <div className="insurance">
            <h6>Driving Lisence</h6>
            <Button
              type="primary"
              shape="circle"
              icon={<DownloadOutlined />}
              size={10}
              onClick={()=>{download('driving_license')}}
            />
          </div>
          <div className="insurance">
            <h6>Pollution</h6>
            <Button
              type="primary"
              shape="circle"
              icon={<DownloadOutlined />}
              size={10}
              onClick={()=>{download('pollution_certificate')}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;