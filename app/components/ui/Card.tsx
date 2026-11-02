import React, { forwardRef } from 'react';

export type CardVariant = 'default' | 'elevated' | 'glass' | 'outlined' | 'dynamic';
export type DynamicColor = '1' | '2' | '3' | '4';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  dynamicColor?: DynamicColor; // Required if variant is 'dynamic'
  interactive?: boolean; // If true, adds hover lift effect
  image?: string; // URL for an image to display at the top of the card
  icon?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = 'elevated',
  dynamicColor = '1',
  interactive = false,
  image,
  icon,
  className = '',
  style = {},
  children,
  ...props
}, ref) => {
  // ── Resolve surface styles per variant ──────────────────────────────────
  let surfaceColor = 'var(--color-surface)';
  let backdropFilter = 'none';
  let border = '1px solid var(--color-border)';
  let faceTextColor: string | undefined = undefined;
  let boxShadow = 'none';

  if (variant === 'elevated') {
    surfaceColor = 'var(--color-surface-raised)';
    border = '1px solid var(--color-border)';
    boxShadow = '0 2px 8px -2px rgba(0, 0, 0, 0.2), 0 1px 3px -1px rgba(0, 0, 0, 0.1)';
  } else if (variant === 'glass') {
    surfaceColor = 'var(--color-surface-glass-base)';
    backdropFilter = 'blur(16px)';
    border = '1px solid var(--color-border-strong)';
    faceTextColor = 'var(--color-fg)';
    boxShadow = '0 4px 16px -4px rgba(0, 0, 0, 0.3)';
  } else if (variant === 'outlined') {
    surfaceColor = 'transparent';
    border = '1px solid var(--color-border-strong)';
  } else if (variant === 'dynamic') {
    surfaceColor = `var(--color-alt-${dynamicColor})`;
    faceTextColor = `var(--color-alt-${dynamicColor}-fg)`;
    border = `1px solid var(--color-alt-${dynamicColor}-hover)`;
  } else if (variant === 'default') {
    surfaceColor = 'var(--color-surface)';
    border = '1px solid var(--color-border)';
  }

  // ── Image + Icon helpers ─────────────────────────────────────────────
  const renderImage = image ? (
    <div style={{
      width: '100%',
      height: '200px',
      overflow: 'hidden',
      borderRadius: 'calc(var(--radius-2xl, 16px) - 4px)',
      marginBottom: 'var(--spacing-6)',
      flexShrink: 0,
    }}>
      <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  ) : null;

  const renderIcon = icon ? (
    <div style={{
      marginBottom: 'var(--spacing-6)',
      display: 'inline-flex',
      fontSize: '32px',
      color: 'var(--color-brand)',
    }}>
      {icon}
    </div>
  ) : null;

  return (
    <div
      ref={ref}
      className={`material-card ${interactive ? 'interactive-card' : ''} ${className}`}
      style={{
        position: 'relative',
        backgroundColor: surfaceColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter !== 'none' ? backdropFilter : undefined,
        border,
        borderRadius: 'var(--radius-2xl, 16px)',
        padding: 'var(--spacing-container-padding, 24px)',
        boxShadow,
        display: 'flex',
        flexDirection: 'column',
        ...(faceTextColor ? { color: faceTextColor } : {}),
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease',
        ...style,
      }}
      {...props}
    >
      {renderImage}
      {renderIcon}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        {children}
      </div>
    </div>
  );
});

Card.displayName = 'Card';
