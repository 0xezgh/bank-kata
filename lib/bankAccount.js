"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BankAccount = function () {
  function BankAccount(operationRepository, operationPrinter) {
    _classCallCheck(this, BankAccount);

    this.operationRepository = operationRepository;
    this.operationPrinter = operationPrinter;
  }

  _createClass(BankAccount, [{
    key: "deposit",
    value: function deposit(amount) {
      this.operationRepository.saveOperation(amount, new Date());
    }
  }, {
    key: "withdraw",
    value: function withdraw(amount) {
      this.operationRepository.saveOperation(-amount, new Date());
    }
  }, {
    key: "printOperations",
    value: function printOperations() {
      this.operationPrinter.print(this.operationRepository.allOperations());
    }
  }]);

  return BankAccount;
}();

exports.default = BankAccount;