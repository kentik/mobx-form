# Mobx Form
Declarative, complex forms with Mobx/React with lots of dynamic/imperative hooks.

## Goals
We needed a Mobx/React form solution to fit all our needs for our flagship web application. This meant nested objects
and arrays, dynamic validation rules and fields, and lots of other bells and whistles. We wanted to be able to provide
a static form config detailing the fields and their labels, rules, options (or arbitrary stuff) and then leverage
named fields throughout our components. This meant:
 - `FormState` and `FieldState` classes to hold the form's state and provide a solid API to views
 - `Form` and `Field` components to simplify and standardize usage
 - `FormState` shared throughout component hierarchy via React Context

### Why not mobx-react-form?
We started there in early 2017 and at the time, nested array fields just didn't work right. Knowing that our team would
need a lot of features that library didn't offer and having had trouble with some of its claimed features, we decided to
go our own way. Much of this implementation was inspired from mobx-react-form, but this was written from scratch rather
than forked.

## Dependencies
This library depends on latest mobx (4.x), react (16.4+), and mobx-react (5.x) libraries and uses validatorjs and
classnames internally. We would like to remove this validation library dependency in the future.

The view components herein leverage quite a few BlueprintJS CSS classes. If you do not use Blueprint, you'll naturally
need to provide implementations for some/all of these.

## Basic Usage

### Simplest Possible Example
```javascript
const fields = {
  username: {
    label: 'Username',
    rules: 'required'
  },
  password: {
    label: 'Password',
    rules: 'required'
  }
};

@Form({ fields })
class LoginForm extends Component {
  handleSubmit = (form, values) => {
    const { username, password } = values;
    // XHR to login
  };

  render() {
    const { form } = this.props;

    return (
      <div>
        <Field name="username">
          <input type="text" />
        </Field>
        <Field name="password">
          <input type="password" />
        </Field>
        <button disabled={!form.dirty || !form.valid} onClick={() => form.submit(this.handleSubmit)}>
          Login
        </button>
      </div>
    );
  }
}
```

### Starting with data
```javascript
const values = { username: 'fred@kentik.com', password: 'QA4Lyfe' };
<LoginForm values={values} />
```

## Advanced Concepts

### Nested Fields
Have nested fields? This is really easy to handle in your form config.
```javascript
// Just use dot notation in form config
const fields = {
  'userdata.address': {
    label: 'Address'
  }
};

// Same convention w/i Field
<Field name="userdata.address" />

// Submit handler works things back into the same format as incoming values
handleSubmit = (form, values) => {
  const { userdata } = values;
};
```

### Complex Arrays
What we consider complex arrays is simply an array of objects. This is used to disambiguate it from arrays of primitives
in our form configs.
```javascript
const fields = {
  'skillz': {
     isComplexArray: true // Don't forget this!
  },
  'skillz[].type': {
     label: 'Skill',
     rules: 'required'
  },
  'skillz[].level': {
     label: 'Level',
     options: [{ value: 0, label: 'Beginner' }, { value: 1, label: 'Intermediate' }, { value: 2, label: 'Expert' }],
     rules: 'required'
  }
}

@Form({ fields })
class UserProfileForm extends Component {
  handleAdd = () => {
    const { form } = this.props;
    form.getField('skillz').add();
  };

  handleRemove = idx => {
    const { form } = this.props;
    form.getField('skillz').remove(idx);
  };

  render() {
    const { form } = this.props;
    const skillsField = form.getField('skillz');

    return (
      <div>
        {skillsField.map((skill, idx) => (
          <div key={skill.type.key}>
            <Field field={skill.type} />
            <Field field={skill.level}>
              <Select options={skill.level.options} />
            </Field>
            <button onClick={() => this.handleRemove(idx)}>Remove Skill</button>
          </div>
        )}
        <button onClick={this.handleAdd}>Add Skill</button>
      </div>
    );
  }
}
```
Please note the format you receive when you call `complexArrayField.map()`. The value here is a plain object that
consists of each nested field. That's it. Each field has a `key` property to use as a React key as needed, but there
is no such key property on the plain object given via `map()`.

### Flat Arrays
```javascript
const fields = {
  'skillz[]': {
     label: 'Skill',
     rules: 'required'
  }
}

@Form({ fields })
class UserProfileForm extends Component {
  handleAdd = () => {
    const { form } = this.props;
    form.getField('skillz').add();
  };

  render() {
    const { form } = this.props;
    const skillsField = form.getField('skillz');

    return (
      <div>
        {skillsField.map(skill => (
          <div key={skill.key}>
            <Field field={skill} />
            <button onClick={() => skill.remove()}>Remove Skill</button>
          </div>
        )}
        <button onClick={this.handleAdd}>Add Skill</button>
      </div>
    );
  }
}
```

