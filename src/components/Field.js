import React, { Component } from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import formConsumer from './formConsumer';
import Label from './Label';
import ValidationErrorsOrHelpText from './ValidationErrorsOrHelpText';

@observer
@formConsumer
class Field extends Component {
  static defaultProps = {
    fieldStyle: { width: '100%' },
    labelAlign: 'top',
    showHelpText: true,
    showLabel: true
  };

  static getDerivedStateFromProps(nextProps) {
    const { field: fieldProp, form, name, rules, placeholder, options, label } = nextProps;

    const field = fieldProp || form.getField(name);

    runInAction(() => {
      if (rules !== undefined) {
        form.setRules(field, rules);
      }

      if (placeholder) {
        field.placeholder = placeholder;
      }

      if (options) {
        field.options = options;
      }

      if (label) {
        field.label = label;
      }
    });

    return { field };
  }

  state = {
    field: null
  };

  /**
   *
   * Field doesn't (and shouldn't) need to trigger a re-render. The underlying Input components
   * are handling the component rendering. Unless ...
   * 1. Validation rules have been changed
   * 2. Validation state changes
   * 3. className changes
   */
  shouldComponentUpdate(nextProps) {
    const hasRulesChanged = nextProps.rules !== this.props.rules;
    const hasClassNameChanged = nextProps.className !== this.props.className;
    const hasOptionsChanged = nextProps.options !== this.props.options;
    const hasLabelChanged = nextProps.label !== this.props.label;
    const isInvalid = !this.state.field.valid;

    return (
      !nextProps.transferProps ||
      hasRulesChanged ||
      isInvalid ||
      hasClassNameChanged ||
      hasOptionsChanged ||
      hasLabelChanged
    );
  }

  handleChange = e => {
    const { onChange } = this.props;
    const { field } = this.state;

    const previousValue = field.getValue();
    field.onChange(e);

    if (onChange) {
      onChange(field, field.value, previousValue);
    }
  };

  render() {
    const {
      form,
      autoFocus,
      className,
      children,
      fieldStyle,
      flex,
      isEditing,
      helpText,
      hidden,
      inputStyle,
      inputGroupClassName,
      labelAlign,
      labelStyle,
      options,
      showLabel,
      showHelpText,
      toggleEditing,
      width,
      placeholder
    } = this.props;
    const { field } = this.state;

    const labelInline = labelAlign !== 'top';

    const { disabled, readOnly } = this.props;

    const showError = field.hasError && (
      form.options.showPristineErrors
      || !field.pristine
      || field.form.submitted
    );
    const shouldShowHelpText = showHelpText !== false && field.showHelpText !== false;
    const fieldPlaceholder = field.placeholder || placeholder;

    const formGroupClass = classNames(className, 'pt-form-group', {
      'pt-disabled': disabled || field.disabled,
      'pt-inline': labelInline,
      'pt-intent-danger': showError
    });

    const inputGroupClass = classNames(
      'pt-input-group',
      {
        'pt-disabled': disabled || field.disabled,
        'pt-intent-danger': showError
      },
      inputGroupClassName
    );

    const style = { width, flex, display: hidden ? 'none' : undefined };

    return (
      <div className={formGroupClass} style={{ ...this.props.style, ...style }}>
        {showLabel &&
          field.label && <Label field={field} showError={showError} labelAlign={labelAlign} style={labelStyle} />}
        <div className="pt-form-content" style={fieldStyle}>
          <div className={inputGroupClass}>
            {React.cloneElement(children, {
              autoFocus,
              disabled,
              isEditing,
              field,
              onChange: this.handleChange,
              onEditComplete: toggleEditing,
              options,
              placeholder: fieldPlaceholder,
              readOnly,
              style: inputStyle
            })}
            {shouldShowHelpText && <ValidationErrorsOrHelpText field={field} helpText={helpText} />}
          </div>
        </div>
      </div>
    );
  }
}

export default Field;
