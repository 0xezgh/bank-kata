/* eslint-disable no-console */
import OperationPrinter from '../src/operationPrinter';

const sinon = require('sinon');
const chai = require('chai');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
chai.use(require('sinon-chai'));

const OPERATIONS = [{ amount: 200, date: Date.parse('2018-12-02') },
  { amount: -26, date: Date.parse('2018-12-22') }];

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
  it('prints the header', () => {
    operationPrinter.print([]);
    expect(console.log).to.have.been.calledWith('DATE | AMOUNT | BALANCE');
  });

  it('prints one transaction per line', () => {
    operationPrinter.print(OPERATIONS);
    expect(console.log).to.have.been.calledWith('08/07/2005 | 200 | 200');
    expect(console.log).to.have.been.calledWith('21/07/2015 | -26 | 174');
  });
});
