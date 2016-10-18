var FieldValidator = require('../field-validator')

class PrisonerRelationshipValidator {
  static validate (data) {
    var errors = {}

    var relationship = data['relationship']

    FieldValidator(relationship, 'relationship', errors)
      .isRequired('radio')

    for (var field in errors) {
      if (errors.hasOwnProperty(field)) {
        if (errors[field].length > 0) { return errors }
      }
    }
    return false
  }
}
exports.default = function (data) {
  return PrisonerRelationshipValidator.validate(data)
}
module.exports = exports['default']