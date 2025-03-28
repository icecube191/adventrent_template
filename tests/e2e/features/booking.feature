Feature: Vehicle Booking Flow
  As a renter
  I want to search for and book a vehicle
  So that I can rent it for my adventure

  Background:
    Given I am logged in as a renter
    And I am on the home screen

  Scenario: Successfully book a vehicle
    When I search for "ATV" vehicles
    And I select the first vehicle from the results
    And I choose rental dates from "2024-04-01" to "2024-04-03"
    And I enter valid payment information
      | cardNumber       | expiryDate | cvc |
      | 4242424242424242 | 12/25      | 123 |
    And I confirm the booking
    Then I should see a booking confirmation
    And the booking should appear in my trips

  Scenario: Search with filters
    When I tap on the filter button
    And I select vehicle type "Jet Ski"
    And I set price range between "$100" and "$300"
    And I apply the filters
    Then I should see vehicles matching my criteria
    And all prices should be between $100 and $300