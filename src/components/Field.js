import React, { Component } from 'react';
import { action, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import formConsumer from './formConsumer';
import Label from './Label';
import ValidationErrorsOrHelpText from './ValidationErrorsOrHelpText';

@observer
@formConsumer
class Field extends Component {
  state = {
    field: null
  };

  @action
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

  render() {
    const {
      form,
      autoFocus,
      className,
      children,
      fieldStyle = { width: '100% ' },
      flex,
      isEditing,
      helpText,
      hidden,
      inputStyle,
      inputGroupClassName,
      labelAlign = 'top',
      labelStyle,
      options,
      onChange,
      showLabel = true,
      showHelpText = true,
      toggleEditing,
      transferProps = true,
      width,
      placeholder
    } = this.props;
    const { field } = this.state;

    const labelInline = labelAlign !== 'top';
    const { permissions, model } = form;
    const isNew = model ? model.isNew : true;
    const fieldType = children.type.displayName;

    let { disabled, readOnly } = this.props;
    let isSummary = false;

    if (isNew) {
      disabled = disabled || !permissions.create;
      readOnly = readOnly || !permissions.create;
    } else {
      disabled = disabled || !permissions.edit;
      readOnly = readOnly || !permissions.edit;
      isSummary = ['Input', 'Textarea'].includes(fieldType);
    }

    const showError = field.hasError && (form.options.showPristineErrors || !field.pristine);
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

    const onChangeWrapper = e => {
      const previousValue = field.getValue();
      field.onChange(e);

      if (onChange) {
        onChange(field, field.value, previousValue);
      }
    };

    const showField = permissions.edit || (!permissions.edit && !isSummary) || isNew;
    const showSummary = !permissions.edit && isSummary;
    let summaryValue = field.getValue() || 'None';
    summaryValue = field.getValue() === 0 ? 0 : summaryValue;

    return (
      <div className={formGroupClass} style={{ ...this.props.style, ...style }}>
        {showLabel &&
          field.label && <Label field={field} showError={showError} labelAlign={labelAlign} style={labelStyle} />}
        <div className="pt-form-content" style={fieldStyle}>
          {showField && (
            <div className={transferProps ? inputGroupClass : undefined}>
              {transferProps &&
                React.cloneElement(children, {
                  autoFocus,
                  disabled,
                  isEditing,
                  field,
                  onChange: onChangeWrapper,
                  onEditComplete: toggleEditing,
                  options,
                  placeholder: fieldPlaceholder,
                  readOnly,
                  style: inputStyle
                })}

              {!transferProps && React.cloneElement(children)}
              {shouldShowHelpText && <ValidationErrorsOrHelpText field={field} helpText={helpText} />}
            </div>
          )}
          {showSummary && <div>{summaryValue}</div>}
        </div>
      </div>
    );
  }
}

export default Field;