### Imperative APIs

#### Common Form Methods and Properties
```javascript
getValue('fieldName') // Gets the current value for the given field
getField('fieldName') // Gets the FieldState object for the given field
setValue('fieldName', value) // Sets value for a field, resulting in dirty if value differs from its initial value
setValues(values) // Sets values, resulting in each changed field being dirty
init(values) // Sets values and resets form dirty, pristine state
reset() // Resets values and dirty, pristine state
dirty // Boolean denoting whether any form fields have changed
pristine // Boolean denoting whether any form fields have been touched
valid // Boolean denoting whether all of the validation rules have passed
```

#### Common Field Methods and Properties
```javascript
setValue(value) // Sets value for a field, resulting in dirty if value differs from its initial value
enable()
disable()
reset() // Resets value and dirty, pristine state
dirty // Boolean denoting whether field has changed
pristine // Boolean denoting whether field has been touched
valid // Boolean denoting whether all of the validation rules have passed (for this field)
```

### Dynamic Rules
You can call setRules directly on FormState or FieldState objects or modify rules passed as props to a Field component.
Because this normally happens via some other handled event, it is generally preferable to use the imperative API.

### Dynamic Fields
You can add and remove fields imperatively via the FormState. You can add any type of field, be it top-level or nested
within a complex array, etc. The names passed in via these methods are identical to how they are specified in initial
configs.

```javascript
addFields(config, values) // Add a bunch of a fields and (optionally) set their values
addField(name, config, value, options) // Add a named field with the given config and (optional) value
removeField(name) // Remove the given field
```

Notes:
 - Order of field configs matters. You cannot add a field nested beneath a complex array until after that field is
   added. When dealing with a complex nested array, it may be best to add them one by one.
 - Validation will fire whenever fields are added or removed. You can circumvent this by passing `{ validate: false }`
   in the `options` param when adding an individual field.
 - Nested complex arrays are meant to be uniformly structured. You cannot add a field to one array item.

### Field Groups
You can provide field groups via the options param to Form, e.g. `@Form({ field, options})`. This lets you track the
dirty, pristine, valid state of arbitrary groups of fields, for instance if you have a wizard or tabbed form.

### Transforms
You can declaratively specify transforms in a field's config to alter data as it comes in or leaves a form. The
inbound transform is called whenever you call setValue() on a Field (this is not called when the value is altered
directly via user interaction). The outbound transform is used to alter the return value of getValue(). FormState's
getValue(s)/setValue(s) methods use FieldState's getValue/setValue methods underneath, so these take part in transforms
as you should expect.

```javascript
const fields = {
  phone: {
    transform: {
      in: value => value.replace(' ', '-')
      out: value => value.replace('-', ' ')
    }
  }
};
```

_I have no idea why you'd want to do the above transforms, but I was lazy._

Note: you can technically specify a bi-directional transform, but this is almost never useful

### Ignore/Exclude Children
Sometimes you might want a form field's state determine what gets validated and/or submitted (or returned via
`getValues()`, etc.). Let's say you have an array of addresses and each address can be enabled or disabled. If the
user disables an address you might to a) no longer validate those addresses (i.e. allow the user to submit the form
with incomplete/invalid address data in disabled addresses), or b) no longer persist those addresses at all (and of
course we don't care about validating these excluded rows).

This is what a field config might look like here:

```javascript
const fields = {
  addresses: {
    isComplexArray: true,
    ignoreChildren: value => !value.enabled // Don't validate if address is not enabled
    excludeChildren: value => !value.enabled // Exclude each disabled address from resultant values
  },
  'addresses[].enabled': { label: 'Enabled' },
  'addresses[].address1': { label: 'Address 1', rules: 'required' },
  'addresses[].address2': { label: 'Address 2' },
  'addresses[].city': { label: 'City' },
  ...
}
```

Pick either `ignoreChildren` or `excludeChildren` depending on your actual needs.

Note: there's no interface to do this sort of thing with top-level fields simply because we've never needed it.

## TODOs
- Add tests
- Add examples
- Make Field default to input/text, maybe clean it up a bit
- What to do about Model/Collection?

