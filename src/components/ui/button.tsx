import { cn } from '@/lib/utiles';
import * as React from 'react';

const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  default: 'bg-primary text-white hover:bg-primary/90',
  outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
  ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
  link: 'bg-transparent underline-offset-4 hover:underline text-primary'
};

type Variant = keyof typeof variants;

type ButtonProps = {
  variant?: Variant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(base, variants[variant], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';