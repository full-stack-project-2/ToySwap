const getData = require('./data.js');//requires the constructor

let result = '';//declare a global empty variable.

let runner = new getData();//creates a new object

let callbackFnc = function(data){ //callback function to fetch data
   result = data;
//    return result;
};

module.exports = function() {
    return runner.getToyData(callbackFnc); //calls the constructors function and passes a callback function.
}