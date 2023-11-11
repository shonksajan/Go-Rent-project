
import { useEffect } from 'react';
import Card from '../Card';
import { useState } from 'react';
import axios from 'axios';
function CarList(){

  const [data,setData] =useState([]);
    


      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:8081/api/carlist/");
            console.log(response.data);
            setData(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        fetchData();
      }, []);
      
     
    return(
        <>



         <div style={{display:"flex", flexWrap:"wrap", gap:"10px"}}>
          {data.map((el)=>{return(
            <Card
           // Don't forget to add a unique key prop when mapping
            item={{
              imgUrl: el.additional_image,
              carName: el.carName,
              rate:el.rate,
              seats:el.seats,
              acType:el.acType,
              model: el.carModel,
             
            }}
          />
          )})}
         </div>
        </>
    )
}
export default CarList