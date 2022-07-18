// Vanilla JS playground

// Logging levels
console.error('No error so far');
console.warn('This is a warning');
console.info('For your interest'); // same level as console.log
console.debug('Verbose debug stuff');

// Take a look at window object
// console.log(window);

// Your browser
// console.log(window.navigator);

// Start coding here
function forEach(ary, action) {
  for (var i = 0; i < ary.length; i++) {
    action(ary[i]);
  }
}

function showAlert(item) {
  alert(item);
}

const myIntegers = [1, 2, 3];

// OO
function Person(id, firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;

  this.fullName = function () {
    return id + ': ' + this.firstname + ' ' + this.lastname;
  };
}

class PersonClass {
  id;
  firstname;
  lastname;

  constructor(id, firstname, lastname) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
  }

  fullName() {
    return this.id + ': ' + this.firstname + ' ' + this.lastname;
  }
}


// <Main>

// classic
// forEach(myIntegers, showAlert);

// pass a function as parameter
/*forEach(myIntegers, function (item) {
  alert(item);
});*/

// pass a function as lambda
// forEach(myIntegers, (item) => alert(item));


// var rudi = new Person(47, 'Rudolf', 'Rentier');
// var rudi = new PersonClass(47, 'Rudolf', 'Rentier');
/*console.log(rudi.firstname);
console.log(rudi.lastname);
console.log(rudi.fullName());*/


// this
forEach(myIntegers, function (item) {
  console.debug(this); // caller (= forEach can set this)
});

var that = this;
forEach(myIntegers, function (item) {
  console.debug(that);
});

forEach(myIntegers, (item) => {
  console.debug(this);
});
