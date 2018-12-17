Feature: deposit
  Client can't deposit negative or null amounts
  Scenario: Negative amounts should not be accepted
    Given a client that wants to do a deposit
    When he wants to deposit an amount of -10
    Then after the deposit he should be told -10 " :DEPOSIT AMOUNT MUST BE STRICTLY POSITIVE"

  Scenario: null amount should not be accepted
    Given a client that wants to do a deposit
    When he wants to deposit an amount of 0
    Then after the deposit he should be told 0 " :DEPOSIT AMOUNT MUST BE STRICTLY POSITIVE"
