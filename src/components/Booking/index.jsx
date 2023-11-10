// import React from 'react';
// import './driver.css';
// import { Link } from 'react-router-dom';
// import { CarOutlined, FileTextOutlined, StarOutlined } from '@ant-design/icons'; // Import Ant Design icons

// function Driver() {
//   return (
//     <div className="drive-main">
//       <section className="hero">
//         <div className="hero-content">
//           <h1>Welcome, Driver!</h1>
//           <p>Thank you for registering your taxi with us.</p>
//           <p>Your taxi is now ready to hit the road.</p>
//         </div>
//       </section>
//       <section className="features">
//         <div className="feature">
//           <h2>
//             <Link to="/driverprofile">
//               <CarOutlined /> Manage Your Taxi
//             </Link>
//           </h2>
//           <p>Update your taxi details and availability.</p>
//         </div>
//         <div className="feature">
//           <h2>
//             <Link to="/bookings">
//               <FileTextOutlined /> Bookings
//             </Link>
//           </h2>
//           <p>Track your bookings and ride history.</p>
//         </div>
//         <div className="feature">
//           <h2>
//             <Link to="/feedback">
//               <StarOutlined /> Customer Feedback
//             </Link>
//           </h2>
//           <p>View feedback and ratings from passengers.</p>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Driver;

import "./booking.css";

import { Link } from 'react-router-dom';

function Booking() {
 
  const id =localStorage.getItem('userid');
  console.log(id);

  return (
    <div className="content">
      
          <>
            <div className="info">
              <div className="head">
                <div>
                  <h4> Welcome</h4>
                  <p className="heading"><Link to={`/driverprofile/${id}`}>
               Manage your profile
           </Link></p>
                </div>
                
              </div>

              <div className="booking-detail">
                <div className="heading-flex">
                  <h4 className="b-info">Bookings</h4>
                  
                </div>
                <div className="flexx">
                  <div className="title">
                    <p>Date</p>
                    <p>Trip to munnar for three days</p>
                    
                  </div>
                  <div className="title">
                    <p>Date</p>
                    <p>Trip to munnar for three days</p>
                    
                  </div>
                  <div className="title">
                    <p>Date</p>
                    <p>Trip to munnar for three days</p>
                    
                  </div>
                  <div className="title">
                    <p>Date</p>
                    <p>Trip to munnar for three days</p>
                    
                  </div>

                  <div className="title">
                    <p>Date</p>
                    <p>Trip to munnar for three days</p>
                    
                  </div>
                 
                </div>
              </div>

              
              

            </div>
          </>
       

     
    </div>
  );
}

export default Booking;