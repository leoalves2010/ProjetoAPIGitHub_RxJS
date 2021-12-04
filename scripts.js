var myInput = document.querySelector('#myInput');
var myDiv = document.querySelector('#myDiv');
var inputs = Rx.Observable.fromEvent(myInput, 'keyup');