import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-gray-200 text-gray-900',
      success: 'bg-green-200 text-green-900',
      warning: 'bg-yellow-200 text-yellow-900',
      destructive: 'bg-red-200 text-red-900',
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className || ''}`}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
