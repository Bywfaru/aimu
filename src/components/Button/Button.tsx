import clsx from 'clsx';
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
};

export const Button: FC<ButtonProps> = ({
  className,
  fullWidth = false,
  variant = 'primary',
  ...restProps
}) => {
  let variantClass = '';

  switch (variant) {
    case 'secondary': {
      variantClass =
        'border-accent-1 bg-accent-1 text-primary-3 hover:bg-transparent hover:text-accent-1';
      break;
    }
    default: {
      variantClass =
        'border-primary-3 bg-primary-3 text-text-light hover:bg-transparent hover:text-primary-3';
      break;
    }
  }

  return (
    <button
      className={clsx([
        className,
        variantClass,
        'border',
        'transition-colors',
        'px-5',
        'py-3',
        'rounded-sm',
        { 'w-full': fullWidth },
        { 'w-fit': !fullWidth },
      ])}
      {...restProps}
    />
  );
};
