import clsx from 'clsx';
import type { FC } from 'react';

export type SpacerProps = {
  backgroundColor?: string;
  className?: string;
};

export const Spacer: FC<SpacerProps> = ({ backgroundColor, className }) => {
  return (
    <div
      className={clsx(['w-full', className])}
      style={{ backgroundColor }}
    ></div>
  );
};
