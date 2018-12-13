/* eslint-disable no-console */
class BankAccount {
  constructor(operationRepository, operationPrinter) {
    this.operationRepository = operationRepository;
    this.operationPrinter = operationPrinter;
  }

  getBalanceHistory() {
    const operations = this.getOperations();
    let balance = 0;

    const operationsWithBalance = operations.map(
      (operation) => {
        balance += operation.amount;
        return {
          date: operation.date, amount: operation.amount, balance,
        };
      },
    );
    return operationsWithBalance;
  }

  getOperations() {
    return this.operationRepository.allOperations();
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log(amount, ' :DEPOSIT AMOUNT MUST BE STRICTLY POSITIVE');
      return;
    }
    this.operationRepository.saveOperation(amount, new Date());
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log(amount, ' :WITHDRAWAL AMOUNT MUST BE STRICTLY POSITIVE');
      return;
    }
    this.operationRepository.saveOperation(-amount, new Date());
  }

  printOperations() {
    this.operationPrinter.print(this.operationRepository.allOperations());
  }
}


export default BankAccount;
