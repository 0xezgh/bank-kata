class OperationRepository {
  constructor() {
    this.operations = [];
  }

  setOperations(operations) {
    this.operations = operations;
  }

  saveOperation(amount, date) {
    this.operations.push({ amount, date });
  }

  allOperations() {
    return this.operations;
  }
}

export default OperationRepository;
