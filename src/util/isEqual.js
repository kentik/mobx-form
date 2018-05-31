const falseyEquivalents = [null, undefined, ''];

/**
 * Non-strict-ish, deep comparison to replace strict _.isEqual() behavior.
 *
 * This has one intentional limitation specific to FieldState usage:
 *   null, undefined and empty string values are treated as equal.
 */
export default function isEqual(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return value1.length === value2.length && value1.every((val1, idx) => isEqual(val1, value2[idx]));
  } else if (typeof value1 === 'object' && typeof value2 === 'object') {
    const val1Keys = Object.keys(value1 || {});
    const val2Keys = Object.keys(value2 || {});
    const keys = Array.from(new Set(val1Keys.concat(val2Keys)));

    return keys.every(key => isEqual(value1[key], value2[key]));
  }

  return value1 === value2 || (falseyEquivalents.includes(value1) && falseyEquivalents.includes(value2));
}
