module.exports = {
  getIsRequired: function (displayName) { return `${displayName} is required` },
  getRadioQuestionIsRequired: function (displayName) { return `Select a ${displayName}` },
  getJourneyAssistanceIsRequired: function (displayName) { return `Select an option to specify if you need assistance on your journey` },
  getIsAlpha: function (displayName) { return `${displayName} must only contain letters` },
  getIsNumeric: function (displayName) { return `${displayName} must only contain numbers` },
  getIsLengthMessage: function (displayName, options) { return `${displayName} must be ${options.length} characters in length as shown in the example` },
  getInvalidDobFormatMessage: function (displayName) { return `${displayName} was invalid` },
  getFutureDobMessage: function (displayName) { return `${displayName} must be in the past` }
}