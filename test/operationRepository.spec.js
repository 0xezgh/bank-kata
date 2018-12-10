import OperationRepository from '../src/operationRepository';

const chai = require('chai');
// eslint-disable-next-line prefer-destructuring
const assert = chai.assert;

const OPERATIONS = [{ amount: -100, date: new Date() }, { amount: 200, date: new Date() }];

const operationRepository = new OperationRepository();

describe('OperationRepository', () => {
  it('should store operations', () => {
    OPERATIONS.forEach(
      operation => operationRepository.saveOperation(operation.amount, operation.date),
    );

    assert.sameDeepMembers(OPERATIONS, operationRepository.allOperations());
  });
});
