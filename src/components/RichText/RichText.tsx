import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react';
import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import { jsxConverter } from './converters';

export type RichTextProps = {
  data: SerializedEditorState;
} & HTMLAttributes<HTMLDivElement>;

export const RichText: FC<RichTextProps> = ({ className, ...restProps }) => {
  return (
    <RichTextConverter
      className={clsx([
        'flex',
        'flex-col',
        'gap-5',
        'w-full',
        'max-w-5xl',
        'mx-auto',
        'px-5',
        'lg:px-0',
        '[&_h2]:text-3xl',
        '[&_h2]:md:text-5xl',
        '[&_h2]:text-primary-3',
        '[&_h3]:text-xl',
        '[&_h3]:md:text-3xl',
        '[&_h3]:text-primary-3',
        '[&_ul]:list-disc',
        '[&_ul]:pl-5',
        '[&_ol]:list-decimal',
        '[&_ol]:pl-5',
        className,
      ])}
      {...restProps}
      converters={jsxConverter}
    />
  );
};
