/* eslint-disable no-console */
import OperationPrinter from '../src/operationPrinter';

const sinon = require('sinon');
const chai = require('chai');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
chai.use(require('sinon-chai'));

const OPERATIONS = [{ amount: 200, date: Date.parse('2018-12-02') },
  { amount: -100, date: Date.parse('2018-12-22') }];

let operationPrinter;

describe('OperationPrinter', () => {
  beforeEach(
    () => {
      operationPrinter = new OperationPrinter();
      sinon.spy(console, 'log');
    },
  );
  afterEach(() => {
    console.log.restore();
  });
  it('should print the header', () => {
    operationPrinter.print([]);

    expect(console.log).to.have.been.calledWith('DATE | AMOUNT | BALANCE');
  });

  it('should print one transaction per line', () => {
    operationPrinter.print(OPERATIONS);

    expect(console.log).to.have.been.calledWith('02/12/2018 | 200 | 200');
    expect(console.log).to.have.been.calledWith('22/12/2018 | -100 | 100');
  });
});
