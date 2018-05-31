import { action, computed } from 'mobx';
import Validator from 'validatorjs';

import FieldState from './FieldState';
import ArrayFieldState from './ArrayFieldState';

class FlatArrayFieldState extends ArrayFieldState {
  @action
  add(value, options = {}) {
    const { validate = true } = options;
    this.fieldStates.push(new FieldState(this.form, { ...this.initialConfig, value, parent: this }));
    if (validate) {
      this.form.validate();
    }
  }

  @action
  remove(idxOrField) {
    let idx = idxOrField;

    if (typeof idxOrField !== 'number') {
      idx = this.fieldStates.findIndex(field => field === idxOrField);
    }

    super.remove(idx);
    this.form.validate();
  }

  @action
  clearValue() {
    this.fieldStates.clear();
    this.form.validate();
  }

  @action
  setChildren(children) {
    this.children = children;
    this.form.validate();
  }

  @action
  validate(values) {
    FieldState.prototype.validate.call(this, values);

    this.fieldStates.forEach((field, rowIdx) => {
      const rowValue = this.getValue(rowIdx);

      if (this.ignore(rowValue)) {
        field.errors = [];
        return;
      }

      const value = {
        [field.name]: rowValue
      };

      const rules = {
        [field.name]: this.children ? this.children.rules : this.rules
      };

      const attributeNames = {
        [this.name]: this.label || this.name
      };

      const messages = this.children ? this.children.messages : {};

      const validator = new Validator(value, rules, messages);
      validator.setAttributeNames(attributeNames);
      validator.check();

      field.errors = validator.errors.get(field.name);

      if (field.errors && field.errors.length > 0) {
        this.errors.push(`${this.label} (${rowIdx + 1}): ${field.errors}`);
      }
    });
  }

  getValue(rowIdx) {
    if (rowIdx >= 0) {
      const rowValue = this.fieldStates[rowIdx].getValue();

      return this.exclude(rowValue) ? undefined : rowValue;
    }

    return super.getValue();
  }

  @computed
  get pristine() {
    return this.fieldStates.every(field => field.pristine);
  }

  @computed
  get hasError() {
    return (this.errors && this.errors.length > 0) || this.fieldStates.some(row => row.hasError);
  }
}

export default FlatArrayFieldState;
