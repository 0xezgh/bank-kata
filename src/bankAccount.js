class BankAccount {
  constructor(operationRepository, operationPrinter) {
    this.operationRepository = operationRepository;
    this.operationPrinter = operationPrinter;
  }

  deposit(amount) {
    this.operationRepository.saveOperation(amount, new Date());
  }

  withdraw(amount) {
    this.operationRepository.saveOperation(-amount, new Date());
  }

  printOperations() {
    this.operationPrinter.print(this.operationRepository.allOperations());
  }
}


export default BankAccount;
