import React, { forwardRef } from 'react';

export type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'alt-1'
  | 'alt-2'
  | 'alt-3'
  | 'alt-4';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  style = {},
  children,
  ...props
}, ref) => {
  
  // Base styles enforcing the Natural Design System
  const baseStyle: React.CSSProperties = {
    display: fullWidth ? 'flex' : 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--typography-body1-font)',
    fontWeight: 'var(--typography-body1-weight)',
    borderRadius: 'var(--radius-full)', // Interactive elements MUST be fully rounded
    minHeight: '48px', // Minimum touch target 48x48px
    minWidth: '48px',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all var(--motion-micro-feedback)', // Immediate micro-feedback
    border: '1px solid transparent',
    ...style,
  };

  // Determine variant specific styles (Colors from tokens)
  let variantStyle: React.CSSProperties = {};

  if (variant === 'primary') {
    variantStyle = {
      backgroundColor: 'var(--color-brand)',
      color: 'var(--color-brand-fg)',
    };
  } else if (variant === 'secondary') {
    variantStyle = {
      backgroundColor: 'transparent',
      border: '1px solid var(--color-brand)',
      color: 'var(--color-brand)',
    };
  } else if (variant === 'ghost') {
    variantStyle = {
      backgroundColor: 'transparent',
      color: 'var(--color-fg-muted)',
    };
  } else if (variant.startsWith('alt-')) {
    const altNumber = variant.split('-')[1];
    variantStyle = {
      backgroundColor: `var(--color-alt-${altNumber})`,
      color: `var(--color-alt-${altNumber}-fg)`,
    };
  }

  // Determine size specific padding (height is handled by minHeight, but we set padding for content width)
  const sizeStyle: React.CSSProperties = {
    padding: size === 'sm' ? '0 var(--spacing-4)' : size === 'md' ? '0 var(--spacing-6)' : '0 var(--spacing-8)',
    fontSize: size === 'sm' ? 'var(--typography-body2-size)' : size === 'md' ? 'var(--typography-body1-size)' : 'var(--typography-title3-size)',
  };

  const combinedStyle = { ...baseStyle, ...variantStyle, ...sizeStyle };

  return (
    <button
      ref={ref}
      className={`natural-btn natural-btn-${variant} ${className}`}
      style={combinedStyle}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
