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

const operationRepositoryStub = sinon.createStubInstance(OperationRepository);
const operationPrinter = sinon.createStubInstance(OperationPrinter);
sinon.useFakeTimers();
sinon.spy(console, 'log');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
chai.use(require('sinon-chai'));

let bankAccount;
Given('a client that wants to do a deposit', () => {
  bankAccount = new BankAccount(operationRepositoryStub, operationPrinter);
});


When('he wants to deposit an amount of {int}', (amount) => {
  bankAccount.deposit(amount);
});

Then('after the deposit he should be told {int} {string}', (amount, expectedAnswer) => {
  expect(console.log).to.have.been.calledWith(amount, expectedAnswer);
});
console.log.restore();