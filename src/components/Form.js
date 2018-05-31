import React, { Component } from 'react';

import FormState from '../state/FormState';
import FormContext from '../util/FormContext';

function Form({ fields, options = {} }) {
  return function formWrapper(WrappedComponent) {
    return class FormWrapperComponent extends Component {
      state = {};

      static getDerivedStateFromProps(nextProps, prevState) {
        const { onChange, permissions, model, values } = nextProps;

        if (!prevState.form) {
          const onSubmit = FormWrapperComponent.getHandleSave(nextProps);
          const onCancel = FormWrapperComponent.getHandleCancel(nextProps);
          const onRemove = FormWrapperComponent.getHandleRemove(nextProps);

          const form = new FormState({
            model,
            values,
            fields,
            options,
            permissions,
            onChange,
            onSubmit,
            onCancel,
            onRemove
          });

          return { form };
        }

        const { form } = prevState;

        if (nextProps.model && nextProps.model !== form.model) {
          form.setModel(nextProps.model);
        }

        if (nextProps.values !== form.values) {
          form.init(nextProps.values);
        }

        return { form };
      }

      static getHandleSave(props) {
        const { handleSave } = props;

        return (form, values) => {
          if (handleSave) {
            return handleSave(values);
          }

          return form.model.save(values);
        };
      }

      static getHandleCancel(props) {
        const { handleCancel } = props;

        return form => {
          if (handleCancel) {
            handleCancel();
          } else if (form.collection) {
            form.collection.clearSelection();
          }
        };
      }

      static getHandleRemove(props) {
        const { handleRemove } = props;

        return form => {
          if (handleRemove) {
            return handleRemove();
          }

          return form.model.destroy();
        };
      }

      render() {
        const { form } = this.state;

        if (!form) {
          return null;
        }

        const { onSubmit, onCancel, onRemove } = form;

        return (
          <FormContext.Provider value={form}>
            <WrappedComponent
              {...this.props}
              form={form}
              handleSave={onSubmit}
              handleCancel={onCancel}
              handleRemove={onRemove}
            />
          </FormContext.Provider>
        );
      }
    };
  };
}

export default Form;
