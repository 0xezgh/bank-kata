Feature: deposit
  Client can't deposit negative amount of money

  Scenario: Negative amounts should not be accepted
    Given deposit amount is -10
    When a client wants to deposit that amount
    Then HE should be told " :DEPOSIT AMOUNT MUST BE STRICTLY POSITIVE"
