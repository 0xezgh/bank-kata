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
const operationRepository = new OperationRepository();
const operationPrinter = sinon.createStubInstance(OperationPrinter);
sinon.useFakeTimers();
sinon.spy(console, 'log');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
chai.use(require('sinon-chai'));

let bankAccount;
let inputAmount;

Given('a client with an account', () => {
  bankAccount = new BankAccount(operationRepositoryStub, operationPrinter);
});

Given('he wants to deposit an amount of {int}', (amount) => {
  inputAmount = amount;
});

Given('his initial balance is {int}', (balance) => {
  bankAccount = new BankAccount(operationRepository, operationPrinter);
  const OPERATIONS = [{ amount: balance }];
  operationRepository.setOperations(OPERATIONS);
});

When('he does a deposit', () => {
  bankAccount.deposit(inputAmount);
});

Then('he should be told {int} {string}', (amount, expectedAnswer) => {
  expect(console.log).to.have.been.calledWith(inputAmount, expectedAnswer);
});

Then('his new balance should be 200', () => {
  const operationsToCheck = bankAccount.getBalanceHistory();
  expect(operationsToCheck[1].balance).to.equal(200);
});
console.log.restore();
