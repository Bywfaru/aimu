'use client';

import { FieldLabel, TextInput, useField } from '@payloadcms/ui';
import type { TextFieldClientComponent } from 'payload';
import type { ChangeEventHandler } from 'react';

export const SlugField: TextFieldClientComponent = ({
  field,
  path,
  readOnly,
}) => {
  const { label } = field;

  const { value, setValue } = useField<string>({
    path: path || field.name,
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value: newValue } = event.target;
    const slug = newValue.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    setValue(slug);
  };

  return (
    <div className="field-type slug-field-component">
      <FieldLabel
        htmlFor={`field-${path}`}
        label={label}
        required={field.required}
      />

      <TextInput
        value={value}
        onChange={handleInputChange}
        path={path || field.name}
        readOnly={Boolean(readOnly)}
        description={field.admin?.description}
      />
    </div>
  );
};
