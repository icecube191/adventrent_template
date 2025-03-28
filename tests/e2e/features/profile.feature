Feature: Profile Management
  As a user
  I want to manage my profile information
  So that I can keep my details up to date

  Background:
    Given I am logged in
    And I am on the profile screen

  Scenario: Update phone number
    When I tap on "Personal Information"
    And I enter a new phone number "+1234567890"
    And I save the changes
    Then I should see a success message
    And my phone number should be updated to "+1234567890"

  Scenario: Switch user role
    When I select the "rentee" role
    Then I should see the rentee features
    And my role should be updated to "rentee"