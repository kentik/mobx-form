/**
 * Simple version of _.set() to avoid the mostly useless dependency
 */
export default function set(object, field, value) {
  if (!object || !field) {
    return;
  }

  const parts = field.split('.');
  let currObj = object;
  let i = 0;
  for (; i < parts.length - 1; i += 1) {
    if (currObj) {
      currObj = currObj[parts[i]];
    }
  }

  if (currObj) {
    currObj[parts[i]] = value;
  }
}
