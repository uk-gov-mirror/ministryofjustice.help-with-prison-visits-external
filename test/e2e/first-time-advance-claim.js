const internalEligibilityHelper = require('../helpers/data/internal/internal-eligibility-helper')
const dateFormatter = require('../../app/services/date-formatter')
const claimHelper = require('../helpers/data/claim-helper')

var futureDate = dateFormatter.now().add(14, 'days')
describe('First Time Advance Claim Flow', () => {
  // The reference will be generated as part of this flow. So capture it once it is generated.
  // var reference
  var caseworker = 'teste2e@test.com'

  it('should display each page in the first time eligibility flow Advance', () => {
    return browser.url('/assisted-digital?caseworker=teste2e@test.com')

      // Index
      .waitForExist('#start')
      .click('#start')

      // Start
      .waitForExist('#start-submit')
      .click('[for="no"]')
      .click('#start-submit')

      // Date of birth
      .waitForExist('#date-of-birth-submit')
      .setValue('#dob-day-input', '01')
      .setValue('#dob-month-input', '05')
      .setValue('#dob-year-input', '1955')
      .click('#date-of-birth-submit')

      // Prisoner relationship
      .waitForExist('#prisoner-relationship-submit')
      .click('[for="partner"]')
      .click('#prisoner-relationship-submit')

      // Benefit
      .waitForExist('#benefit-submit')
      .click('[for="income-support"]')
      .click('[for="yes"]')
      .click('#benefit-submit')

      // About the Prisoner
      .waitForExist('#about-the-prisoner-submit')
      .setValue('#prisoner-first-name', 'Joe')
      .setValue('#prisoner-last-name', 'Bloggs')
      .setValue('#dob-day', '01')
      .setValue('#dob-month', '05')
      .setValue('#dob-year', '1955')
      .setValue('#prisoner-number', 'Z6543TS')
      .setValue('#prison-name-text-input', 'Hewell')
      .click('#NameOfPrison') // click label to remove input focus
      .click('#about-the-prisoner-submit')

      // About you
      .waitForExist('#about-you-submit')

      .setValue('#first-name-input', 'Joe')
      .setValue('#last-name-input', 'Bloggs')
      .setValue('#national-insurance-number-input', 'TS876543T')
      .setValue('#house-number-and-street-input', '1')
      .setValue('#town-input', 'Town')
      .setValue('#county-input', 'County')
      .setValue('#post-code-input', 'AA123AA')
      .selectByVisibleText('#country-input', 'England')
      .setValue('#email-address-input', 'donotsend@apvs.com')
      .setValue('#phone-number-input', '0123456789')
      .click('#about-you-submit')

      // Future or past visit
      .waitForExist('#future-or-past-submit')
      .click('[for="advance"]')
      .click('#future-or-past-submit')

      // Journey information
      .waitForExist('#journey-information-submit')
      .setValue('#date-of-journey-day', futureDate.date())
      .setValue('#date-of-journey-month', futureDate.month() + 1)
      .setValue('#date-of-journey-year', futureDate.year())
      .click('#journey-information-submit')

      // Has Escort
      .waitForExist('#has-escort-submit')
      .click('[for="escort-no"]')
      .click('#has-escort-submit')

      // Has Child
      .waitForExist('#has-child-submit')
      .click('[for="child-no"]')
      .click('#has-child-submit')

      // Expense
      .waitForExist('#expenses-submit')
      .click('[for="train"]')
      .click('#expenses-submit')

      // Train - With departure time rather than cost field.
      .waitForExist('#train-details-submit')
      .setValue('#from-input', 'Euston')
      .setValue('#to-input', 'Birmingham New Street')
      .click('[for="return-yes"]')
      .setValue('#departure-time-input', '10am')
      .setValue('#return-time-input', '4pm')
      .click('#train-details-submit')

      // Claim summary (advance claims do not need visit confirmation/expense upload)
      .waitForExist('#claim-summary-submit')
      .click('#claim-summary-submit')

      // Choose Payment Method
      .waitForExist('#payment-submit')
      .click('[for="bank"]')
      .click('#payment-submit')

      // Enter Bank Account Details
      .waitForExist('#bank-payment-submit')
      .setValue('#name-on-account-input', 'Joe Bloggs')
      .setValue('#sort-code-input', '001122')
      .setValue('#account-number-input', '00123456')
      .click('#bank-payment-submit')

      // Declaration page
      .waitForExist('#claim-submit')
      .click('[for="terms-and-conditions-input"]')
      .click('#claim-submit')

      // Application submitted
      .waitForExist('#reference')
  })

  after(function () {
    return claimHelper.getRef(caseworker)
    .then(function (reference) {
      return internalEligibilityHelper.deleteAll(reference)
    })
  })
})
