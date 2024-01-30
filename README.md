# React: Payments Validation

# Link to HackerRank FrontEnd/FullStack Question:
https://www.hackerrank.com/work/questions/frontend/1436124/view/step3

# Question Find: ./Question.txt
# Animation For Question: ./WorkingModel.gif

# Problems:

# Test Cases Documentation

## Test Case: "Should have the correct input type for all fields"

### Problem Statement
This test case expects that the data type of CVV should be a number, which aligns with the theory mentioned in the question.

### Issue
In the "Should validate the CVV correctly" scenario, the test tries to add a string to a "number" type input. This will result in the string not being added to the input box, as its "number" type does not allow characters to append.

### Complication
However, if the CVV input type is changed to "text", then the first test case will fail as it expects a "number" type.

## Test Case: "Should validate the year correctly"

### Scenario
```javascript
const d = new Date();
for (let i = 0; i < 4; i++) {
  let year = d.getFullYear();
  year += Math.floor(Math.random() * 4);
  fireEvent.change(yearInput, {
    target: {
      value: year.toString(),
    },
  });
}

### Explanation
This loop runs four times, generating a year each time. The possible cases for the year value are:
- Less than the current year.
- Equal to the current year.
- One, two, or three years greater than the current year.
- More than three years greater than the current year.

### Test Case Logic: All these scenarios are already handled in the following code:

javascript
const currentYear = new Date().getFullYear();
const expYear = parseInt(update.expYear, 10);

if (expYear < currentYear || update.expYear.length !== 4 || update.expYear > currentYear + 3) {
  setCardExpYearError(true);
} else {
  setCardExpYearError(false);
}

 
### Environment

- React Version: 16.13.1
- Node Version: 14(LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/Jf80TEVtYurbOdUpzvCjHg/43C43A02-B4D2-4AD6-832E-749C5547937C_2_0_a.gif)

## Functionality Requirements

The component should perform the following validations in the form:

- The card number input field should pass the following validations:

  - The field is required.
  - It should be a number consisting of exactly 16 digits.

- The cardholder name input field should pass the following validations:

  - The field is required.
  - The name should contain english alphabetic letters only.

- The expiration month input field should pass the following validations:

  - The field is required.
  - It should be a number consisting of exactly 2 digits with numbers in range of 01 to 12. (Denoting January to December)

- The expiration year input field should pass the following validations:

  - The field is required.
  - It should be an year number consisting of exactly 4 digits, which is greater than or equal to current year and the difference from current year should be maximum 3 years.

- The cvv/cvc input field should pass the following validations:

  - The field is required.
  - It should be a number consisting of exactly 3 digits.

- Initially, the submit button should be disabled. When either field is invalid, the submit button should be disabled.

- When all fields are valid and have been touched, the submit button should be enabled.

The following data-test-id attributes are required in the component for the tests to pass:

- The card number input: 'numberInput'
- The cardholder name input: 'nameInput'
- The expiration month input: 'monthInput'
- The expiration year input: 'yearInput'
- The cvv/cvc input: 'cvvInput'
- The submit button: 'submit-button'

- The p containing the error message for:
  - the card number input: 'numberInputError'
  - the cardholder name input: 'nameInputError'
  - the expiration month input: 'monthInputError'
  - the expiration year input: 'yearInputError'
  - the cvv/cvc input: 'cvvInputError'

Please note that the component has the above data-test-id attributes for test cases and certain classes and ids for rendering purposes. They should not be changed.

## Project Specifications

**Read Only Files**

- src/App.test.js
- src/App.js

**Commands**

- run:

```bash
npm start
```

- install:

```bash
npm install
```

- test:

```bash
npm test
```
