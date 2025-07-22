import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react';
import { FC, HTMLAttributes } from 'react';
import { jsxConverter } from './converters';

export type RichTextProps = {
  data: SerializedEditorState;
} & HTMLAttributes<HTMLDivElement>;

export const RichText: FC<RichTextProps> = (props) => {
  return <RichTextConverter {...props} converters={jsxConverter} />;
};
