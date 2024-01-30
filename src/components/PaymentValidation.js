import React, { useState } from "react";
import "./PaymentValidation.css";

const PaymentValidation = () => {


  const [cardDetails, setCardDetails] = 
  useState({
    cardNumber: '',
    holderName: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });

  const [cardNumberError, setCardNumberError] = useState(false);
  const [cardHolderError, setCardHolderError] = useState(false);
  const [cardExpMonthError, setCardExpMonthError] = useState(false);
  const [cardExpYearError, setCardExpYearError] = useState(false);
  const [cardCVVError, setCardCVVError] = useState(false);

  const isDisable = (cardNumberError || cardCVVError || cardHolderError || cardExpMonthError || 
                    cardExpYearError) ||
                    (cardDetails.cardNumber === '' )
                    || (cardDetails.holderName === '') ||
                    (cardDetails.expMonth === '') ||
                    (cardDetails.expYear === '') ||
                    (cardDetails.cvv === '') ? true : false;


  const inputHandler = (event, field) => {
    
    setCardDetails((prev) => {
      const update = {...prev, [field]: event.target.value.trim()};
      if (field === 'cardNumber') {

        let regex = /^\d{16}$/;
        if (!regex.test(update.cardNumber)) {
          setCardNumberError(true);
        } else {
          setCardNumberError(false);
        }
      } 
      else if (field === 'holderName') {
        let regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
        if (!regex.test(update.holderName)) {
          setCardHolderError(true);
        } else {
          setCardHolderError(false);
        }
      } else if (field === 'expMonth') {
        if (update.expMonth <= 0 || update.expMonth > 12 || update.expMonth.length !== 2) {
          setCardExpMonthError(true);
        } else {
          setCardExpMonthError(false);
        }
      } else if (field === 'expYear') {
        const currentYear  = new Date().getFullYear();
        const expYear = parseInt(update.expYear, 10);

        if (expYear < currentYear || update.expYear.length !== 4 || update.expYear > currentYear +3) {
          setCardExpYearError(true);
        } else {
          setCardExpYearError(false);
        }
      } else if (field === 'cvv') {
        const cvvRegex = /^\d{3}$/;
        if ( !cvvRegex.test(update.cvv)) {
          setCardCVVError(true);
        } else {
          setCardCVVError(false);
        }
      }
      
      return update;
    })
  }




  return (
    <div className="mt-30 layout-column justify-content-center align-items-center">
      <div className="card outlined" style={{ width: "650px" }}>
        <div data-testid="debit-card">
          <h3 style={{ textAlign: "center" }}>Card Details</h3>
          <br />
          <div className="debit-card-body">
            <p className="debit-card-bank">Bank Name</p>
            <p className="debit-card-no">{cardDetails.cardNumber === '' ? 'XXXXXXXXXXXXXXXX' : cardDetails.cardNumber}</p>
            <br />
            <div
              style={{ height: "45px", backgroundColor: "black" }}
              className="debit-card-stripe"
            ></div>
            <p>
              <span className="debit-card-holder-name">{cardDetails.holderName === '' ? 'HOLDER NAME' : cardDetails.holderName}</span>
              <span className="debit-card-date">MM/YYYY</span>
              <span className="debit-card-cvv">CVV</span>
            </p>
          </div>
        </div>
        <section>
          <div className="pa-50">

            <form onSubmit={(e) => e.preventDefault()}>

              <div className="layout-column mb-15">
                <input
                  placeholder="Card Number"
                  value={cardDetails.cardNumber}
                  onChange={(e)=> {inputHandler(e, 'cardNumber')}}
                  required
                  type="text"
                  className="no-spinners"
                  data-testid="cardNumberInput"
                />
                {/* ERROR */}
                {cardNumberError && 
                  <p className="invalid-text" data-testid="numberInputError">
                    Invalid Card Number
                  </p>}                  
              </div>


              <div className="layout-column mb-15">
                <input 
                  required
                  type="text"
                  onChange={(e) => {inputHandler(e, 'holderName')}}
                  placeholder="Name On Card" 
                  data-testid="nameInput" />

                {/* ERROR */}
                {cardHolderError && 
                  <p className="invalid-text" data-testid="nameInputError">
                  Invalid Card Name
                </p>}
              </div>


              <div className="flex justify-content-around align-items-center">

                <div className="layout-column mb-30">
                  <input 
                    placeholder="Expiry Month" 
                    data-testid="monthInput" 
                    value={cardDetails.expMonth}
                    required
                    onChange={(e) => inputHandler(e, 'expMonth')}
                    type="number"/>
                  {/* ERROR */}

                  {cardExpMonthError && 
                    <p className="invalid-text" data-testid="monthInputError">
                    Invalid Month
                  </p>}
                </div>


                <div className="layout-column mb-30">
                  <input 
                    required
                    value={cardDetails.expYear}
                    type="number"
                    onChange={(e) => {inputHandler(e, 'expYear')}}
                    placeholder="Expiry Year" 
                    data-testid="yearInput" />
                  <p className="invalid-text" data-testid="yearInputError">
                    {cardExpYearError && "Invalid Year"}
                  </p>
                </div>


                <div className="layout-column mb-30">
                  <input 
                    type="number"
                    required
                    value={cardDetails.cvv}
                    onChange={(e) => {inputHandler(e, 'cvv')}}
                    placeholder="CVV" 
                    data-testid="cvvInput" />
                  <p className="invalid-text" data-testid="cvvInputError">
                    {cardCVVError && "Invalid CVV"}
                  </p>
                </div>
                
              </div>


              <div className="layout-column mb-30">
                <button
                  type="submit"
                  className="mx-0"
                  data-testid="submitButton"
                  disabled={isDisable}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentValidation;
