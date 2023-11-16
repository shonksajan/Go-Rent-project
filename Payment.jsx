import React, { useState } from 'react';
import './payment.css';

function Payment() {
  const [redirectingWindow, setRedirectingWindow] = useState(null);
  const [isFormIncomplete, setIsFormIncomplete] = useState(false);

  const openRedirectingWindow = () => {
    // Get input values
    const cardNumber = document.getElementById('cno').value;
    const cardName = document.getElementsByName('name')[0].value;
    const expiration = document.getElementById('exp').value;
    const cvv = document.getElementsByName('cvv')[0].value;

    // Check if any input is empty
    if (!cardNumber || !cardName || !expiration || !cvv) {
      setIsFormIncomplete(true);
      return;
    }

    // Clear the warning message
    setIsFormIncomplete(false);

    const newWindow = window.open('', '_blank', 'width=400,height=200');
    newWindow.document.write('<html><head><title>Redirecting to Bank Server</title></head><body>');
    newWindow.document.write('<h2>Redirecting to Bank Server...</h2>');
    newWindow.document.write('</body></html>');

    setTimeout(() => {
      newWindow.close();
      setRedirectingWindow(newWindow);

      const successWindow = window.open('', '_blank', 'width=400,height=200');
      successWindow.document.write('<html><head><title>Transaction Successful</title></head><body>');
      successWindow.document.write('<h2>Transaction Successful</h2>');
      successWindow.document.write('<p>Your transaction was successful.</p>');
      successWindow.document.write('<p><a href="/">Return to Login</a></p>');
    }, 3000);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-12">
            <div className="card mx-auto">
              <h4 className="heading">PAYMENT DETAILS</h4>
              <form className="card-details">
                <div className="form-group mb-0">
                  <p className="text-warning mb-0">Card Number</p>
                  <input
                    type="text"
                    name="card-num"
                    placeholder="1234 5678 9012 3457"
                    size="17"
                    id="cno"
                    minLength="16"
                    maxLength="16"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    width="64px"
                    height="60px"
                    alt="Visa"
                  />
                </div>

                <div className="form-group">
                  <p className="text-warning mb-0">Cardholder's Name</p>
                  <input type="text" name="name" placeholder="Name" size="17" />
                </div>
                <div className="form-group pt-2">
                  <div className="row d-flex">
                    <div className="col-sm-4">
                      <p className="text-warning mb-0">Expiration</p>
                      <input
                        type="text"
                        name="exp"
                        placeholder="MM/YYYY"
                        size="7"
                        id="exp"
                        minLength="5"
                        maxLength="5"
                      />
                    </div>
                    <div className="col-sm-3">
                      <p className="text-warning mb-0">CVV</p>
                      <input
                        type="password"
                        name="cvv"
                        placeholder="CVV"
                        size="1"
                        minLength="3"
                        maxLength="3"
                      />
                    </div>
                    <div className="col-sm-5 pt-0">
                      {isFormIncomplete && (
                        <p className="text-danger">Please enter all details.</p>
                      )}
                      <button type="button" onClick={openRedirectingWindow}>
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
