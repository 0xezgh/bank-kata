'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
require('datejs');

var HEADER = 'DATE | AMOUNT | BALANCE';

var OperationPrinter = function () {
  function OperationPrinter() {
    _classCallCheck(this, OperationPrinter);
  }

  _createClass(OperationPrinter, [{
    key: 'print',
    value: function print(operations) {
      console.log(HEADER);
      var balance = 0;

      var linesToPrint = operations.map(function (operation) {
        balance += operation.amount;
        return {
          date: operation.date.toString('dd/MM/yyyy'), amount: operation.amount, balance: balance
        };
      });
      /**
      Print operations from the end of our array to get last operations done first displayed
      * */
      linesToPrint.reverse().forEach(function (line) {
        return console.log(line.date + ' | ' + line.amount + ' | ' + line.balance);
      });
    }
  }]);

  return OperationPrinter;
}();

exports.default = OperationPrinter;