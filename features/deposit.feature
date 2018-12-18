Feature: deposit
  Client can't deposit negative or null amounts and positive amounts should be added to his balance

  Scenario: Negative amounts should not be accepted
    Given a client with an account
    And he wants to deposit an amount of -10
    When he does a deposit
    Then he should be told -10 " :DEPOSIT AMOUNT MUST BE STRICTLY POSITIVE"

  Scenario: null amount should not be accepted
    Given a client with an account
    And he wants to deposit an amount of 0
    When he does a deposit
    Then he should be told 0 " :DEPOSIT AMOUNT MUST BE STRICTLY POSITIVE"

  Scenario: positive amount should added to the balance
    Given a client with an account
    And he wants to deposit an amount of 100
    And his initial balance is 100
    When he does a deposit
    Then his new balance should be 200