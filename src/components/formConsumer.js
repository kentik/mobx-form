import React from 'react';

import FormContext from '../util/FormContext';

export default function(Component) {
  return props => <FormContext.Consumer>{form => <Component {...props} form={form} />}</FormContext.Consumer>;
}
