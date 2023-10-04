Feature: Ticket booking test
    Scenario: Book an affordable ticket
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user selects day
        When user selects session time
        When user selects free space
        When user reserves the selected seat
        Then user sees a button to receive a code "Получить код бронирования"

    Scenario: Book three free tickets
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user selects day
        When user selects session time
        When user selects one free space
        When user selects second free space
        When user selects third free space
        When user presses the booking button
        When user presses a button to receive a reservation code
        Then user get QR code and text "Электронный билет"

            Scenario: Book a ticket for the purchased seat
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user selects date selected earlier
        When user selects session time selected earlier
        When user selects an occupied seat
        When user presses the booking button
        Then button for booking is inactive "true"