import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

function TermsndConditions() {
    const navigate=useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreeCheckboxChange = () => {
    setIsAgreed(!isAgreed);
    
  };
  const handleProceedToBooking = () => {
    // Redirect to the booking page
    navigate('/Booking');
  };

  return (
    <div className="main1">
      <h2>Terms and Conditions</h2>
      <h4>CAR RENTAL TERMS</h4>
      <p>1. The renter fully agrees to the terms and conditions of this contract and has received a copy thereof.<br/>

2. The renter has received the mentioned vehicle and its accessories in proper and safe condition.<br/>

3. The renter agrees to return the vehicle to the lessor on the agreed date and place, as written in the contract, or earlier if the lessor so insists. Should the vehicle not be returned on the agreed time, a fee equal to 1/3 of the daily rate shall be charged for each hour of delay.<br/>

4. Liability and driver insurance are according to Icelandic law. Third party liability insurance shall be equivalent to the amount stipulated by the car's insurance company at each time. The renters own liability for damages on the car is limited to the worth of the car. The renter can limit his liability by purchasing a collision damage waiver (CDW) for a fixed amount which is determined each time by the lessor.  The driver liability in excess of ISK 220,000,- for 2wd and 330,000,- for 4wd and vans.<br/>

5. The collision damage waiver (CDW) does not cover:<br/>
a) Damages done on purpose or by total carelessness of the driver.<br/>
b) Damages caused when the driver is intoxicated, under the influence of drugs, or by any other cause which renders him unfit to safely drive a vehicle.<br/>
c) Damages to the engine caused by water, such as when crossing un-bridged rivers or driving in water.<br/>
d) Damages which occur while the car is being raced or test-driven.<br/>
e) Damages caused through war activity, mutiny, riots, and uproar or by sabotage.<br/>
f) Burns on seats, carpets or floor mats.<br/>
g) Damages to wheels, tires, springs, batteries, glass (lights & windows), and radio as well as damages caused by theft of certain parts of the vehicle.<br/>
h) Damages caused by driving on bumpy roads on parts such as:<br/>
transmission, drive shafts, or other parts in or on the vehicle's under wagon. Damages which occur on the under wagon when the vehicle hits the uneven road, such as ridges left by road planers, or rocks stuck in the road or the roadside. Same applies to damages which occur when loose rocks or other items hit the vehicle while it is being driven.<br/>
i) Damages caused when the vehicle is driven where driving is forbidden, also by driving off-road, on trails not marked on charts as normal roads, on snow piles, on ice, over un-bridged rivers or streams, on beaches, in dirt or on any other kind of off-roads.<br/>
j) Damages when sand, gravel, ash, lava or other earth materials are blown on the vehicle.<br/>
k) Should the vehicle be moved by sea, damages caused to it by the ocean water will not be paid.<br/>
l) Damages caused by the wind blowing up the door while opening it.<br/>
m) Other cases are referred to the general conditions of the comprehensive vehicle insurance.<br/>

 

6. SUPER CDW: CDW covers damages to the rental vehicle; it waives liability in case of any damages to the vehicle in excess of ISK 220.000 for 2wd and ISK 330.000 for 4wd and vans. But when you take Super CDW you change that to ISK 100.000 for 2wd and 160.000 ISK for 4wd and vans. Super CDW is available for ISK 1.300,- per day. But no insurance covers damages to the underside of the car.<br/>

7. The car must be operated and driven with great care. The renter shall be liable for all damage to the car and injury sustained by passengers caused by collision or accident, which is not paid by the insurance company of the vehicle.<br/>

8. In case of a collision or accident, the renter must report it instantly to law enforcement authorities and to the lessor, and must not leave the scene of the accident or collision until such action has been taken and after the police has arrived on the scene.<br/>

9. Renter shall return the vehicle to the office of the lessor which has been agreed upon at the beginning of the rental period, along with all tires, tools, accessories and equipment in same condition as it was when received, though ordinary wear and tear is accepted. Lessor may repossess the vehicle without notice at any time if it is illegally parked, used in violation of law, against the terms of this agreement or is apparently abandoned.<br/>

10. Under no circumstances is it permitted to use the vehicle, operate or drive:<br/>
a) In violation of Icelandic law, or the conditions and terms of this contract.<br/>
b) For the transportation of passengers or property against payment.<br/>
c) To propel or tow any vehicle, trailer or other objects.<br/>
d) By any person other than the renter signing this contract, unless by written consent of lessor.</p>
      
      {/* Checkbox for agreeing to terms */}
      <label>
        <input
          type="checkbox"
          checked={isAgreed}
          onChange={handleAgreeCheckboxChange}
        />{' '}
        Click here to agree to our terms and conditions
      </label>

      {/* Booking button */}
      {isAgreed && (
        <Link to="/Booking">
          <button onClick={handleProceedToBooking}>Proceed to Booking</button>
        </Link>
      )}

      {/* Back to login button */}
      <Link to="/userlogin">Back to Login</Link>
    </div>
  );
}

export default TermsndConditions;
