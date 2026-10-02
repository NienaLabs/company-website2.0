import React, { forwardRef } from 'react';

export type CardVariant = 'default' | 'elevated' | 'glass' | 'outlined' | 'dynamic';
export type DynamicColor = '1' | '2' | '3' | '4';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  dynamicColor?: DynamicColor; // Required if variant is 'dynamic'
  interactive?: boolean; // If true, adds hover lift effect
  image?: string; // URL for an image to display at the top of the card
  icon?: React.ReactNode; // 3D icon or react-icon
}

const BOX_DEPTH = 14;

/**
 * Determines the 3D extrusion side-panel color based on the card variant.
 * - dynamic (solid): uses a shade of the card's alt color
 * - outlined / elevated / default / glass: uses the border color
 */
function getSideColor(variant: CardVariant, dynamicColor: DynamicColor): string {
  if (variant === 'dynamic') {
    return `var(--color-alt-${dynamicColor}-hover)`;
  }
  return 'var(--color-border-strong)';
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

  // ── Resolve face styles per variant ──────────────────────────────────
  let surfaceColor = 'var(--color-surface)';
  let backdropFilter = 'none';
  let border = '1px solid transparent';
  let faceTextColor: string | undefined = undefined;

  if (variant === 'elevated') {
    surfaceColor = 'var(--color-surface-raised)';
    border = '1px solid var(--color-border)';
  } else if (variant === 'glass') {
    surfaceColor = 'var(--color-surface-glass-base)';
    backdropFilter = 'blur(16px)';
    border = '1px solid var(--color-border-strong)';
    faceTextColor = 'var(--color-fg)';
  } else if (variant === 'outlined') {
    surfaceColor = 'transparent';
    border = '1px solid var(--color-border-strong)';
  } else if (variant === 'dynamic') {
    surfaceColor = `var(--color-alt-${dynamicColor})`;
    faceTextColor = `var(--color-alt-${dynamicColor}-fg)`;
  } else if (variant === 'default') {
    surfaceColor = 'var(--color-surface)';
    border = '1px solid var(--color-border)';
  }

  const sideColor = getSideColor(variant, dynamicColor);

  // ── Image + Icon helpers ─────────────────────────────────────────────
  const renderImage = image ? (
    <div style={{
      width: '100%',
      height: '200px',
      overflow: 'hidden',
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
      fontSize: '48px',
    }}>
      {icon}
    </div>
  ) : null;

  // ── Render: every card gets the 3D extrusion wrapper ────────────────
  return (
    <div
      ref={ref}
      className={`natural-card-wrapper ${interactive ? 'interactive' : ''} ${className}`}
      style={{
        position: 'relative',
        paddingRight: `${BOX_DEPTH}px`,
        paddingBottom: `${BOX_DEPTH}px`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all var(--motion-productive-shift)',
        ...style,
      }}
      {...props}
    >
      {/* Right side panel (3D extrusion) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: `${BOX_DEPTH}px`,
          bottom: `${BOX_DEPTH}px`,
          backgroundColor: sideColor,
          transformOrigin: 'left top',
          transform: 'skewY(45deg)',
        }}
      />
      {/* Bottom side panel (3D extrusion) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: `${BOX_DEPTH}px`,
          height: `${BOX_DEPTH}px`,
          backgroundColor: sideColor,
          transformOrigin: 'top right',
          transform: 'skewX(45deg)',
        }}
      />
      {/* The card face */}
      <div
        className={`natural-card ${variant === 'elevated' ? 'shadow-md' : ''}`}
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: surfaceColor,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter !== 'none' ? backdropFilter : undefined,
          border,
          ...(faceTextColor ? { color: faceTextColor } : {}),
          borderRadius: '0px',
          padding: 'var(--spacing-container-padding)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {renderImage}
        {renderIcon}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
});

Card.displayName = 'Card';
