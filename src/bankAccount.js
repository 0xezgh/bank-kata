/* eslint-disable no-console */
class BankAccount {
  constructor(operationRepository, operationPrinter) {
    this.operationRepository = operationRepository;
    this.operationPrinter = operationPrinter;
  }

  deposit(amount) {
    if (amount >= 0) this.operationRepository.saveOperation(amount, new Date());
    else console.log(amount, ' :DEPOSIT AMOUNT MUST BE POSITIVE');
  }

  withdraw(amount) {
    if (amount >= 0) this.operationRepository.saveOperation(-amount, new Date());
    else console.log(amount, ' :WITHDRAWAL AMOUNT MUST BE POSITIVE');
  }

  printOperations() {
    this.operationPrinter.print(this.operationRepository.allOperations());
  }
}


export default BankAccount;
