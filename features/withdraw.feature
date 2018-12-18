Feature: withdraw
  Client can't withdraw negative or null amounts and positive amounts should be subtracted from his balance

  Scenario: Negative amounts should not be accepted
    Given a client with an account
    And he wants to withdraw an amount of -10
    When he does a withdrawal
    Then he should be told -10 " :WITHDRAWAL AMOUNT MUST BE STRICTLY POSITIVE"

  Scenario: null amount should not be accepted
    Given a client with an account
    And he wants to withdraw an amount of 0
    When he does a withdrawal
    Then he should be told 0 " :WITHDRAWAL AMOUNT MUST BE STRICTLY POSITIVE"

  Scenario: positive amount should be substracted from the balance
    Given a client with an account
    And he wants to withdraw an amount of 100
    And his initial balance is 100
    When he does a withdrawal
    Then his new balance should be 0