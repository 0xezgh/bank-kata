/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
import BankAccount from '../../src/bankAccount';
import OperationPrinter from '../../src/operationPrinter';
import OperationRepository from '../../src/operationRepository';

const sinon = require('sinon');
const chai = require('chai');
chai.use(require('sinon-chai'));
// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
const operationRepository = new OperationRepository();
const operationPrinter = sinon.createStubInstance(OperationPrinter);
const defineSupportCode = require('cucumber').defineSupportCode;

sinon.useFakeTimers();
sinon.spy(console, 'log');
defineSupportCode(({ Given, Then }) => {
  Given('a client with an account', function () {
    this.amount = 0;
    this.bankAccount = new BankAccount(operationRepository, operationPrinter);
  });

  Given('his initial balance is {int}', function (balance) {
    const OPERATIONS = [{ amount: balance }];
    operationRepository.setOperations(OPERATIONS);
    this.bankAccount = new BankAccount(operationRepository, operationPrinter);
  });

  Then('he should be told {int} {string}', (inputAmount, expectedAnswer) => {
    expect(console.log).to.have.been.calledWith(inputAmount, expectedAnswer);
  });
});
