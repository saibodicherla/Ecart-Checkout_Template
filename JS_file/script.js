var activeElement = '';
var phoneNumber = '';

var phoneScreen = $('#half1');
phoneScreen.focusin(function() {
  console.log('1');
  phoneNumber = phoneScreen.val();
  activeElement = phoneScreen;
  if (phoneNumber.length === 6) {
    phoneNumber = '';
    activeElement = phoneScreen3;
  }
});

var phoneScreen3 = $('#half2');
phoneScreen3.focusin(function() {
  phoneNumber = phoneScreen3.val();
  console.log('2', phoneNumber.length);
  activeElement = phoneScreen3;
});

var phoneScreen2 = $('#phone2');
phoneScreen2.focusin(function() {
  phoneNumber = phoneScreen2.val();
  console.log('phoneScreen2', phoneNumber.length);
  activeElement = phoneScreen2;
});

var delBtn = $('#del');
var clrBtn = $('#clr');
var numBtn = $('.number');

numBtn.click(function() {
  var number = $(this).val();
  updatePhoneNumber(number);
  printPhoneNumber();
});
delBtn.click(function() {
  deleteNumber();
  printPhoneNumber();
});
clrBtn.click(function() {
  clearNumber();
  printPhoneNumber();
});

function updateTotalPrice() {
  var priceSpan = document.getElementById('totalPrice');
  var total =
    parseInt(document.getElementById('product-price').innerText, 10) +
    parseInt(document.getElementById('price').innerText, 10) +
    parseInt(document.getElementById('shippingHidden').value, 10);
  console.log({
    x: parseInt(document.getElementById('shippingHidden').value, 10),
  });
  priceSpan.innerHTML = total;
}

function updatePhoneNumber(newNumber) {
  if (phoneNumber.length >= 4 && activeElement === phoneScreen3) return;
  if (phoneNumber.length >= 10) return;
  phoneNumber = phoneNumber + newNumber;
}
function deleteNumber() {
  phoneNumber = phoneNumber.slice(0, -1);
}
function clearNumber() {
  phoneNumber = '';
}
function printPhoneNumber() {
  activeElement.val(phoneNumber);
  activeElement.focus();
}

var p = '599';
var price = `<span>${p}</span>` + ' Kr';
document.getElementById('product-price').innerHTML = price;

function incrementValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
  price = `<span>${p * value}</span>` + ' Kr';
  document.getElementById('product-price').innerHTML = price;
  updateTotalPrice();
}

function fremove() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  if (value == 0) return;
  value--;
  document.getElementById('number').value = value;

  price = `<span>${p * value}</span>` + ' Kr';
  document.getElementById('product-price').innerHTML = price;
  updateTotalPrice();
}

var p1 = '79';
var price1 = `<span>${p1}</span>` + ' Kr';
document.getElementById('price').innerHTML = price1;

//Second item

function add() {
  var value = parseInt(document.getElementById('number1').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number1').value = value;
  price1 = `<span>${p1 * value}</span>` + ' Kr';
  document.getElementById('price').innerHTML = price1;
  updateTotalPrice();
}

function remove() {
  var value = parseInt(document.getElementById('number1').value, 10);
  value = isNaN(value) ? 0 : value;
  if (value == 0) return;
  value--;
  document.getElementById('number1').value = value;

  price1 = `<span>${p1 * value}</span>` + ' Kr';
  document.getElementById('price').innerHTML = price1;
  updateTotalPrice();
}

document.getElementById('togglePhone').addEventListener('click', function() {
  document.getElementById('phone2').disabled = false;
  document.getElementById('phone2').focus();
});

function setInputFilter(textbox, inputFilter) {
  [
    'input',
    'keydown',
    'keyup',
    'mousedown',
    'mouseup',
    'select',
    'contextmenu',
    'drop',
  ].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = '';
      }
    });
  });
}
setInputFilter(document.getElementById('half1'), function(value) {
  return /^\d*$/.test(value);
});
setInputFilter(document.getElementById('half2'), function(value) {
  return /^\d*$/.test(value);
});
setInputFilter(document.getElementById('phone2'), function(value) {
  return /^\d*$/.test(value);
});

var radios = document.querySelectorAll('input[type=radio][name="radio"]');

document.querySelector('#second .activeCheck').style.display = 'none';
document.querySelector('#first .inactiveCheck').style.display = 'none';

function changeHandler(event) {
  console.log(event);
  if (event.target.value == 0) {
    document.querySelector('#first .activeCheck').style.display = 'none';
    document.querySelector('#first .inactiveCheck').style.display = 'block';
    document.querySelector('#second .inactiveCheck').style.display = 'none';
    document.querySelector('#second .activeCheck').style.display = 'block';
  } else if (event.target.value == 79) {
    document.querySelector('#first .activeCheck').style.display = 'block';
    document.querySelector('#first .inactiveCheck').style.display = 'none';
    document.querySelector('#second .inactiveCheck').style.display = 'block';
    document.querySelector('#second .activeCheck').style.display = 'none';
  }
  document.getElementById('shippingHidden').value = event.target.value;
  updateTotalPrice();
}

Array.prototype.forEach.call(radios, function(radio) {
  radio.addEventListener('change', changeHandler);
});

document.getElementById('half1').addEventListener('keyup', function() {
  if (this.value.length === 6) {
    document.getElementById('half2').focus();
  }
});
updateTotalPrice();
