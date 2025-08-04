import clsx from 'clsx';
import type { CSSProperties, FC } from 'react';
import styles from './Spacer.module.css';

export type SpacerProps = {
  backgroundColor?: string | null;
  className?: string;
  mobileHeight: number;
  tabletHeight?: number | null;
  desktopHeight?: number | null;
};

export const Spacer: FC<SpacerProps> = ({
  backgroundColor,
  className,
  desktopHeight,
  tabletHeight,
  mobileHeight,
}) => {
  const mobileHeightValue = `${mobileHeight}px`;
  const tabletHeightValue = tabletHeight
    ? `${tabletHeight}px`
    : mobileHeightValue;
  const desktopHeightValue = desktopHeight
    ? `${desktopHeight}px`
    : tabletHeightValue;

  return (
    <div
      className={clsx([styles.spacer, className])}
      style={
        {
          backgroundColor: backgroundColor ?? undefined,
          '--spacer-height-mobile': mobileHeightValue,
          '--spacer-height-tablet': tabletHeightValue,
          '--spacer-height-desktop': desktopHeightValue,
        } as CSSProperties
      }
    ></div>
  );
};
