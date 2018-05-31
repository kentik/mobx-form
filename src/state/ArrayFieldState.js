import { action, computed, observable, toJS } from 'mobx';

import FieldState from './FieldState';
import buildFieldState from '../util/buildFieldState';
import get from '../util/get';
import set from '../util/set';

class ArrayFieldState extends FieldState {
  @observable fieldStates = [];
  @observable invalidChildren = []; // The indices of invalid children

  getFieldConfigs() {
    const arrayName = `${this.initialConfig.originalName}[]`;
    return this.form.fieldConfigs.filter(config => config.name.startsWith(arrayName));
  }

  @action
  init(value) {
    if (this.initialValue !== value) {
      this.initialValue = this._transformInValue(toJS(value));
      this.fieldStates.clear();

      if (Array.isArray(value)) {
        value.forEach(currValue => this.add(currValue, { validate: false, onInit: true }));
      }
    }
  }

  @action
  add(value, options = {}) {
    const { insertIdx, validate = true } = options;
    const fieldState = this.buildFieldState(value, options);

    if (insertIdx >= 0) {
      this.fieldStates.splice(insertIdx, 0, fieldState);
    } else {
      this.fieldStates.push(fieldState);
    }

    if (validate) {
      this.form.validate();
    }

    return fieldState;
  }

  @action
  buildFieldState(value, options = {}) {
    const { onInit = false } = options;
    const fieldState = {};

    this.getFieldConfigs().forEach(config => {
      const fieldName = config.name.substring(this.initialConfig.originalName.length + 3);
      const fieldValue = get(value, fieldName.endsWith('[]') ? fieldName.slice(0, -2) : fieldName);
      const fieldConfig = { ...config };

      if (onInit && fieldValue !== undefined) {
        fieldConfig.value = fieldValue;
      }

      fieldConfig.parent = this;
      fieldConfig.adjacentFields = fieldState;

      const field = buildFieldState(this.form, fieldName, fieldConfig);

      if (field) {
        fieldState[field.name] = field;

        if (!onInit && fieldValue !== undefined) {
          field.setValue(fieldValue);
        }
      }
    });

    return fieldState;
  }

  @action
  remove(idxOrObject) {
    if (typeof idxOrObject === 'number') {
      this.fieldStates.splice(idxOrObject, 1);
    } else {
      this.fieldStates.splice(this.fieldStates.findIndex(fieldState => fieldState === idxOrObject.adjacentFields), 1);
    }
    this.form.validate();
  }

  @action
  setValue(value) {
    this.fieldStates.clear();

    if (Array.isArray(value)) {
      value.forEach(val => this.add(val, { validate: false }));
    }

    this.validateWithDebounce();
  }

  @computed
  get pristine() {
    return this.fieldStates.every(row => Object.keys(row).every(fieldName => row[fieldName].pristine));
  }

  /**
   * Usage:
   * const field = form.getField('users');
   *
   * field.setValue([{ firstName: 'Aaron' }],[{ firstName: 'Dave'}]);
   *
   * field.fieldStates[1].firstName.setValue('Dave');
   *
   * const markup = field.map(({ firstName, lastName }, idx) => (
   *   <fieldset>
   *     <Field field={firstName}>
   *       <Input />
   *     </Field>
   *     <Field field={lastName}>
   *       <Input />
   *     </Field>
   *     <Button onClick={() => lastName.setValue('Something')} />
   *     <RemoveButton onClick={() => field.remove(idx)} />
   *   </fieldset>
   *   <AddButton onClick={() => field.add()} />
   * ));
   */
  map(iterator) {
    return this.fieldStates.map(iterator);
  }

  forEach(iterator) {
    this.fieldStates.forEach(iterator);
  }

  filter(iterator) {
    return this.fieldStates.filter(iterator);
  }

  some(iterator) {
    return this.fieldStates.some(iterator);
  }

  at(idx) {
    return this.fieldStates[idx];
  }

  size() {
    return this.fieldStates.length;
  }

  getDirtyAt(idx) {
    const row = this.at(idx);
    return Object.keys(row).some(fieldName => row[fieldName].dirty);
  }

  @action
  validate(values) {
    super.validate(values);

    const invalidChildren = [];
    let rowCounter = 0;

    this.fieldStates.forEach((row, rowIdx) => {
      if (this.shouldExclude(row)) {
        return;
      }

      const rowValue = get(values, this.name)[rowCounter];
      rowCounter += 1;

      if (this.ignore(rowValue)) {
        return;
      }

      Object.keys(row).forEach(fieldName => {
        const field = row[fieldName];

        field.validate(Object.assign({}, values, rowValue));

        if (field.errors && field.errors.length > 0) {
          this.errors.push(`${field.label} (${rowIdx + 1}): ${field.errors}`);
          if (!invalidChildren.includes(rowIdx)) {
            invalidChildren.push(rowIdx);
          }
        }
      });
    });

    this.invalidChildren = invalidChildren;
  }

  shouldExclude(row) {
    const rowValue = {};

    Object.keys(row).forEach(fieldName => {
      set(rowValue, fieldName, toJS(row[fieldName].getValue()));
    });

    return this.exclude(rowValue);
  }

  getValue(rowIdx) {
    if (rowIdx >= 0) {
      const row = this.fieldStates[rowIdx];
      const rowValue = {};

      Object.keys(row).forEach(fieldName => {
        set(rowValue, fieldName, toJS(row[fieldName].getValue()));
      });

      return this.exclude(rowValue) ? undefined : rowValue;
    }

    const values = [];

    this.fieldStates.forEach((row, idx) => {
      const value = this.getValue(idx);

      if (value) {
        values.push(value);
      }
    });

    return this._transformOutValue(values);
  }

  getInitialValue() {
    // Note: this is only really meant for the purposes of dirty checks
    // mileage may vary for other purposes
    if (this.initialValue === undefined) {
      return [];
    }

    return super.getInitialValue();
  }

  exclude(rowValue) {
    return this.excludeChildren && this.excludeChildren(rowValue);
  }

  ignore(rowValue) {
    if (!rowValue) {
      return true;
    }

    return this.ignoreChildren && this.ignoreChildren(rowValue);
  }
}

export default ArrayFieldState;
