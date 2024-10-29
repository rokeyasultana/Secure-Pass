const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const passwordDisplay = document.getElementById('passwordDisplay');
const strengthDisplay = document.getElementById('strengthDisplay');

// Character sets
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
});

// generate password
function generatePassword() {
  const length = parseInt(lengthSlider.value);
  let characterSet = '';

  if (uppercaseCheckbox.checked) characterSet += UPPERCASE;
  if (lowercaseCheckbox.checked) characterSet += LOWERCASE;
  if (numbersCheckbox.checked) characterSet += NUMBERS;
  if (symbolsCheckbox.checked) characterSet += SYMBOLS;

  if (characterSet === '') {
    passwordDisplay.textContent = 'Please select at least one character type.';
    return '';
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    password += characterSet[randomIndex];
  }

  passwordDisplay.textContent = password;
  checkStrength(password);
}

// check strength
function checkStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  if (strength <= 2) {
    strengthDisplay.textContent = 'Strength: Weak';
    strengthDisplay.style.color = 'red';
  } else if (strength <= 4) {
    strengthDisplay.textContent = 'Strength: Medium';
    strengthDisplay.style.color = 'orange';
  } else {
    strengthDisplay.textContent = 'Strength: Strong';
    strengthDisplay.style.color = 'green';
  }
}

generateBtn.addEventListener('click', generatePassword);

const copyBtn = document.getElementById('copyBtn');

copyBtn.addEventListener('click', () => {
  const password = passwordDisplay.textContent;
  navigator.clipboard.writeText(password).then(() => {
    alert('Password copied to clipboard!');
  });
});
