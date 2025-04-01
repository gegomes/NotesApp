import * as React from 'react';
import { cn } from '@/lib/utiles';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('rounded-xl border bg-card text-card-foreground shadow-sm transition hover:shadow-md', className)}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('p-4 pt-0', className)} {...props} />
    );
  }
);
CardContent.displayName = 'CardContent';
