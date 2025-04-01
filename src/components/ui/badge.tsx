import * as React from 'react';
import { cn } from '@/lib/utiles';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Badge = ({ className, ...props }: BadgeProps) => {
  return (
    <div
      className={cn('inline-flex items-center rounded-full bg-muted px-3 py-0.5 text-xs font-semibold text-muted-foreground transition-colors', className)}
      {...props}
    />
  );
};
