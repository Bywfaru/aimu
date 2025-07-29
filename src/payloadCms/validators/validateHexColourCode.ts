import { TextFieldSingleValidation } from 'payload';

export const validateHexColourCode: TextFieldSingleValidation = (value) => {
  if (!value) return true;

  // Hex colour codes can be 6 or 8 characters long (with alpha channel)
  if (!/^#[0-9A-Fa-f]{6,8}$/.test(value)) return 'Invalid hex color code.';

  return true;
};
