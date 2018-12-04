import BankAccount from './bankAccount';
import OperationPrinter from './operationPrinter';
import OperationRepository from './operationRepository';

const operationPrinter = new OperationPrinter();
const operationRepository = new OperationRepository();
const bankAccount = new BankAccount(operationRepository, operationPrinter);

bankAccount.deposit(100);
bankAccount.withdraw(50);
bankAccount.deposit(-10);
bankAccount.withdraw(60);
bankAccount.withdraw(-10);
bankAccount.printOperations();
