import { headingConverter } from '@/components/RichText/converters';
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical';
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react';
import { internalDocToHref } from '../internalLink';

export const jsxConverter: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...headingConverter,
});
