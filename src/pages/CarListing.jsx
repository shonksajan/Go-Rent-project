// CarListing.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import CommonSection from "../components/UI/CommonSection";
import axios from "axios";
import "./car-item.css";

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/viewcars")
      .then((response) => {
        setCars(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section className="car-listing">
        <Container>
          <Row>
            {cars.map((car) => (
              <Col lg="4" key={car.vId}>
                <div className="car-card">
                  <img
                    className="car-image"
                    src={`http://localhost:8081/uploads/car/${car.vId}`}
                    alt={car.carImage}
                  />
                  <div className="car-name">{car.vehicleName}</div>
                  <div>₹{car.price} / Day</div>
                  <div>{car.modelYear}</div>
                  <div>{car.Fuel}</div>
                  <div>{car.vehicleClass}</div>
                  <Link to="/login">
                    <button className="book-now-button">Book Now</button>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
