import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DisplayText, Paragraph, Form } from '@contentful/forma-36-react-components';
import { FIELDS, LAYOUT_OVERWRITES } from './constants';
import { unslugify } from './helpers';
import { renderWidget } from './renderWidget';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';

const getValidationRules = (field, validationKey) => {
  const validation = field.validations.find(v => v[validationKey]);
  return validation[validationKey] || [];
};

class App extends Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const fields = this.props.sdk.entry.fields;
    const initialLayoutId = fields?.[FIELDS.Layout]?.getValue();

    this.state = {
      layout: LAYOUT_OVERWRITES[initialLayoutId] || {}
    };

    this.state.fields = Object.entries(fields).map(([fieldId, field]) => {
      const fieldOverrides = this.state.layout[fieldId] || {};
      return {
        id: field.id,
        type: field.type,
        required: field.required,
        disabled: false, // TODO: fetch from CT API
        omitted: false, // TODO: fetch from CT API
        label: unslugify(field.id), // TODO: fetch from CT API
        value: field.getValue(),
        options: getValidationRules(field, 'in'),
        validations: field.validations,
        ...fieldOverrides
      };
    });
  }

  onFieldChangeHandler = fieldId => async ({ target }) => {
    const { name, value } = target;
    const isLayoutField = name.endsWith(FIELDS.Layout);
    const layout = (isLayoutField && LAYOUT_OVERWRITES[value]) || this.state.layout;

    this.setState(state => {
      const newState = {
        ...(isLayoutField ? { layout: value } : {}),
        fields: state.fields.map(field => {
          const fieldOverrides = (isLayoutField && layout[field.id]) || {};
          return {
            ...field,
            ...fieldOverrides,
            ...(field.id === fieldId ? [value] : [])
          };
        })
      };
      return newState;
    });

    try {
      await this.props.sdk.entry.fields[fieldId].setValue(value);
      this.props.sdk.notifier.success(`Saved "${fieldId}" field successfully`);
    } catch (error) {
      this.props.sdk.notifier.error(`Error saving field "${fieldId}"`);
    }
  };

  render() {
    return (
      <Form className="f36-margin--l">
        <DisplayText>Create a Block</DisplayText>
        <Paragraph>One content type to rule them all.</Paragraph>
        {this.state.fields.map(field =>
          renderWidget(field, {
            fieldChange: this.onFieldChangeHandler(field.id),
            entryCreate: () => {
              console.log('TBD');
            },
            entryLink: async () => {
              console.log('WIP');
              const contentTypes = getValidationRules(field, 'linkContentType');
              // const selectedEntry = await this.props.sdk.dialogs.selectSingleEntry({
              const selectedEntry = await this.props.sdk.dialogs.selectMultipleEntries({
                contentTypes
              });
              console.log({ selectedEntry });
            }
          })
        )}
      </Form>
    );
  }
}

export { App };
