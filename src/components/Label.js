import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import isRequired from '../util/isRequired';

const Label = props => {
  const { field, labelAlign = 'top', showError } = props;
  const labelClass = classNames('pt-label', {
    'pt-intent-danger': showError
  });

  // if labelAlign is not top, need to adjust the alignment for the label so that it
  // aligns vertically with the form fields.
  const alignTopStyle = labelAlign !== 'top' ? { alignSelf: 'flex-start' } : {};
  const required = isRequired(field);

  const style = {
    textAlign: labelAlign,
    ...alignTopStyle,
    ...props.style
  };

  return (
    <label htmlFor={field.id} className={labelClass} style={style}>
      {field.label}
      {required && <span className="required-indicator">*</span>}{' '}
      {field.beta && <span className="pt-tag beta-tag">beta</span>}
    </label>
  );
};

export default observer(Label);
