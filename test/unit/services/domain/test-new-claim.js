const NewClaim = require('../../../../app/services/domain/new-claim')
const ValidationError = require('../../../../app/services/errors/validation-error')
const dateFormatter = require('../../../../app/services/date-formatter')
const booleanSelectEnum = require('../../../../app/constants/boolean-select-enum')
const expect = require('chai').expect

var claim

describe('services/domain/new-claim', function () {
  const VALID_REFERENCE = 'APVS123'
  const VALID_DAY = dateFormatter.now().date()
  const VALID_MONTH = dateFormatter.now().month() + 1 // Needed for zero indexed month
  const VALID_YEAR = dateFormatter.now().year()
  const VALID_CHILD_VISITOR = booleanSelectEnum.YES
  const VALID_IS_REPEAT_DUPLICATE_CLAIM = false

  var expectedDateOfJourney = dateFormatter.build(VALID_DAY, VALID_MONTH, VALID_YEAR)

  it('should construct a domain object given valid input', function () {
    claim = new NewClaim(
      VALID_REFERENCE,
      VALID_DAY,
      VALID_MONTH,
      VALID_YEAR,
      VALID_CHILD_VISITOR,
      VALID_IS_REPEAT_DUPLICATE_CLAIM
    )
    expect(claim.reference).to.equal(VALID_REFERENCE)
    expect(claim.dateOfJourney).to.be.within(
      expectedDateOfJourney.subtract(1, 'seconds').toDate(),
      expectedDateOfJourney.add(1, 'seconds').toDate()
    )
    expect(claim.childVisitor).to.equal(VALID_CHILD_VISITOR)
    expect(claim.isRepeatDuplicateClaim).to.equal(VALID_IS_REPEAT_DUPLICATE_CLAIM)
  })

  it('should return isRequired errors given empty strings', function () {
    try {
      claim = new NewClaim('', '', '', '', '', false)
    } catch (e) {
      expect(e).to.be.instanceof(ValidationError)
      expect(e.validationErrors['Reference'][0]).to.equal('Reference is required')
      expect(e.validationErrors['DateOfJourney'][0]).to.equal('Date of prison visit was invalid')
      expect(e.validationErrors['child-visitor'][0]).to.equal('Children on visit is required')
    }
  })

  it('should not return isRequired errors for child-visitor if is repeat duplicate claim', function () {
    claim = new NewClaim(VALID_REFERENCE, VALID_DAY, VALID_MONTH, VALID_YEAR, '', true)
    expect(claim, 'should not throw a ValidationError').to.be.instanceof(NewClaim)
  })

  it('should return isValidDate error given an invalid type for date', function () {
    try {
      claim = new NewClaim(VALID_REFERENCE, 'invalid day', 'invalid month', 'invalid year', '', false)
    } catch (e) {
      expect(e).to.be.instanceof(ValidationError)
      expect(e.validationErrors['DateOfJourney'][0]).to.equal('Date of prison visit was invalid')
    }
  })

  it('should return isValidDate error given a date in the future', function () {
    try {
      var futureDate = dateFormatter.now().add(1)
      claim = new NewClaim(
        VALID_REFERENCE,
        futureDate.date(),
        futureDate.month() + 1,
        futureDate.year(),
        VALID_CHILD_VISITOR,
        false
      )
    } catch (e) {
      expect(e).to.be.instanceof(ValidationError)
      expect(e.validationErrors['DateOfJourney'][0]).to.equal('Date of prison visit was invalid')
    }
  })

  it('should return isDateWithinDays error given a date more than 28 days away', function () {
    try {
      var dateFurtherThan28Days = dateFormatter.now().subtract(29)
      claim = new NewClaim(
        VALID_REFERENCE,
        dateFurtherThan28Days.date(),
        dateFurtherThan28Days.month() + 1,
        dateFurtherThan28Days.year(),
        VALID_CHILD_VISITOR,
        false
      )
    } catch (e) {
      expect(e).to.be.instanceof(ValidationError)
      expect(e.validationErrors['DateOfJourney'][0]).to.equal('Date of prison must be within 28 days')
    }
  })
})