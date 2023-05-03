let clientName = document.getElementById('name');
let cardNumber = document.getElementById('card-number');
let dateArr = [
   document.getElementById('month'),
   document.getElementById('year'),
];
let month = document.getElementById('month');
let year = document.getElementById('year');
let cvc = document.getElementById('cvc');
let outputCardNumber = document.querySelector('.output-card-number');
let outputName = document.querySelector('.output-name');
let outputDate = document.querySelector('.output-date');
let outputCvc = document.querySelector('.output-cvc');
let submitBtn = document.querySelector('.submit-btn');
let continueBtn = document.querySelector('.continue-btn');
let container = document.querySelector('.container');
let form = document.querySelector('form');

//to display output in real time
clientName.addEventListener('input', () => {
   outputName.textContent = clientName.value;
});
cardNumber.addEventListener('input', () => {
   let value = cardNumber.value.replace(/\D/g, ''); //Ensures only numbers are entered
   value = value.replace(/([0-9]{4})/g, '$1 ').trim(); //arrange the numbers in group of 4
   cardNumber.value = value;
   outputCardNumber.textContent = value;
});
dateArr.forEach((item) => {
   item.addEventListener('input', () => {
      outputDate.textContent = `${month.value}/${year.value}`;
   });
});
cvc.addEventListener('input', () => {
   outputCvc.textContent = cvc.value;
});

//Error Function
function error(input, message) {
   let inputWrapper = input.parentElement;
   let errMessage = inputWrapper.querySelector('.error-message');
   inputWrapper.classList.remove('success');
   inputWrapper.classList.add('error');
   errMessage.textContent = message;
}
//Success function
function success(input) {
   let inputWrapper = input.parentElement;
   inputWrapper.classList.remove('error');
   inputWrapper.classList.add('success');
}

//validate name
function checkName(input) {
   let regEx = /^[^0-9]*$/; //to validate only string is entered
   if (input.value === '') {
      error(input, 'this field is required');
   } else if (regEx.test(input.value)) {
      success(input);
   } else {
      error(input, 'Enter only texts');
   }
}

//validate card number
function checkCardNumberFormat(input) {
   let regEx = /^\d{4}(\s\d{4}){3}$/;
   if (input.value === '') {
      error(input, 'this field is required');
   } else if (regEx.test(input.value)) {
      success(input);
   } else {
      error(input, '(16 digits) include space after every 4 digits');
   }
}

//validate month
function checkMonth(input) {
   let regEx = /^\d{2}$/;

   if (input.value === '') {
      error(input, 'These fields are requied');
   } else if (regEx.test(input.value) && input.value <= 12) {
      success(input);
   } else {
      error(input, 'Invalid entry');
   }
}

//validate year
function checkYear(month, year) {
   let regEx = /^\d{2}$/;
   const date = new Date();
   if (year.value === '') {
      error(year, 'These fields are requied');
   } else if (
      regEx.test(year.value) &&
      Number(year.value) + 2000 >= date.getFullYear() &&
      month.value > Number(date.getMonth()) + 1
   ) {
      return;
   } else if (
      regEx.test(year.value) &&
      Number(year.value) + 2000 > date.getFullYear()
   ) {
      return;
   } else {
      error(year, 'Invalid entry');
   }
}

//validate cvc
function checkCvc(input) {
   let regEx = /^\d{3}$/;
   if (input.value === '') {
      error(input, 'This field is requied');
   } else if (regEx.test(input.value)) {
      success(input);
   } else {
      error(input, 'Invalid entry');
   }
}

function resetForm() {
   outputName.textContent = 'Name';
   outputCardNumber.textContent = '0000 0000 0000 0000';
   outputDate.textContent = '00/00';
   outputCvc.textContent = '000';
   form.reset();
}

//Monitor when form is submitted
submitBtn.addEventListener('click', (e) => {
   e.preventDefault();
   checkName(clientName);
   checkCardNumberFormat(cardNumber);
   checkMonth(dateArr[0]);
   checkYear(dateArr[0], dateArr[1]);
   checkCvc(cvc);
   if (
      //only call output functions if validate was succesful
      clientName.parentElement.classList.contains('success') &&
      cardNumber.parentElement.classList.contains('success') &&
      cvc.parentElement.classList.contains('success') &&
      month.parentElement.classList.contains('success')
   ) {
      container.classList.add('created');
   }
});

continueBtn.addEventListener('click', () => {
   container.classList.remove('created');
   resetForm();
});
