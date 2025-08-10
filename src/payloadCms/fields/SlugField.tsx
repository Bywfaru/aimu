'use client';

import {
  FieldDescription,
  FieldLabel,
  TextInput,
  useField,
} from '@payloadcms/ui';
import type { TextFieldClientProps } from 'payload';
import { type ChangeEventHandler, type FC, useMemo } from 'react';
import { useIsClient } from 'usehooks-ts';

export type SlugFieldProps = TextFieldClientProps & {
  allowDirectories?: boolean;
  basePath?: string;
};

export const SlugField: FC<SlugFieldProps> = ({
  field,
  path,
  readOnly,
  allowDirectories,
  basePath = '',
}) => {
  const { label } = field;

  const { value, setValue } = useField<string>({
    path: path || field.name,
  });
  const isClient = useIsClient();

  const slug = useMemo(() => {
    if (!value || !isClient) return null;

    return value.startsWith('/') ? value.slice(1) : value;
  }, [isClient, value]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value: newValue } = event.target;
    let slug = newValue.toLowerCase().replace(/[^a-z0-9/-]+/g, ''); // Replace all non-alphanumeric characters except for hyphens and slashes

    if (!allowDirectories) slug.replace(/\/+/g, ''); // Remove slashes if directories are not allowed
    if (slug.startsWith('/')) slug = slug.slice(1); // Remove leading slash

    setValue(`/${slug}`);
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

      {!!slug && typeof window !== 'undefined' && (
        <FieldDescription
          path={path || field.name}
          description={`Your page will be accessible through: ${window.location.origin}${basePath}/${slug}`}
        />
      )}
    </div>
  );
};
