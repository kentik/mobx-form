function isRule(rule, ruleName) {
  return typeof rule === 'string' ? rule === ruleName : Object.keys(rule).includes(ruleName);
}

function checkRequiredIfField(field, requiredIfField, requiredIfValue) {
  const { adjacentFields, form } = field;
  const actualValue =
    adjacentFields && adjacentFields[requiredIfField]
      ? adjacentFields[requiredIfField].getValue()
      : form.getValue(requiredIfField);

  return requiredIfValue === actualValue;
}

function evaluateRequiredIf(field, requiredIfRule, ruleKey = 'required_if') {
  if (typeof requiredIfRule === 'string') {
    const [requiredIfField, requiredIfValue] = requiredIfRule.split(/[:,]/);

    return checkRequiredIfField(field, requiredIfField, requiredIfValue);
  }

  let required = true;
  const matches = requiredIfRule[ruleKey];
  for (let i = 0; i < matches.length && required; i += 2) {
    const requiredIfField = matches[i];
    const requiredIfValue = matches[i + 1];
    required = checkRequiredIfField(field, requiredIfField, requiredIfValue);
  }

  return required;
}

export default function isRequired(field) {
  // Prepare the rules
  let { rules } = field;

  if (!rules) {
    return false;
  }

  if (rules.split) {
    rules = rules.split('|');
  }

  // Check for simple required
  const hasRequiredRule = rules.some(rule => isRule(rule, 'required'));
  if (hasRequiredRule) {
    return true;
  }

  // Check required_if rule(s) against current values
  const isRequiredIf = rules.some(rule => isRule(rule, 'required_if') && evaluateRequiredIf(field, rule));
  if (isRequiredIf) {
    return true;
  }

  const isRequiredIfMultiple = rules.some(
    rule => isRule(rule, 'requiredIfMultiple') && evaluateRequiredIf(field, rule, 'requiredIfMultiple')
  );
  if (isRequiredIfMultiple) {
    return true;
  }

  // TODO: add support for required_unless, required_with, etc.

  return false;
}
