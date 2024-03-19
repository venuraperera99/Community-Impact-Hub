import React from 'react';
import "./Success.css";

const Success = () => {
  return (
    <div className='outer-container-success'>
      <div className='success-message'>
        <h1>Payment Successful!</h1>
        <p>Thank you for your payment. An invoice has been sent to your email address.</p>
      </div>
    </div>
  );
}

export default Success;
