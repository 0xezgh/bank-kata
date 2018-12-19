/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable global-require */
/* eslint-disable prefer-destructuring */
const { Given, When, Then } = require('cucumber');

const defineSupportCode = require('cucumber').defineSupportCode;
const chai = require('chai');
chai.use(require('sinon-chai'));
// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
defineSupportCode(() => {
  Given('he wants to withdraw an amount of {int}', function (int) {
    this.inputAmount = int;
  });

  When('he does a withdrawal', function () {
    this.bankAccount.withdraw(this.inputAmount);
    this.operationsToCheck = this.bankAccount.getBalanceHistory();
  });

  Then('his new balance should be 0', function () {
    expect(this.operationsToCheck[1].balance).to.equal(0);
  });
});
