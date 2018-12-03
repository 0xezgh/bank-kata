import BankAccount from '../src/bankAccount';
import OperationPrinter from '../src/operationPrinter';
import OperationRepository from '../src/operationRepository';

const sinon = require('sinon');
const chai = require('chai');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
chai.use(require('sinon-chai'));

const OPERATIONS = [{ amount: 1 }, { amount: 2 }];

const operationRepository = sinon.createStubInstance(OperationRepository);
operationRepository.allOperations.onFirstCall().returns(OPERATIONS);
const operationPrinter = sinon.createStubInstance(OperationPrinter);
const bankAccount = new BankAccount(operationRepository, operationPrinter);

describe('BankAccount', () => {
  beforeEach(
    () => {
      sinon.useFakeTimers();
      sinon.spy(console, 'log');
    },
  );
  afterEach(() => {
    console.log.restore();
  });
  it('accepts a deposit', () => {
    bankAccount.deposit(1000);
    expect(operationRepository.saveOperation).to.have.been.calledWith(1000, new Date());
  });

  it('accepts a withdrawal', () => {
    bankAccount.withdraw(1000);
    expect(operationRepository.saveOperation).to.have.been.calledWith(-1000, new Date());
  });

  it('prints a statement', () => {
    bankAccount.printOperations();
    expect(operationPrinter.print).to.have.been.calledWith(OPERATIONS);
  });
});