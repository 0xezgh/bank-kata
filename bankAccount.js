class BankAccount {
  deposit(amount) {
    this.transactionRepository.saveTransaction(amount, new Date());
  }

  withdraw(amount) {
    this.transactionRepository.saveTransaction(-amount, new Date());
  }

  printStatement() {
    this.statementPrinter.print(this.transactionRepository.allTransactions());
  }
}


export default BankAccount;
