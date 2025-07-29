'use client';

import { FieldLabel, TextInput, useField } from '@payloadcms/ui';
import type { TextFieldClientProps } from 'payload';
import type { ChangeEventHandler, FC } from 'react';

export type SlugFieldProps = TextFieldClientProps & {
  allowDirectories?: boolean;
};

export const SlugField: FC<SlugFieldProps> = ({
  field,
  path,
  readOnly,
  allowDirectories,
}) => {
  const { label } = field;

  const { value, setValue } = useField<string>({
    path: path || field.name,
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value: newValue } = event.target;
    const slug = allowDirectories
      ? newValue
          .toLowerCase()
          .replace(/[^a-z0-9/-]+/g, '')
          .replace(/\/+/g, '/')
      : newValue
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

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
