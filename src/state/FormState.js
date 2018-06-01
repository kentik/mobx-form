import { action, computed, observable, toJS } from 'mobx';

import buildFieldState from '../util/buildFieldState';
import get from '../util/get';
import set from '../util/set';

class FormState {
  @observable fieldStates;
  @observable error;
  @observable errors = [];

  onSubmit = () => console.warn('No onSubmit() provided');
  onChange = () => {};
  onCancel = () => {};
  onRemove = () => {};

  model;
  collection;
  fieldConfigs = [];
  fieldGroups = {};
  initialOptions = {};
  options = {};
  initialValues = {};

  constructor(config) {
    const { collection, options, fields, permissions, model, values, onSubmit, onChange, onCancel, onRemove } = config;

    this.collection = collection;
    this.options = options || {};
    this.initialOptions = { ...this.options };
    this.fieldConfigs = Object.keys(fields).map(name => ({ ...fields[name], name }));
    this.fieldGroups = this.options.groups || {};
    this.fieldStates = [];
    this.permissions = Object.assign({ create: true, delete: true, edit: true }, permissions);

    this.fieldConfigs.forEach(fieldConfig => {
      const fieldState = buildFieldState(this, fieldConfig.name, fieldConfig);
      if (fieldState) {
        this.fieldStates.push(fieldState);
      }
    });

    if (model) {
      this.setModel(model);
    }

    if (values) {
      this.init(values);
    }

    this.onSubmit = onSubmit || this.onSubmit;
    this.onChange = onChange || this.onChange;
    this.onCancel = onCancel || this.onCancel;
    this.onRemove = onRemove || this.onRemove;
  }

  @action
  setRules = (fieldState, rules) => {
    this.fieldConfigs.forEach(fieldConfig => {
      if (fieldState.initialConfig && fieldConfig.name === fieldState.initialConfig.originalName) {
        fieldConfig.rules = rules;
        fieldState.rules = rules;
      }
    });

    this.validate();
  };

  @action
  setModel(model) {
    if (this.initialOptions.showPristineErrors === undefined) {
      this.options.showPristineErrors = !model.isNew;
    }

    this.model = model;
    this.init(model.attributes ? model.attributes.toJS() : toJS(model));
  }

  @action
  init(values) {
    this.fieldStates.forEach(field => field.init(get(values, field.name)));
    this.initialValues = values;

    if (this.options.validationOnInit !== false) {
      this.validate();
    }
  }

  @action
  reset() {
    this.fieldStates.forEach(field => field.reset());

    this.validate();
  }

  @action
  addFields(config, values) {
    Object.keys(config).forEach(fieldName =>
      this.addField(fieldName, config[fieldName], undefined, { validate: false })
    );

    if (values) {
      this.setValues(values);
    }
  }

  @action
  addField(name, config, value, options = {}) {
    if (!this.fieldStates.find(f => f.name === name)) {
      const { validate = true } = options;
      const fieldConfig = { ...config, name };
      this.fieldConfigs.push(fieldConfig);
      const fieldState = buildFieldState(this, name, { ...fieldConfig, value });
      if (fieldState) {
        this.fieldStates.push(fieldState);
      }

      if (validate) {
        this.validate();
      }
    } else if (value) {
      this.setValue(name, value, options);
    }
  }

  @action
  removeField(name) {
    const configIdx = this.fieldConfigs.findIndex(config => config.name === name);
    if (configIdx >= 0) {
      this.fieldConfigs.splice(configIdx, 1);
    } else {
      console.warn(`Field config not found for field ${name}`);
    }

    const stateIdx = this.fieldStates.findIndex(field => field.name === name);
    if (stateIdx >= 0) {
      this.fieldStates.splice(stateIdx, 1);
    } else {
      console.warn(`Field config not found for field ${name}`);
    }
    this.validate();
  }

  @action
  invalidate(message) {
    this.error = message;
  }

  addFieldsToGroup(fields, group) {
    Object.keys(fields).forEach(field => {
      if (!this.fieldGroups[group].includes(field)) {
        this.fieldGroups[group].push(field);
      }
    });
  }

  addToGroup(groups, group, field) {
    if (Object.keys(groups).includes(group)) {
      groups[group].push(field.name);
    } else {
      groups[group] = [field.name];
    }

    return groups;
  }

  isGroupDirty(group) {
    return !!this.dirtyGroups[group];
  }

  getMatchingFields(fieldName) {
    const fieldNameRegex = new RegExp(fieldName);
    return this.fieldStates.filter(fieldState => fieldNameRegex.test(fieldState.name));
  }

