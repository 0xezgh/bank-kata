/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import BankAccount from '../../src/bankAccount';
import OperationPrinter from '../../src/operationPrinter';
import OperationRepository from '../../src/operationRepository';

const sinon = require('sinon');
const chai = require('chai');
const {
  Given, When, Then,
} = require('cucumber');

const operationRepository = new OperationRepository();
const operationPrinter = sinon.createStubInstance(OperationPrinter);


sinon.useFakeTimers();
sinon.spy(console, 'log');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
chai.use(require('sinon-chai'));

let bankAccount;
Given('a client that wants to do a withdrawal and has a balance of {int}', (balanceAmount) => {
  bankAccount = new BankAccount(operationRepository, operationPrinter);
  const OPERATIONS = [{ amount: balanceAmount }];
  operationRepository.setOperations(OPERATIONS);
});


When('he wants to withdraw an amount of {int} to his account', (amount) => {
  bankAccount.withdraw(amount);
});

Then('after the withdrawal his new balance should be 0', () => {
  const operationsToCheck = bankAccount.getBalanceHistory();
  expect(operationsToCheck[1].balance).to.equal(0);
});
