/* eslint-disable no-console */
/* eslint-disable max-len */
import BankAccount from '../src/bankAccount';
import OperationPrinter from '../src/operationPrinter';
import OperationRepository from '../src/operationRepository';

const sinon = require('sinon');
const chai = require('chai');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
chai.use(require('sinon-chai'));

const OPERATIONS = [{ amount: 50 }, { amount: 100 }];

const operationRepository = new OperationRepository();
const operationRepositoryStub = sinon.createStubInstance(OperationRepository);
const operationPrinter = sinon.createStubInstance(OperationPrinter);


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
    operationRepositoryStub.allOperations.onFirstCall().returns(OPERATIONS);
    const bankAccount = new BankAccount(operationRepositoryStub, operationPrinter);

    bankAccount.deposit(1000);

    expect(operationRepositoryStub.saveOperation).to.have.been.calledWith(1000, new Date());
  });

  it('should properly set the new account balance when deposit amount is valid', () => {
    const initOperationsForDepositTest = [{ amount: 50 }, { amount: 100 }];
    operationRepository.setOperations(initOperationsForDepositTest);
    const bankAccount = new BankAccount(operationRepository, operationPrinter);

    bankAccount.deposit(1000);
    const operationsToCheck = bankAccount.getBalanceHistory();

    expect(operationsToCheck[2].balance).to.equal(1150);
  });

  it('should properly set the new account balance when withdrawal amount is valid', () => {
    const initOperationsForWithdrawtTest = [{ amount: 50 }, { amount: 100 }];
    operationRepository.setOperations(initOperationsForWithdrawtTest);
    const bankAccount = new BankAccount(operationRepository, operationPrinter);

    bankAccount.withdraw(150);
    const operationsToCheck = bankAccount.getBalanceHistory();

    expect(operationsToCheck[2].balance).to.equal(0);
  });

  it('should not accept a deposit if the amount is not positive', () => {
    const saveOperationSpy = sinon.spy(operationRepositoryStub.saveOperation);
    operationRepositoryStub.allOperations.onFirstCall().returns(OPERATIONS);
    const bankAccount = new BankAccount(operationRepositoryStub, operationPrinter);

    bankAccount.deposit(-1000);

    expect(console.log).to.have.been.calledWith(-1000, ' :DEPOSIT AMOUNT MUST BE STRICTLY POSITIVE');
    expect(saveOperationSpy.callCount).to.equal(0);
  });

  it('should accept a withdrawal when the amount is positive and inferior or equal to the account balance', () => {
    operationRepositoryStub.allOperations.onFirstCall().returns(OPERATIONS);
    const bankAccount = new BankAccount(operationRepositoryStub, operationPrinter);

    bankAccount.withdraw(1000);

    expect(operationRepositoryStub.saveOperation).to.have.been.calledWith(-1000, new Date());
  });

  it('should not accept a withdrawal if the amount is not positive', () => {
    operationRepositoryStub.allOperations.onFirstCall().returns(OPERATIONS);
    const saveOperationSpy = sinon.spy(operationRepositoryStub.saveOperation);
    const bankAccount = new BankAccount(operationRepositoryStub, operationPrinter);

    bankAccount.withdraw(-1000);

    expect(console.log).to.have.been.calledWith(-1000, ' :WITHDRAWAL AMOUNT MUST BE STRICTLY POSITIVE');
    expect(saveOperationSpy.callCount).to.equal(0);
  });

  it('should print a statement', () => {
    operationRepositoryStub.allOperations.onFirstCall().returns(OPERATIONS);
    const bankAccount = new BankAccount(operationRepositoryStub, operationPrinter);

    bankAccount.printOperations();

    expect(operationPrinter.print).to.have.been.calledWith(OPERATIONS);
  });
});
