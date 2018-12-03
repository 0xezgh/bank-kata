'use strict';

var _bankAccount = require('./bankAccount');

var _bankAccount2 = _interopRequireDefault(_bankAccount);

var _operationPrinter = require('./operationPrinter');

var _operationPrinter2 = _interopRequireDefault(_operationPrinter);

var _operationRepository = require('./operationRepository');

var _operationRepository2 = _interopRequireDefault(_operationRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var operationPrinter = new _operationPrinter2.default();
var operationRepository = new _operationRepository2.default();
var bankAccount = new _bankAccount2.default(operationRepository, operationPrinter);

bankAccount.deposit(100);
bankAccount.withdraw(50);
bankAccount.deposit(10);
bankAccount.withdraw(60);
bankAccount.printOperations();