import React from 'react';
import { observer } from 'mobx-react';

const ValidationErrorsOrHelpText = props => {
  const { field, helpText, calloutStyle } = props;

  const showError = field.hasError && (
    field.form.options.showPristineErrors
    || !field.pristine
    || field.form.submitted
  );

  if (showError || helpText || field.helpText) {
    const helperTextArray = showError ? field.errors : [helpText || field.helpText];

    if (calloutStyle) {
      const calloutClassName = `pt-callout ${showError ? 'pt-intent-danger' : 'pt-intent-primary'}`;

      return (
        <div className={calloutClassName}>
          {helperTextArray.map(helpTextEntry => (
            <div className={showError && 'pt-intent-danger-text'} key={helpTextEntry}>
              {helpTextEntry}
            </div>
          ))}
        </div>
      );
    }

    const helperTextClass = `pt-form-helper-text ${showError ? 'pt-intent-danger' : 'pt-text-muted'}`;

    return (
      <div className="error-or-help">
        {helperTextArray.map(helpTextEntry => (
          <div key={helpTextEntry} className={helperTextClass}>
            {helpTextEntry}
          </div>
        ))}
      </div>
    );
  }

  return <div className="error-or-help" />;
};

export default observer(ValidationErrorsOrHelpText);
