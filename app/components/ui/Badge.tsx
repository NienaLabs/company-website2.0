import React from 'react';

export type BadgeColor = 
  | 'amber' 
  | 'alt-1' 
  | 'alt-2' 
  | 'alt-3' 
  | 'alt-4'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  outline?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  color = 'amber',
  outline = false,
  className = '',
  style = {},
  children,
  ...props
}) => {

  const semanticColor = color === 'amber' ? 'brand' : color;
  
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-2)',
    padding: 'var(--spacing-1) var(--spacing-3)',
    borderRadius: 'var(--radius-full)', // "Must be fully rounded"
    fontFamily: 'var(--typography-caption1-font)',
    fontSize: 'var(--typography-caption1-size)',
    fontWeight: 'var(--font-weight-semibold)',
    lineHeight: 'var(--typography-caption1-line-height)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    ...style,
  };

  let colorStyle: React.CSSProperties = {};

  if (outline) {
    colorStyle = {
      backgroundColor: 'transparent',
      color: `var(--color-${semanticColor})`,
      border: `1px solid var(--color-${semanticColor})`,
    };
  } else {
    // Solid subtle background by default for badges
    colorStyle = {
      backgroundColor: `var(--color-${semanticColor}-subtle)`,
      color: `var(--color-${semanticColor})`,
      border: `1px solid var(--color-${semanticColor}-subtle)`,
    };
  }

  return (
    <span style={{ ...baseStyle, ...colorStyle }} className={className} {...props}>
      {children}
    </span>
  );
};
