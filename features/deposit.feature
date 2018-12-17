Feature: deposit
  Client can't deposit negative amount of money

  Scenario: Negative amounts should not be accepted
    Given an account
    When a client wants to deposit an amount of -10 in that account
    Then he should be told -10 " :DEPOSIT AMOUNT MUST BE STRICTLY POSITIVE"
