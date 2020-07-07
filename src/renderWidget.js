import React from 'react';
import {
  Button,
  EntityList,
  EntityListItem,
  Option,
  SectionHeading,
  SelectField,
  Textarea,
  TextInput
} from '@contentful/forma-36-react-components';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { FIELD_TYPES } from './constants';

function renderWidget(field, handlers) {
  if (field.omitted) {
    return null;
  }

  const ids = {
    field: `field-${field.id}`,
    wrapper: `field-wrapper-${field.id}`
  };

  const { disabled, required, value } = field;

  switch (field.type) {
    case FIELD_TYPES.Symbol:
      if (field.options.length) {
        return (
          <div id={ids.wrapper} key={ids.field}>
            <SectionHeading>{field.label}</SectionHeading>
            <SelectField
              width="auto"
              labelText=""
              id={ids.field}
              name={ids.field}
              value={value}
              disabled={disabled}
              required={required}
              onChange={handlers.fieldChange}>
              {field.options.map(option => (
                <Option value={option} key={option}>
                  {option}
                </Option>
              ))}
            </SelectField>
          </div>
        );
      }
    // if it's not a vocabulary we'll let other Symbols fall in the default case
    // eslint-disable-next-line no-fallthrough
    case FIELD_TYPES.Text:
      return (
        <div id={ids.wrapper} key={ids.field}>
          <SectionHeading>{field.label}</SectionHeading>
          <Textarea
            disabled={disabled}
            required={required}
            testId={ids.field}
            value={value}
            onChange={handlers.fieldChange}
          />
        </div>
      );
    case FIELD_TYPES.Array:
    case FIELD_TYPES.Listing:
      // https://github.com/contentful-labs/ui-reference-quick-select/blob/master/index.html
      return (
        <div id={ids.wrapper} key={ids.field}>
          <SectionHeading>{field.label}</SectionHeading>
          <p className="f36-font-size--m">
            <em>Widget in progress</em>
          </p>
          <EntityList disabled={disabled} required={required}>
            <EntityListItem
              title="Entry 1"
              description="TODO: fetch existing linked entries; implement create and link actions"
              contentType="Item"
              status="published"
            />
          </EntityList>
          <div className="f36-margin-top--xs">
            <Button
              buttonType="muted"
              className="f36-margin-right--xs"
              onClick={handlers.entryCreate}>
              Create and link an entry
            </Button>
            <Button buttonType="muted" onClick={handlers.entryLink}>
              Link existing entry
            </Button>
          </div>
        </div>
      );
    case FIELD_TYPES.RichText:
      // https://www.contentful.com/developers/docs/javascript/tutorials/rendering-contentful-rich-text-with-javascript/
      return documentToHtmlString(field);
    case FIELD_TYPES.Boolean:
    case FIELD_TYPES.Date:
    case FIELD_TYPES.Integer:
    case FIELD_TYPES.Number:
    case FIELD_TYPES.Object:
    default:
      return (
        <div id={ids.wrapper} key={ids.field}>
          <SectionHeading>{field.label}</SectionHeading>
          <TextInput
            testId={ids.field}
            disabled={disabled}
            onChange={handlers.fieldChange}
            value={value?.toString()}
          />
        </div>
      );
  }
}

export { renderWidget };