  // Only returns groups that are not pristine and that are in error.
  @computed
  get invalidGroups() {
    let invalid = {};

    Object.keys(this.fieldGroups).forEach(group => {
      this.fieldGroups[group].forEach(fieldName => {
        this.getMatchingFields(fieldName).forEach(field => {
          if (!field.valid && !field.pristine) {
            if (field.isComplexArray) {
              field.errors.forEach(error => {
                const errorList = error.split(','); // This is done to handle nested complex array errors
                errorList.forEach(() => {
                  invalid = this.addToGroup(invalid, group, field);
                });
              });
            } else {
              invalid = this.addToGroup(invalid, group, field);
            }
          }
        });
      });
    });

    return invalid;
  }

  @computed
  get dirtyGroups() {
    let dirty = {};

    Object.keys(this.fieldGroups).forEach(group => {
      this.fieldGroups[group].forEach(fieldName => {
        this.getMatchingFields(fieldName).forEach(field => {
          if (field && field.dirty) {
            dirty = this.addToGroup(dirty, group, field);
          }
        });
      });
    });

    return dirty;
  }

  // Groups that have invalid values that aren't dirty because they are not yet filled out.
  @computed
  get incompleteGroups() {
    let incomplete = {};

    Object.keys(this.fieldGroups).forEach(group => {
      this.fieldGroups[group].forEach(fieldName => {
        this.getMatchingFields(fieldName).forEach(field => {
          if (!field.valid && field.pristine) {
            incomplete = this.addToGroup(incomplete, group, field);
          }
        });
      });
    });

    return incomplete;
  }

  // Groups that are valid and complete.
  @computed
  get completeGroups() {
    return Object.keys(this.fieldGroups).filter(group =>
      this.fieldGroups[group].every(fieldName => this.getMatchingFields(fieldName).every(field => field.valid))
    );
  }

  @computed
  get dirty() {
    return this.fieldStates.some(field => field.dirty);
  }

  @computed
  get pristine() {
    return this.fieldStates.every(field => field.pristine);
  }

  @computed
  get valid() {
    return this.fieldStates.every(field => field.valid);
  }

  @action
  submit(onSubmit) {
    this.error = null;

    const submitFn = onSubmit || this.onSubmit;
    submitFn(this, this.getValues());
  }

  getField(fieldName) {
    const field = this.fieldStates.find(f => f.name === fieldName);

    if (!field) {
      console.warn(`Field "${fieldName}" not found.`);
    }

    return field;
  }

  getFields() {
    return this.fieldStates;
  }

  getOptionValue(fieldName, modelValue) {
    const field = this.getField(fieldName);
    if (!field) {
      return false;
    }

    if (!field.options) {
      console.warn(`Field "${fieldName}" has no options[], getOptionValue will return undefined"`);
      return undefined;
    }

    // Use the form's value if no specific value is requested
    const value = modelValue !== undefined ? modelValue : field.getValue();

    return field.options.find(option => option.value === value).label;
  }

  getValue(fieldName) {
    const field = this.getField(fieldName);
    if (!field) {
      return false;
    }

    return this.getField(fieldName).getValue();
  }

  getValues() {
    const values = {};
    this.fieldStates.forEach(field => set(values, field.name, field.getValue()));
    return values;
  }

  getDirtyValues() {
    const values = {};
    this.fieldStates.forEach(field => (field.dirty ? set(values, field.name, field.getValue()) : null));
    return values;
  }

  getDirtyFields() {
    return this.fieldStates.filter(field => field.dirty);
  }

  getFieldGroupValues(group) {
    const values = {};
    this.fieldStates.forEach(field => {
      if (this.fieldGroups[group].includes(field.name)) {
        set(values, field.name, field.getValue());
      }
    });

    return values;
  }

  setValue(fieldName, value, options) {
    this.getField(fieldName).setValue(value, options);
  }

  @action
  resetFormState = () => {
    this.fieldStates = [];
    this.fieldConfigs = [];
    this.fieldGroups = {};
    this.initialOptions = {};
    this.options = {};
    this.initialValues = {};
  };

  @action
  setValues(values) {
    Object.keys(values).forEach(fieldName => this.setValue(fieldName, values[fieldName], { validate: false }));
    this.validate();
  }

  @action
  validate = () => {
    this.errors = [];

    const values = this.getValues();

    this.fieldStates.forEach(field => {
      field.validate(values);

      if (field.errors.length) {
        this.errors = this.errors.concat(field.errors);
      }
    });

    return this.valid;
  };
}

export default FormState;
