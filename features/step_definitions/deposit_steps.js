/* eslint-disable import/no-extraneous-dependencies */
import BankAccount from '../../src/bankAccount';
import OperationPrinter from '../../src/operationPrinter';
import OperationRepository from '../../src/operationRepository';

const sinon = require('sinon');
const chai = require('chai');
const {
  Given, When, Then,
} = require('cucumber');

const operationRepositoryStub = sinon.createStubInstance(OperationRepository);
const operationPrinter = sinon.createStubInstance(OperationPrinter);
sinon.useFakeTimers();
sinon.spy(console, 'log');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
chai.use(require('sinon-chai'));

let bankAccount;
Given('an account', () => {
  bankAccount = new BankAccount(operationRepositoryStub, operationPrinter);
});


When('a client wants to deposit an amount of {int} in that account', (amount) => {
  bankAccount.deposit(amount);
});

Then('he should be told {int} {string}', (amount, expectedAnswer) => {
  expect(console.log).to.have.been.calledWith(amount, expectedAnswer);
});
