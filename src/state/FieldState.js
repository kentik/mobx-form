import Validator from 'validatorjs';
import { action, computed, set, observable, toJS } from 'mobx';

import isEqual from '../util/isEqual';
import getInitialValue from '../util/getInitialValue';

let ID_COUNTER = 0;

class FieldState {
  @observable defaultValue = '';
  @observable disabled = false;
  @observable errors = [];
  @observable label;
  @observable name;
  @observable placeholder;
  @observable pristine = true;
  @observable readOnly = false;
  @observable initialValue = undefined;
  @observable value;
  @observable validateDebounceDurationMs = 250;

  key;
  form = undefined;
  initialConfig = undefined;
  parent = undefined; // If it's part of an array field
  rules = [];
  transform = undefined;
  debouncedFormValidate = undefined;

  constructor(form, config) {
    this.key = ++ID_COUNTER;
    this.form = form;
    this.initialConfig = config;

    // we do this so that observable doesn't make copies. we want the actual reference to stick.
    this.adjacentFields = this.initialConfig.adjacentFields;
    delete this.initialConfig.adjacentFields;

    // this extends this with initialConfig, where all keys become observables #FYI
    set(this, this.initialConfig);

    this.init(config.value);
  }

  validateWithDebounce(options = {}) {
    if (this.debouncedFormValidate) {
      clearTimeout(this.debouncedFormValidate);
    }

    this.debouncedFormValidate = setTimeout(
      action(() => {
        if (options.removePristineState === true) {
          this.pristine = false;
        }
        this.form.validate();
      }),
      this.validateDebounceDurationMs
    );
  }

  @action
  init(value) {
    set(this, this.initialConfig);

    const initialValue = getInitialValue({ value, defaultValue: this.defaultValue });

    this.setValue(initialValue, { validate: false });
    this.initialValue = initialValue;
    this.pristine = true;
  }

  @action
  reset() {
    const initialValue = toJS(this.initialValue);
    this.init(initialValue);
  }

  @action
  enable = () => {
    this.disabled = false;
  };

  @action
  disable = () => {
    this.disabled = true;
  };

  @action
  setPristine = value => {
    this.pristine = value;
  };

  @action
  setLabel = label => {
    this.label = label;
  };

  @action
  setRules = (rules, options = {}) => {
    const { validate = true } = options;

    this.rules = rules;

    if (validate) {
      this.form.validate();
    }
  };

  @action
  setFieldStates = fieldStates => {
    this.fieldStates = fieldStates;
    this.form.validate();
  };

  @action
  setValue(value, options = {}) {
    const { validate = true } = options;

    this.value = this._transformInValue(toJS(value));

    if (validate) {
      this.validateWithDebounce();
    }
  }

  @action
  onChange(e) {
    let value;

    if (e && e.target) {
      ({ value } = e.target);
    } else {
      value = e;
    }

    this.value = value;
    this.form.invalidate('');
    this.validateWithDebounce({ removePristineState: true });
  }

  @computed
  get dirty() {
    return !isEqual(this.getValue(), this.getInitialValue());
  }

  @computed
  get hasError() {
    return this.errors && this.errors.length > 0;
  }

  @computed
  get valid() {
    return !this.hasError;
  }

  @action
  validate(values) {
    if (!this.rules) {
      this.errors = [];
      return;
    }

    const rules = {
      [this.name]: toJS(this.rules)
    };

    const attributeNames = {
      [this.name]: this.label || this.name
    };

    const { model } = this.form;

    const validator = new Validator({ model, ...values }, rules, this.messages);
    validator.setAttributeNames(attributeNames);
    validator.check();

    this.errors = validator.errors.get(this.name);
  }

  @action
  setServerErrors(errors) {
    this.errors = errors;
  }

  getProps() {
    return {
      name: this.name,
      value: this.value,
      placeholder: this.placeholder,
      disabled: this.disabled
    };
  }

  getInitialValue() {
    return toJS(this.initialValue);
  }

  getValue() {
    return this._transformOutValue(toJS(this.value));
  }

  _transformInValue(value) {
    return this.transform && this.transform.in ? this.transform.in(value, this.form, this) : value;
  }

  _transformOutValue(value) {
    return this.transform && this.transform.out ? this.transform.out(value, this.form, this) : value;
  }

  @action
  remove() {
    if (!this.parent) {
      console.warn('Calling remove() on a field with no parent', this.name);
      return;
    }

    this.parent.remove(this);
  }
}

export default FieldState;
