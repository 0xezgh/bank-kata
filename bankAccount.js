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

  printStatement() {
    this.operationPrinter.print(this.operationRepository.allOperations());
  }
}


export default BankAccount;
