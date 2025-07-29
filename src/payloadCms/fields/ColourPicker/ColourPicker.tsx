'use client';

import { FieldLabel, TextInput, useField } from '@payloadcms/ui';
import type { TextFieldClientComponent } from 'payload';
import { type ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { HexAlphaColorPicker } from 'react-colorful';
import styles from './ColourPicker.module.css';

export const ColourPicker: TextFieldClientComponent = ({
  field,
  path,
  readOnly,
}) => {
  const { label } = field;

  const { value, setValue } = useField<string>({
    path: path || field.name,
  });

  const [colourHexAlpha, setColourHexAlpha] = useState<string | undefined>();
  const setValueTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value: newValue } = event.target;

    if (!newValue) {
      setValue(undefined);

      return;
    }

    const hexCode = newValue
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
      .slice(0, 8);

    setValue(`#${hexCode}`);
  };

  // Debounce the colour change to avoid rapid updates
  useEffect(() => {
    if (!colourHexAlpha) return;

    if (setValueTimeoutRef.current) clearTimeout(setValueTimeoutRef.current);

    setValueTimeoutRef.current = setTimeout(() => {
      setValue(colourHexAlpha);
      setValueTimeoutRef.current = null;
    }, 500);

    return () => {
      if (!setValueTimeoutRef.current) return;

      clearTimeout(setValueTimeoutRef.current);
    };
  }, [colourHexAlpha, setValue]);

  useEffect(() => {
    setColourHexAlpha(value);
  }, [value]);

  return (
    <div className="field-type slug-field-component">
      <FieldLabel
        htmlFor={`field-${path}`}
        label={label}
        required={field.required}
      />

      <div className={styles.inputContainer}>
        <HexAlphaColorPicker
          color={colourHexAlpha}
          onChange={setColourHexAlpha}
        />

        <div className={styles.colourCodesContainer}>
          <FieldLabel label="Hex Alpha" />

          <TextInput
            value={value}
            onChange={handleInputChange}
            path={path || field.name}
            readOnly={Boolean(readOnly)}
            description={field.admin?.description}
          />
        </div>
      </div>
    </div>
  );
};
