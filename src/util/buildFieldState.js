import ArrayFieldState from '../state/ArrayFieldState';
import FieldState from '../state/FieldState';
import FlatArrayFieldState from '../state/FlatArrayFieldState';

export default function buildFieldState(form, fieldName, fieldConfig) {
  let fieldState = null;

  if (!fieldName.includes('[].')) {
    const finalConfig = { ...fieldConfig, originalName: fieldConfig.name, name: fieldName };

    if (fieldConfig.isComplexArray) {
      // Array that will contain complex things
      fieldState = new ArrayFieldState(form, finalConfig);
    } else if (fieldName.endsWith('[]')) {
      // Simple Array
      finalConfig.name = fieldName.slice(0, -2);
      fieldState = new FlatArrayFieldState(form, finalConfig);
    } else {
      // Simple Field
      fieldState = new FieldState(form, finalConfig);
    }
  }

  return fieldState;
}
