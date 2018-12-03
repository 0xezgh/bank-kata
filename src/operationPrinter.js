require('datejs');

const HEADER = 'DATE | AMOUNT | BALANCE';

class OperationPrinter {
  constructor(console) {
    this.console = console;
  }

  print(operations) {
    this.console.printLine(HEADER);
    let balance = 0;

    const linesToPrint = operations.map(
      (operation) => {
        balance += operation.amount;
        return {
          date: operation.date.toString('dd/MM/yyyy'), amount: operation.amount, balance,
        };
      },
    );
    /**
    Print operations from the end of our array to get last operations done first displayed
* */
    linesToPrint.reverse()
      .forEach(
        line => this.console.printLine(`${line.date} | ${line.amount} | ${line.balance}`),
      );
  }
}

export default OperationPrinter;
