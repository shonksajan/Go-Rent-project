import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import Contact from "../pages/Contact";





// admin //
import Login from "../admin/Login"; 
import HomePage from "../admin/HomePage";
import Viewcars from "../admin/Viewcars";
import Addv from "../admin/Addv";
import DeleteCar from "../admin/DeleteCar";
import UpdateCar from "../admin/UpdateCar";
import Userslist from "../admin/Userslist";
import Taxicars from "../admin/Taxidrivers"
import Signin from "../user/signin";
import Userlogin from "../user/userlogin";
import TermsndConditions from "../user/Termsndcondition";
import Booking from "../user/Booking";
import Payment from "../user/Payment";





// taxi
import LoginTaxiDriver from "../pages/Login";
import DriverDashboard from "../pages/DriverDashboard/DriverDashboard";
import DriverProfile from "../pages/DriverProfile";
import EditDriverProfile from "../pages/EditDriverProfile";
import DownloadFile from "../pages/DownloadFile/DownloadFile";
import Register from "../pages/Register/Register"
import CarList from "../pages/CarList/Index";

const Routers = () => {
  return (
    <Routes>
       <Route path="/login"element={<Login />} />
      <Route path="/" element={<Home />} />

      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />


      <Route path="/taxicars" element={<CarList/>}/>
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/addcars" element={<Addv />} />
      <Route path="/viewcars" element={<Viewcars />} />
      <Route path="/deletecars" element={<DeleteCar />} />
      <Route path="/updatecars" element={<UpdateCar />} />
      <Route path="/userslist" element={<Userslist />} />
      
       
      <Route path="/usersignin" element={<Signin />} />
      <Route path="/userlogin" element={<Userlogin />} />
      <Route path="/termsndcondition" element={<TermsndConditions/>} />
      <Route path="/booking" element={<Booking/>} />
      <Route path="/payment" element={<Payment/>} />


      <Route path="/taxi-driver-login" element={<LoginTaxiDriver />} />
      <Route path="/driver" element={<DriverDashboard/>}/>
      <Route path="/driverprofile/:id" element={<DriverProfile/>}/>
      <Route path="/editdriver/:id" element={<EditDriverProfile/>}/>
      <Route path='/download/:type' element={<DownloadFile/>}/>
      <Route path="/register/taxi-driver" element={<Register/>}/>

      


    </Routes>
  );
};

export default Routers;
