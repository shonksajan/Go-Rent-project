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

// taxi


const Routers = () => {
  return (
    <Routes>
       <Route path="/login"element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />


      <Route path="/taxicars" element={<Taxicars />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/addcars" element={<Addv />} />
      <Route path="/viewcars" element={<Viewcars />} />
      <Route path="/deletecars" element={<DeleteCar />} />
      <Route path="/updatecars" element={<UpdateCar />} />
      <Route path="/userslist" element={<Userslist />} />
       
     


    </Routes>
  );
};

export default Routers;
