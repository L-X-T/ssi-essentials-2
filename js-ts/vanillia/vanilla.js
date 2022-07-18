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


// <Main>

// classic
forEach(myIntegers, showAlert);

// pass a function as parameter
/*forEach(myIntegers, function (item) {
  alert(item);
});*/

// pass a function as lambda
// forEach(myIntegers, (item) => alert(item));
