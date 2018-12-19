const { setWorldConstructor } = require('cucumber');

class CustomWorld {
  constructor() {
    this.amount = 0;
  }

  setAmountTo(number) {
    this.amount = number;
  }
}

setWorldConstructor(CustomWorld);
