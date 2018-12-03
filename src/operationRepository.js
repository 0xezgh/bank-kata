class OperationRepository {
  constructor() {
    this.operations = [];
  }

  saveOperation(amount, date) {
    this.operations.push({ amount, date });
  }

  allOperations() {
    return this.operations;
  }
}

export default OperationRepository;
