import React, { useState } from 'react';
import './home.css'; // Import your CSS file
import { Link } from 'react-router-dom';



function HomePage() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  

  return (
    
    <div className="header">
       {/* Render the Header component at the top of your HomePage */}
       <div className="header__top">
         {/* Your header top content */}
       </div>
       <div className="header__middle">
         {/* Your header middle content */}
       </div>

       <div className='pname' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
         <h1>ADMIN</h1>
         {showDropdown && (
           <div className='dropdown'>
              <Link to="/login">Logout</Link>
           </div>
         )}
        
       </div>
       <div className='bac'>
       <div class="topnav">
   <a  href="/viewcars">VIEW CARS</a>
   <a href="/addcars">Add Cars</a>
   <a href="/updatecars">Update Cars</a>
   <a href="/deletecars">Delete Cars</a>
   <a href="/userslist">Users List</a>
   <a href="/taxidrivers">Taxi Drivers</a>
 </div>
        
       </div>
     
   </div>

  )}

export default HomePage;
