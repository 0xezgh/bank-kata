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

const operationRepository = sinon.createStubInstance(OperationRepository);
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
    operationRepository.allOperations.onFirstCall().returns(OPERATIONS);
    bankAccount.deposit(1000);

    expect(operationRepository.saveOperation).to.have.been.calledWith(1000, new Date());
  });

  it('should properly set the new account balance when deposit amount is valid', () => {
    const depositBalanceTestRepository = new OperationRepository();
    const initOperationsForDepositTest = [{ amount: 50 }, { amount: 100 }];
    depositBalanceTestRepository.setOperations(initOperationsForDepositTest);
    const depositBalanceTestBankAccount = new BankAccount(depositBalanceTestRepository, operationPrinter);
    const depositBalanceTestOperations = depositBalanceTestBankAccount.getOperations();
    let balance = 0;
    depositBalanceTestBankAccount.deposit(1000);
    const operationsToCheck = depositBalanceTestOperations.map(
      (operation) => {
        balance += operation.amount;
        return {
          date: operation.date, amount: operation.amount, balance,
        };
      },
    );
    console.log('deposit test: ', operationsToCheck);
    expect(operationsToCheck[2].balance).to.equal(1150);
  });

  it('should properly set the new account balance when withdrawal amount is valid', () => {
    const withdrawBalanceTestRepository = new OperationRepository();
    const initOperationsForWithdrawtTest = [{ amount: 50 }, { amount: 100 }];
    withdrawBalanceTestRepository.setOperations(initOperationsForWithdrawtTest);
    const withdrawBalanceTestBankAccount = new BankAccount(withdrawBalanceTestRepository, operationPrinter);
    const withdrawBalanceTestOperations = withdrawBalanceTestBankAccount.getOperations();
    let balance = 0;
    withdrawBalanceTestBankAccount.withdraw(150);
    const operationsToCheck = withdrawBalanceTestOperations.map(
      (operation) => {
        balance += operation.amount;
        return {
          date: operation.date, amount: operation.amount, balance,
        };
      },
    );
    console.log('withdraw test: ', operationsToCheck);
    expect(operationsToCheck[2].balance).to.equal(0);
  });

  it('should not accept a deposit if the amount is not positive', () => {
    const saveOperationSpy = sinon.spy(operationRepository.saveOperation);
    operationRepository.allOperations.onFirstCall().returns(OPERATIONS);

    bankAccount.deposit(-1000);

    expect(console.log).to.have.been.calledWith(-1000, ' :DEPOSIT AMOUNT MUST BE POSITIVE');
    expect(saveOperationSpy.callCount).to.equal(0);
  });

  it('should accept a withdrawal when the amount is positive and inferior or equal to the account balance', () => {
    operationRepository.allOperations.onFirstCall().returns(OPERATIONS);

    bankAccount.withdraw(1000);

    expect(operationRepository.saveOperation).to.have.been.calledWith(-1000, new Date());
  });

  it('should not accept a withdrawal if the amount is not positive', () => {
    operationRepository.allOperations.onFirstCall().returns(OPERATIONS);
    const saveOperationSpy = sinon.spy(operationRepository.saveOperation);

    bankAccount.withdraw(-1000);

    expect(console.log).to.have.been.calledWith(-1000, ' :WITHDRAWAL AMOUNT MUST BE POSITIVE');
    expect(saveOperationSpy.callCount).to.equal(0);
  });

  it('should print a statement', () => {
    operationRepository.allOperations.onFirstCall().returns(OPERATIONS);

    bankAccount.printOperations();

    expect(operationPrinter.print).to.have.been.calledWith(OPERATIONS);
  });
});
