[![Build Status](https://travis-ci.com/ezdin/bank-kata.svg?branch=master)](https://travis-ci.com/ezdin/bank-kata)

# BANK ACCOUNT KATA

### Link to statement of the KATA: https://gist.github.com/abachar/d20bdcd07dac589feef8ef21b487648c

### Simple application with following features:
* Deposit into Account
* Withdraw from an Account
* Print operations to the console

### Rules:
* User should **not** be allowed to make a deposit of a **negative** amount
* User should **not** be allowed to make a deposit of a **null** amount
* User should **not** be allowed to make a withdrawal of a **negative** amount
* User should **not** be allowed to make a withdrawal of a **null** amount
* User should **not** be allowed to make a withdrawal if amount is **superior** to his account balance

### EXAMPLE SCENARIO:

* Given a client makes a deposit of 1000 on 10/12/2018
* And a withdrawal of 100 on 11/12/2018
* And a deposit of 500 on 11/12/2018
* When he prints his bank operations

The output should look like the following:

DATE | AMOUNT | BALANCE
---- | ------ | -------
11/12/2018 | 500.00 | 1400.00
11/12/2018	| -100 | 900.00
10/12/2018	| 1000.00	| 1000.00
