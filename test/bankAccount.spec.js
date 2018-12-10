/* eslint-disable no-console */
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
  it('should accept a deposit when the amount is positive and superior or equal to the account balance', () => {
    bankAccount.deposit(1000);

    expect(operationRepository.saveOperation).to.have.been.calledWith(1000, new Date());
  });

  it('should not accept a deposit if the amount is not positive', () => {
    const saveOperationSpy = sinon.spy(operationRepository.saveOperation);

    bankAccount.deposit(-1000);

    expect(console.log).to.have.been.calledWith(-1000, ' :DEPOSIT AMOUNT MUST BE POSITIVE');
    expect(saveOperationSpy.callCount).to.equal(0);
  });

  it('should accept a withdrawal when the amount is positive and inferior or equal to the account balance', () => {
    bankAccount.withdraw(1000);

    expect(operationRepository.saveOperation).to.have.been.calledWith(-1000, new Date());
  });

  it('should not accept a withdrawal if the amount is not positive', () => {
    const saveOperationSpy = sinon.spy(operationRepository.saveOperation);

    bankAccount.withdraw(-1000);

    expect(console.log).to.have.been.calledWith(-1000, ' :WITHDRAWAL AMOUNT MUST BE POSITIVE');
    expect(saveOperationSpy.callCount).to.equal(0);
  });

  it('should print a statement', () => {
    bankAccount.printOperations();

    expect(operationPrinter.print).to.have.been.calledWith(OPERATIONS);
  });
});
